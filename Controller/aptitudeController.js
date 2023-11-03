const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Aptitude = require('../Models/aptitudeModel');
const Answer = require('../Models/answerModel');

exports.getAllQuestions = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Aptitude.find(), req.query)
    .filter()
    .sort()
    .fields()
    .paginate();

  const questions = await features.query;
  res.status(200).json({
    status: 'success',
    results: questions.length,
    data: {
      Questions: questions,
    },
  });
});

exports.createQuestions = catchAsync(async (req, res, next) => {
  const newQuestions = await Aptitude.create(req.body);

  res.status(200).json({
    status: 'success',
    Questions: newQuestions,
  });
});

exports.getQuestion = catchAsync(async (req, res, next) => {
  const question = await Aptitude.findOne(
    {
      contestNumber: req.params.contestNumber,
      questions: { $elemMatch: { questionNumber: req.params.questionNumber } },
    },
    {
      'questions.$': 1,
    }
  );

  if (!question) {
    return next(new AppError('Question not found', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      Question: question.questions[0],
    },
  });
});

exports.updateQuestion = catchAsync(async (req, res, next) => {
  const question = await Aptitude.findOneAndUpdate(
    {
      contestNumber: req.params.contestNumber,
      questions: { $elemMatch: { questionNumber: req.params.questionNumber } },
    },
    {
      $set: {
        'questions.$.questionDescription': req.body.questionDescription,
        'questions.$.options': req.body.options,
      },
    },
    {
      new: true,
      runValidators: true,
    }
  );
  console.log(question);
  if (!question) {
    return next(new AppError('Question not found', 404));
  }

  res.status(200).json({
    status: 'success',
    question: question,
  });
});

exports.getAllAnswers = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Answer.find(), req.query)
    .filter()
    .sort()
    .fields()
    .paginate();

  const answers = await features.query;
  res.status(200).json({
    status: 'success',
    results: answers.length,
    answers,
  });
});

exports.createAnswers = catchAsync(async (req, res, next) => {
  const newAnswer = await Answer.create(req.body);

  res.status(200).json({
    status: 'success',
    Answers: newAnswer,
  });
});

exports.getContests = catchAsync(async (req, res, next) => {
  const contests = await Aptitude.find();
  let contest = [];

  contests.forEach((document) => contest.push(document.contestNumber));

  res.status(200).json({
    status: 'success',
    contests: contest.length,
    data: {
      Contest: contest,
    },
  });
});

// exports.getAnswersAndQuestions = catchAsync(async (req, res, next) => {
//   const answer = await Answer.find();
//   const question = await Aptitude.find();
//   const QnA = [];
// });
