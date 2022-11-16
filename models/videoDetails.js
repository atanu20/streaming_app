const mongoose = require('mongoose');

const videoschema = new mongoose.Schema({
  channelName: {
    type: String,
    trim: true,
  },
  profile_image: {
    type: String,
  },
  title: {
    type: String,
    trim: true,
    required: true,
  },
  description: {
    type: String,
    trim: true,
    required: true,
  },
  channelthumb: {
    type: String,
    trim: true,
    required: true,
  },
  channelvideo: {
    type: String,
    trim: true,
    required: true,
  },

  tags: {
    type: Array,
    default: [],
  },
  isApprove: {
    type: Boolean,
    default: false,
  },

  likes: {
    type: Number,
    default: 0,
  },
  views: {
    type: Number,
    default: 0,
  },
  userid: {
    type: String,
    required: true,
  },
  isPublic: {
    type: Boolean,
    default: true,
  },
  uploadAt: {
    type: Date,
    default: new Date(),
  },
});
const videoTable = new mongoose.model('video', videoschema);
module.exports = videoTable;
