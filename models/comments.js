const mongoose = require('mongoose');

const CommentsSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    trim: true,
  },

  videoid: {
    type: String,
    require: true,
  },
  message: {
    type: String,
    require: true,
    trim: true,
  },
  userid: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});
const commentTable = new mongoose.model('comment', CommentsSchema);
module.exports = commentTable;
