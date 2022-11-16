const mongoose = require('mongoose');

const userScheme = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  profileimg: {
    type: String,
    trim: true,
    default: '',
  },
  channelDes: {
    type: String,
    trim: true,
    default: '',
  },
  postCount: {
    type: Number,
    default: 0,
  },
  subscriberCount: {
    type: Number,
    default: 0,
  },
  subscribed: {
    type: Array,
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const userTable = new mongoose.model('user', userScheme);
module.exports = userTable;
