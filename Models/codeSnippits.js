const mongoose = require('mongoose');

const codeSnippitsSchema = new mongoose.Schema({
  contestNumber: {
    type: Number,
    required: [true, 'Provide the contest number'],
  },

  contestName: {
    type: String,
    required: [true, 'Provide contest name'],
  },

  staterFiles: {
    java: {
      q1: String,
      q2: String,
      q3: String,
    },
    python: {
      q1: String,
      q2: String,
      q3: String,
    },
    cpp: {
      q1: String,
      q2: String,
      q3: String,
    },
  },

  mainFiles: {
    java: {
      q1: String,
      q2: String,
      q3: String,
    },
    python: {
      q1: String,
      q2: String,
      q3: String,
    },
    cpp: {
      q1: String,
      q2: String,
      q3: String,
    },
  },
});

const CodeSnippits = mongoose.model('codeSnippits', codeSnippitsSchema);

module.exports = CodeSnippits;
