const mongoose = require('mongoose');

const aptitudeSchema = new mongoose.Schema({
  contestNumber: {
    type: Number,
    required: [true, 'Provide a contest number'],
    unique: true,
  },
  questions: [
    {
      questionNumber: {
        type: Number,
        required: [true, 'Provide a question number'],
      },
      questionDescription: {
        type: String,
        required: [true, 'Provide the question description'],
      },
      options: {
        A: { type: String, required: [true, 'Provide option A'] },
        B: { type: String, required: [true, 'Provide option B'] },
        C: { type: String, required: [true, 'Provide option C'] },
        D: { type: String, required: [true, 'Provide option D'] },
      },
    },
  ],
});

const Aptitude = mongoose.model('Aptitude', aptitudeSchema);

module.exports = Aptitude;
