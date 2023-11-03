const User = require('../Models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.signup = catchAsync(async (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const usn = req.body.usn;
  const contact = req.body.contact;
  const password = req.body.password;

  if (!name || !password || !email || !contact || !usn) {
    return next(new AppError('Please provide details', 400));
  }

  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    usn: req.body.usn,
    contact: req.body.contact,
    password: req.body.password,
  });

  res.status(201).json({
    status: 'success',
    data: {
      user: newUser,
    },
  });
});
