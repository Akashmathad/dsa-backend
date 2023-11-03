const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  usn: {
    type: String,
    required: [true, 'Please provide a valid usn'],
    lowercase: true,
    unique: true,
  },
  name: {
    type: String,
    required: [true, 'Provide a name'],
  },
  branch: {
    type: String,
    required: [true, 'Please provide a branch'],
    lowercase: true,
    enum: {
      values: ['cse', 'ece', 'ise'],
      message: 'The type should cse, ece or ise',
    },
  },
  DSAPoints: {
    type: Number,
    required: [true, 'Provide the points'],
    default: 0,
  },
  AptitudePoints: {
    type: Number,
    required: [true, 'Provide the points'],
    default: 0,
  },
  DSAEachPoints: [
    {
      contestNumber: {
        type: Number,
        required: [true, 'Provide the contest number'],
      },
      contestName: {
        type: String,
        required: [true, 'Provide a contest name'],
      },
      points: {
        type: Number,
        required: [true, 'Provide the points for dsa for the contest'],
      },
    },
  ],
  AptitudeEachPoints: [
    {
      contestNumber: {
        type: Number,
        required: [true, 'Provide the contest number'],
      },
      contestName: {
        type: String,
        required: [true, 'Provide a contest name'],
      },
      points: {
        type: Number,
        required: [true, 'Provide the points for aptitude for the contest'],
      },
    },
  ],
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
