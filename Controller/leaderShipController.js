const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const Profile = require('../Models/userProfileModel');

exports.getLeaderShip = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Profile.find(), req.query)
    .filter()
    .sort()
    .fields()
    .paginate();

  const leaderShip = await features.query;
  res.status(200).json({
    status: 'success',
    results: leaderShip.length,
    data: {
      leaderShip,
    },
  });
});
