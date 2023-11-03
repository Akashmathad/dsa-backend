const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Profile = require('../Models/userProfileModel');

exports.getUserProfile = catchAsync(async (req, res, next) => {
  const profile = await Profile.findOne({
    usn: req.params.usn,
  });

  if (!profile) {
    return next(new AppError('Question not found', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      profile: profile,
    },
  });
});

exports.createProfile = catchAsync(async (req, res, next) => {
  const newProfile = await Profile.create(req.body);

  res.status(200).json({
    status: 'success',
    Profile: newProfile,
  });
});

exports.updateAptitudeProfile = catchAsync(async (req, res, next) => {
  const profile = await Profile.findOneAndUpdate(
    {
      usn: req.params.usn,
    },
    {
      $inc: {
        AptitudePoints: req.body.points,
      },
      $push: {
        AptitudeEachPoints: {
          contestNumber: req.params.contestNumber,
          contestName: req.body.contestName,
          points: req.body.points,
        },
      },
    },
    {
      new: true,
      runValidators: true,
    }
  );
  console.log(profile);
  if (!profile) {
    return next(new AppError('Question not found', 404));
  }

  res.status(200).json({
    status: 'success',
    profile: profile,
  });

  next();
});
