import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { message } from 'antd';

import { hideLoading, showLoading } from '../../../redux/loaderSlice';
import { getExamById } from '../../../api/exams';
import Instructions from './Instructions';
import { addReport } from '../../../api/reports';

const Exam = () => {
  const [examData, setExamData] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [result, setResult] = useState({});
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [timeUp, setTimeUp] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [view, setView] = useState('instructions');

  const params = useParams();
  const { user } = useSelector((state) => state.users);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getExamDetails = async () => {
    try {
      dispatch(showLoading());
      const response = await getExamById({ examId: params.id });
      dispatch(hideLoading());
      if (response.success) {
        setQuestions(response.data.questions);
        setExamData(response.data);
        setSecondsLeft(response.data.duration);
      } else {
        message.error(response.message);
      }
    } catch (err) {
      dispatch(hideLoading());
      message.error(err.message);
    }
  };

  useEffect(() => {
    if (params.id) {
      getExamDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  const calculateResult = async () => {
    try {
      let correctAnswers = [];
      let wrongAnswers = [];

      questions.forEach((question, index) => {
        if (question.correctOption === selectedOptions[index]) {
          correctAnswers.push(question);
        } else {
          wrongAnswers.push(question);
        }
      });

      let verdict = 'Pass';
      if (correctAnswers.length < examData.passingMarks) {
        verdict = 'Fail';
      }

      const tempResult = { correctAnswers, wrongAnswers, verdict };
      setResult(tempResult);

      dispatch(showLoading());
      const response = await addReport({
        exam: params.id,
        result: tempResult,
        user: user._id,
      });
      if (response.success) {
        setView('result');
      } else {
        message.error(response.message);
      }
      dispatch(hideLoading());
    } catch (err) {
      dispatch(hideLoading());
      message.error(err.message);
    }
  };

  const startTimer = () => {
    let totalSeconds = examData.duration;
    let intervalId = setInterval(() => {
      if (totalSeconds > 0) {
        totalSeconds--;
        setSecondsLeft(totalSeconds);
      } else {
        setTimeUp(true);
      }
    }, 1000);
    setIntervalId(intervalId);
  };

  useEffect(() => {
    if (timeUp) {
      calculateResult();
    }
    clearInterval(intervalId);
  }, [timeUp]);

  return (
    examData && (
      <>
        <div className='text-center'>
          <div className='divider pt-2'></div>
          <span className='text-3xl  pt-2 color-primary'>{examData.name}</span>
          <div className='divider'></div>

          {view === 'instructions' && (
            <Instructions
              examData={examData}
              setView={setView}
              startTimer={startTimer}
            />
          )}
        </div>

        {view === 'questions' && (
          <div className='flex flex-col gap-2'>
            <div className='flex justify-between'>
              <span className='text-2xl p-2 color-primary text-bold'>
                Q{selectedQuestionIndex + 1}:{' '}
                {questions[selectedQuestionIndex].name}
              </span>
              <div className='timer'>
                <span className='text-lg'>{secondsLeft}</span>
              </div>
            </div>

            <div className='flex flex-col gap-2'>
              {Object.keys(questions[selectedQuestionIndex].options).map(
                (option, index) => {
                  return (
                    <div
                      key={index}
                      className={`mx-2 p-2 pointer ${
                        selectedOptions[selectedQuestionIndex] === option
                          ? 'selected-option'
                          : 'option'
                      }`}
                      onClick={() => {
                        setSelectedOptions({
                          ...selectedOptions,
                          [selectedQuestionIndex]: option,
                        });
                      }}
                    >
                      <span className='text-xl'>
                        {option} :{' '}
                        {questions[selectedQuestionIndex].options[option]}
                      </span>
                    </div>
                  );
                }
              )}
            </div>
            <div className='flex justify-between mx-2'>
              <button
                className='primary-outlined-btn pointer'
                disabled={selectedQuestionIndex === 0}
                onClick={() => {
                  if (selectedQuestionIndex > 0) {
                    setSelectedQuestionIndex(selectedQuestionIndex - 1);
                  }
                }}
              >
                <i className='ri-arrow-left-s-line'></i>
              </button>

              {selectedQuestionIndex === questions.length - 1 && (
                <button
                  className='succes-outlined-btn'
                  onClick={() => {
                    setTimeUp(true);
                    clearInterval(intervalId);
                  }}
                >
                  SUBMIT
                </button>
              )}

              <button
                className='primary-outlined-btn pointer'
                onClick={() => {
                  if (selectedQuestionIndex < questions.length - 1) {
                    setSelectedQuestionIndex(selectedQuestionIndex + 1);
                  }
                }}
              >
                <i className='ri-arrow-right-s-line'></i>
              </button>
            </div>
          </div>
        )}

        {view === 'result' && (
          <div className='flex flex-col gap-5'>
            <div className='flex flex items-center justify-center mt-5 gap-2'>
              <div className='flex flex-col gap-2 result'>
                <span className='text-2xl text-center'>RESULT</span>
                <div className='marks'>
                  <span className='text-md'>
                    Total Questions:{' '}
                    <span className='text-bold'>{examData.totalMarks}</span>
                  </span>
                  <br />
                  <span className='text-md'>
                    Correct Answers:{' '}
                    <span className='text-bold'>
                      {result.correctAnswers.length}
                    </span>
                  </span>
                  <br />
                  <span className='text-md'>
                    Wrong Answers:{' '}
                    <span className='text-bold'>
                      {result.wrongAnswers.length}
                    </span>
                  </span>
                  <br />
                  <span className='text-md'>
                    Result:{' '}
                    <span
                      className={`text-bold ${
                        result.verdict === 'Pass'
                          ? 'text-color-success'
                          : 'text-color-tertiary'
                      } `}
                    >
                      {result.verdict}
                    </span>
                  </span>
                </div>
              </div>
              <div className='animation'>
                {result.verdict === 'Pass' ? (
                  <dotlottie-player
                    src='https://lottie.host/89b47596-5818-49c5-b740-5550487ff928/YO92Xysm07.json'
                    background='transparent'
                    speed='1'
                    loop
                    autoplay
                  ></dotlottie-player>
                ) : (
                  <dotlottie-player
                    src='https://lottie.host/60ae0a37-1a04-478b-937a-d9f654901c1f/SFCZZIraMP.json'
                    background='transparent'
                    speed='1'
                    loop
                    autoplay
                  ></dotlottie-player>
                )}
              </div>
            </div>
            <div className='flex gap-4 justify-center'>
              <button
                className='primary-warning-btn pointer'
                onClick={() => {
                  setView('instructions');
                  setSelectedQuestionIndex(0);
                  setSelectedOptions({});
                  setSecondsLeft(examData.duration);
                }}
              >
                RETAKE
              </button>
              <button
                className='primary-contained-btn pointer'
                onClick={() => {
                  setView('review');
                }}
              >
                REVIEW
              </button>
              <button
                className='primary-outlined-btn pointer'
                onClick={() => {
                  navigate('/');
                }}
              >
                CLOSE
              </button>
            </div>
          </div>
        )}

        {view === 'review' && (
          <>
            <div className='flex flex-col gap-2 p-2'>
              {questions.map((question, index) => {
                return (
                  <div
                    className={`flex flex-col gap-1 p-2 question-card ${
                      selectedOptions[index] === question.correctOption
                        ? 'answer-correct'
                        : 'answer-wrong'
                    }`}
                    key={index}
                  >
                    <span className='text-xl'>
                      {index + 1}: {question.name}
                    </span>
                    {selectedOptions[index] !== question.correctOption && (
                      <span className='text-md'>
                        Submitted:{' '}
                        <span className='text-bold'>
                          {question.options[selectedOptions[index]]}
                        </span>
                      </span>
                    )}

                    <span className='text-md'>
                      Correct Answer:{' '}
                      <span className='text-bold'>
                        {question.options[question.correctOption]}
                      </span>
                    </span>
                  </div>
                );
              })}
            </div>
            <div className='flex justify-end mr-2 mb-2 gap-2'>
              <button
                className='primary-warning-btn pointer'
                onClick={() => {
                  setView('instructions');
                  setSelectedQuestionIndex(0);
                  setSelectedOptions({});
                  setSecondsLeft(examData.duration);
                }}
              >
                RETAKE
              </button>
              <button
                className='primary-outlined-btn pointer'
                onClick={() => {
                  navigate('/');
                }}
              >
                CLOSE
              </button>
            </div>
          </>
        )}
      </>
    )
  );
};

export default Exam;
