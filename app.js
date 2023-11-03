const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const AppError = require('./utils/appError');
const errorController = require('./Controller/errorController');
const userRouter = require('./Routes/userRoutes');
const resultRouter = require('./Routes/resultRoutes');
const aptitudeRouter = require('./Routes/aptitudeRoutes');
const profileRouter = require('./Routes/profileRoutes');
const leaderShipRouter = require('./Routes/leaderShipRoutes');
const dsaRouter = require('./Routes/dsaRoutes');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(cors());

app.use(express.json());

app.use('/api/v1/aptitude-dsa/user', userRouter);
app.use('/api/v1/aptitude-dsa/result', resultRouter);
app.use('/api/v1/aptitude-dsa/question-answers', aptitudeRouter);
app.use('/api/v1/aptitude-dsa/profile', profileRouter);
app.use('/api/v1/aptitude-dsa/leaderShip', leaderShipRouter);
app.use('/api/v1/aptitude-dsa/dsa', dsaRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(errorController);

module.exports = app;
