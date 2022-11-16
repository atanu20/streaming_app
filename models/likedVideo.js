const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
  video_id: {
    type: String,
  },
  user_id: {
    type: String,
  },
  date: {
    type: Date,
    default: new Date(),
  },
});
const likeTable = new mongoose.model('likevideo', likeSchema);
module.exports = likeTable;
