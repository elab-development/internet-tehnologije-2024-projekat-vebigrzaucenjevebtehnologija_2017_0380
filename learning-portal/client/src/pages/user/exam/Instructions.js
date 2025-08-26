import { useNavigate } from 'react-router-dom';

const Instructions = ({ examData, setView, startTimer }) => {
  const navigate = useNavigate();

  return (
    <div className='flex flex-col items-center pt-2'>
      <ul className='flex flex-col gap-1 text-left'>
        <span className='text-2xl color-primary'>Instructions:</span>

        <li>Exam must be completed in {examData.duration} secons.</li>
        <li>
          Exam will be submitted automatically after {examData.duration}{' '}
          seconds.
        </li>
        <li>Once submitted, you cannot change your answers.</li>
        <li>Do not refresh the page.</li>
        <li>
          You can use the <span className='text-bold'>"Previous"</span> and{' '}
          <span className='text-bold'>"Next"</span> buttons to navigate between
          questions.
        </li>
        <li>
          Total marks of the exam is{' '}
          <span className='text-bold'>{examData.totalMarks}</span>.
        </li>
        <li>
          Passing marks of the exam is{' '}
          <span className='text-bold'>{examData.passingMarks}</span>.
        </li>
      </ul>

      <div className='flex gap-2 pt-2'>
        <button
          className='primary-outlined-btn pointer'
          onClick={() => navigate('/')}
        >
          CLOSE
        </button>
        <button
          className='primary-contained-btn pointer'
          onClick={() => {
            startTimer();
            setView('questions');
          }}
        >
          Start Exam
        </button>
      </div>
    </div>
  );
};

export default Instructions;
