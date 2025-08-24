const router = require('express').Router();
const Exam = require('../models/examModel');
const Question = require('../models/questionModel');

const authMiddleware = require('../middlewares/authMiddleware');

// Get Exams
router.post('/get-all-exams', authMiddleware, async (req, res) => {
  try {
    const exams = await Exam.find({});
    res.send({
      message: 'Exams fetched successfully',
      data: exams,
      success: true,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
      data: err,
      success: false,
    });
  }
});

// Get Exam
router.post('/get-exam-by-id', authMiddleware, async (req, res) => {
  try {
    const exam = await Exam.findById(req.body.examId).populate('questions');
    res.send({
      message: 'Exam fetched successfully',
      data: exam,
      success: true,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
      data: err,
      success: false,
    });
  }
});

// Add Exam
router.post('/add', authMiddleware, async (req, res) => {
  try {
    // Checking if exam already exists
    const examExists = await Exam.findOne({ name: req.body.name });
    if (examExists) {
      return res.status(200).send({
        message: 'Exam already exists',
        success: false,
      });
    }

    // Creating new Exam
    req.body.questions = [];
    const newExam = new Exam(req.body);
    await newExam.save();
    res.send({
      message: 'Exam added successfully',
      success: true,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
      data: err,
      success: false,
    });
  }
});

// Edit Exam
router.post('/edit-exam-by-id', authMiddleware, async (req, res) => {
  try {
    const response = await Exam.findByIdAndUpdate(req.body.examId, req.body);
    if (!response) {
      return res.status(200).send({
        message: 'Exam does not exist',
        success: false,
      });
    }
    res.send({
      message: 'Exam updated successfully',
      success: true,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
      data: err,
      success: false,
    });
  }
});

// Delete Exam
router.post('/delete-exam-by-id', authMiddleware, async (req, res) => {
  try {
    await Exam.findByIdAndDelete(req.body.examId);
    res.send({
      message: 'Exam deleted successfully',
      success: true,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
      data: err,
      success: false,
    });
  }
});

// Add Question to Exam
router.post('/add-question-to-exam', authMiddleware, async (req, res) => {
  try {
    // Add Question to questions collection
    const newQuestion = new Question(req.body);
    const question = await newQuestion.save();

    // Add Question to Exam
    const exam = await Exam.findById(req.body.exam);
    exam.questions.push(question._id);
    await exam.save();

    res.send({
      message: 'Question added successfully',
      success: true,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
      data: err,
      success: false,
    });
  }
});

// Edit Question
router.post('/edit-question-in-exam', authMiddleware, async (req, res) => {
  try {
    await Question.findByIdAndUpdate(req.body.questionId, req.body);
    res.send({
      message: 'Question updated successfully',
      success: true,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
      data: err,
      success: false,
    });
  }
});

// Delete Question
router.post('/delete-question-in-exam', authMiddleware, async (req, res) => {
  try {
    // Delete Question in questions collection
    await Question.findByIdAndDelete(req.body.questionId);

    // Delete Question in Exam array
    const exam = await Exam.findById(req.body.examId);
    exam.questions = exam.questions.filter(
      (question) => question._id != req.body.questionId
    );

    res.send({
      message: 'Question deleted successfully',
      success: true,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
      data: err,
      success: false,
    });
  }
});

module.exports = router;
