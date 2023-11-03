const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const CodeSnippits = require('../Models/codeSnippits');

exports.getCodeSnippits = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(CodeSnippits.find(), req.query)
    .filter()
    .sort()
    .fields()
    .paginate();

  const results = await features.query;

  res.status(200).json({
    status: 'success',
    data: {
      results,
    },
  });
});

exports.createCodeSnippits = catchAsync(async (req, res, next) => {
  const newCodeSnippits = await CodeSnippits.create(req.body);

  res.status(200).json({
    status: 'success',
    codeSnippits: newCodeSnippits,
  });
});

exports.updateCodeSnippits = catchAsync(async (req, res, next) => {
  console.log(req.params.type, req.params.language, req.params.question);
  const type = req.params.type;
  const language = req.params.language;
  const question = req.params.question;
  const codeSnippits = await CodeSnippits.findOneAndUpdate(
    {
      contestNumber: req.params.contestNumber,
    },
    {
      $set: {
        [`${type}.${language}.${question}`]: req.body.code,
      },
    }
  );

  if (!codeSnippits) {
    return next(new AppError('Question not found', 404));
  }

  res.status(200).json({
    status: 'success',
    codeSnippits,
  });
});
