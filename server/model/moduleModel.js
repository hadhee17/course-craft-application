const mongoose = require('mongoose');

const moduleSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  course: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lesson',
      required: true,
    },
  ],
  sequence: Number,
});

module.exports = mongoose.model('Module', moduleSchema);
