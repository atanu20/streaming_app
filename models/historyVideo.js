const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
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
const historyTable = new mongoose.model('historyvideo', historySchema);
module.exports = historyTable;
