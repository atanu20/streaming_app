const userTable = require('../models/user');
const videoTable = require('../models/videoDetails');
const comTable = require('../models/comments');
const historyTable = require('../models/historyVideo');
const likeTable = require('../models/likedVideo');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const sendEmailGrid = require('./mailSendGrid');

const { CLIENT_URL } = process.env;

const userCtrl = {
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      // console.log(req.body);
      const user = await userTable.findOne({ email });
      if (user)
        return res.json({ success: false, msg: 'This email already exists.' });

      const passwordHash = await bcrypt.hash(password, 12);

      const newUser = {
        name,
        email,
        password: passwordHash,
      };
      // console.log(name.split(' ')[0]);
      const activation_token = createActivationToken(newUser);

      const url = `${CLIENT_URL}/activate/${activation_token}`;
      sendEmailGrid(
        name.split(' ')[0],
        email,
        url,
        'Verify your email address',
        'actvation'
      );

      res.json({
        success: true,
        msg: 'Register Success! Please activate your email to start.',
      });
    } catch (err) {
      return res.json({ success: false, msg: err.message });
    }
  },
  activateEmail: async (req, res) => {
    try {
      const { activation_token } = req.body;
      const user = jwt.verify(
        activation_token,
        process.env.ACTIVATION_TOKEN_SECRET
      );

      const { name, email, password } = user;
      const userexist = await userTable.findOne({ email });
      // console.log(userexist);
      if (userexist)
        return res.json({ success: false, msg: 'This email already exists.' });

      const newUser = new userTable({
        name,
        email,
        password,
      });

      await newUser.save();

      res.json({
        success: true,
        msg: 'Account has been activated!',
        newUser,
      });
    } catch (err) {
      return res.json({ success: false, msg: 'Invalid Authentication.' });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await userTable.findOne({ email });
      if (!user)
        return res.json({ success: false, msg: 'This email does not exist.' });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.json({ success: false, msg: 'Password is incorrect.' });

      const access_token = createAccessToken({ id: user._id });

      res.json({
        success: true,
        access_token,
        isEmployer: user.isEmployer,
      });
    } catch (err) {
      return res.json({ success: false, msg: err.message });
    }
  },
  getUserInfor: async (req, res) => {
    try {
      const user = await userTable.findById(req.user.id).select('-password');

      res.json({ success: true, user: user });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  uploadVideo: async (req, res) => {
    try {
      let { title, description, tags, visibility } = req.body;
      tags = tags.trim();
      if (tags.endsWith(',')) {
        tags = tags.slice(0, -1);
      }

      // console.log(tags);
      let tagArray = [];
      let tagsarr = tags.split(',');
      for (let a of tagsarr) {
        tagArray.push(a.toLocaleLowerCase().trim());
      }
      // console.log(tagArray);
      // console.log(req.files);
      const { thumbnail, video } = req.files;

      cloudinary.v2.uploader.upload(
        thumbnail.tempFilePath,
        {
          folder: 'stream',
          width: 400,
          height: 300,
          crop: 'fill',
        },
        async (err, result) => {
          if (err) {
            return res.json({ success: false, msg: err.message });
          }
          removeTmp(thumbnail.tempFilePath);
          cloudinary.v2.uploader.upload(
            video.tempFilePath,
            {
              folder: 'stream',
              resource_type: 'video',
              quality: 60,
            },
            async (er, resul) => {
              if (er) {
                return res.json({ success: false, msg: er.message });
              }
              removeTmp(video.tempFilePath);

              const user = await userTable.findById(req.user.id);
              // console.log(user);
              const dat = await userTable.findOneAndUpdate(
                { _id: req.user.id },
                {
                  postCount: user.postCount + 1,
                },
                { new: true }
              );

              const newVideo = new videoTable({
                title,
                description,
                tags: tagArray,
                userid: req.user.id,
                isPublic: visibility,
                channelName: user.name,
                profile_image: user.profileimg,
                channelthumb: result.secure_url,
                channelvideo: resul.secure_url,
              });
              await newVideo.save();

              res.json({
                success: true,
                msg: 'Video Uploaded Successfully , Wating for Approved ',
              });
            }
          );
        }
      );

      // return res.json({ success: true });
    } catch (err) {
      return res.json({ success: false, msg: err.message });
    }
  },
  uploadProfileImg: async (req, res) => {
    try {
      const file = req.files.file;

      cloudinary.v2.uploader.upload(
        file.tempFilePath,
        {
          folder: 'stream',
          width: 200,
          height: 200,
          crop: 'fill',
        },
        async (err, result) => {
          if (err) throw err;

          removeTmp(file.tempFilePath);

          const dat = await userTable.findOneAndUpdate(
            { _id: req.user.id },
            {
              profileimg: result.secure_url,
            },
            { new: true }
          );
          res.json({
            success: true,
            msg: 'Image Upload Successfully',
            userInfo: dat,
          });
        }
      );
    } catch (err) {
      return res.status(500).json({ success: false, msg: err.message });
    }
  },
  updateDesc: async (req, res) => {
    try {
      const dat = await userTable.findOneAndUpdate(
        { _id: req.user.id },
        {
          channelDes: req.body.channelDes,
        },
        { new: true }
      );
      res.json({
        success: true,
        msg: 'Update Successfully',
        userInfo: dat,
      });
    } catch (err) {
      return res.json({ success: false, msg: err.message });
    }
  },
  getAllVideo: async (req, res) => {
    try {
      const { my_account } = req.body;

      if (my_account) {
        const video = await videoTable
          .find({ userid: req.body.accountId })
          .sort({
            uploadAt: -1,
          });
        // console.log(video);
        // console.log(my_account);
        res.json({ success: true, allvideo: video });
      } else {
        const video = await videoTable
          .find({ userid: req.body.accountId, isApprove: true })
          .sort({
            uploadAt: -1,
          });
        // console.log(video);
        // console.log(my_account + 'hi');
        res.json({ success: true, allvideo: video });
      }
    } catch (err) {
      return res.json({ success: false, msg: err.message });
    }
  },
  getRandomAccountDetails: async (req, res) => {
    try {
      const user = await userTable
        .findById(req.body.accountId)
        .select('-password');

      res.json({ success: true, user: user });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getAllFavVideo: async (req, res) => {
    try {
      const vide = await videoTable
        .find({ isPublic: true, isApprove: true })
        .sort({
          views: -1,
        });
      // // console.log(video);

      let user = await userTable.findById(req.user.id);

      // const filterVideo = filterByTag(vide, user.subscribed);
      let lastdata = vide;
      for (let i = 0; i < user.subscribed.length; i++) {
        lastdata = lastdata.filter((v) => v.userid != user.subscribed[i]);
      }
      // console.log(lastdata);

      // console.log(filterVideo);

      const video = await Promise.all(
        user.subscribed.map((val) => {
          return videoTable.find({
            userid: val,
            isPublic: true,
            isApprove: true,
          });
        })
      );
      // console.log(video.flat()); lastdata.concat(...video)

      res.json({ success: true, allvideo: lastdata.concat(...video) });
    } catch (err) {
      return res.json({ success: false, msg: err.message });
    }
  },
  getVideoById: async (req, res) => {
    try {
      // console.log(req.params.vid);
      const video = await videoTable.findById(req.params.vid);
      // console.log(video);
      res.json({ success: true, videoDet: video });
    } catch (err) {
      return res.json({ success: false, msg: err.message });
    }
  },
  getCommentsById: async (req, res) => {
    try {
      // console.log(req.params.vid);
      const video = await comTable
        .find({ videoid: req.params.vid })
        .sort({ createdAt: -1 });
      // console.log(video);
      res.json({ success: true, comDet: video });
    } catch (err) {
      return res.json({ success: false, msg: err.message });
    }
  },
  postComments: async (req, res) => {
    try {
      const { message, videoid } = req.body;

      const user = await userTable.findById(req.user.id);

      const comm = new comTable({
        userid: req.user.id,
        message,
        videoid,
        name: user.name,
      });
      const ndata = await comm.save();

      res.json({
        success: true,
        msg: 'Comment Added Successfully',
        newcomment: ndata,
      });
    } catch (err) {
      return res.json({ success: false, msg: err.message });
    }
  },
  updateViews: async (req, res) => {
    try {
      const v = await videoTable.findById(req.params.v_id);

      const dat = await videoTable.findOneAndUpdate(
        { _id: req.params.v_id },
        {
          views: v.views + 1,
        },
        { new: true }
      );
      const uniqueview = await historyTable.findOne({
        user_id: req.user.id,
        video_id: req.params.v_id,
      });
      // console.log(uniqueview);
      if (!uniqueview) {
        const newvideo = new historyTable({
          user_id: req.user.id,
          video_id: req.params.v_id,
        });
        const ndata = await newvideo.save();
      } else {
        const data = await historyTable.findByIdAndRemove(uniqueview._id);
        const newvideo = new historyTable({
          user_id: req.user.id,
          video_id: req.params.v_id,
        });
        const ndata = await newvideo.save();

        // const dat = await historyTable.findOneAndUpdate(
        //   { _id: uniqueview._id },
        //   {
        //     date: new Date(),
        //   },
        //   { new: true }
        // );
      }

      res.json({
        success: true,
        msg: 'Update Successfully',
        videoInfo: dat,
      });
    } catch (err) {
      return res.json({ success: false, msg: err.message });
    }
  },
  updateLikes: async (req, res) => {
    try {
      const v = await videoTable.findById(req.params.v_id);

      const dat = await videoTable.findOneAndUpdate(
        { _id: req.params.v_id },
        {
          likes: v.likes + 1,
        },
        { new: true }
      );
      const uniqueview = await likeTable.findOne({
        user_id: req.user.id,
        video_id: req.params.v_id,
      });
      // console.log(uniqueview);
      if (!uniqueview) {
        const newvideo = new likeTable({
          user_id: req.user.id,
          video_id: req.params.v_id,
        });
        const ndata = await newvideo.save();
      }

      res.json({
        success: true,
        msg: 'Update Successfully',
        videoInfo: dat,
      });
    } catch (err) {
      return res.json({ success: false, msg: err.message });
    }
  },
  likedornot: async (req, res) => {
    try {
      const uniqueliked = await likeTable.findOne({
        user_id: req.user.id,
        video_id: req.params.v_id,
      });

      if (uniqueliked) {
        res.json({
          success: true,
          liked: true,
        });
      } else {
        res.json({
          success: true,
          liked: false,
        });
      }
    } catch (err) {
      return res.json({ success: false, msg: err.message });
    }
  },
  onDeleteVideo: async (req, res) => {
    try {
      const data = await videoTable.findByIdAndRemove(req.params.v_id);

      const user = await userTable.findById(req.user.id);
      const dat = await userTable.findOneAndUpdate(
        { _id: req.user.id },
        {
          postCount: user.postCount - 1,
        },
        { new: true }
      );

      res.json({
        success: true,
        msg: 'Deleted Successfully',
      });
    } catch (err) {
      return res.json({ success: false, msg: err.message });
    }
  },
  getTrendingVideo: async (req, res) => {
    try {
      const video = await videoTable
        .find({ isPublic: true, isApprove: true })
        .sort({
          views: -1,
          likes: -1,
        });
      // console.log(video);
      res.json({ success: true, allvideo: video });
    } catch (err) {
      return res.json({ success: false, msg: err.message });
    }
  },
  getViewedVideo: async (req, res) => {
    try {
      const video = await historyTable
        .find({
          user_id: req.user.id,
        })
        .sort({ date: -1 });

      // console.log(video);
      res.json({ success: true, allvideo: video });
    } catch (err) {
      return res.json({ success: false, msg: err.message });
    }
  },
  getLikedVideo: async (req, res) => {
    try {
      const video = await likeTable
        .find({
          user_id: req.user.id,
        })
        .sort({ date: -1 });

      // console.log(video);
      res.json({ success: true, allvideo: video });
    } catch (err) {
      return res.json({ success: false, msg: err.message });
    }
  },
  getAllTags: async (req, res) => {
    try {
      const video = await historyTable.find({
        user_id: req.user.id,
      });

      const videostag = await Promise.all(
        video.map((val) => {
          return videoTable.findById(val.video_id);
        })
      );
      // console.log(videostag);

      // console.log(video);
      res.json({ success: true, tags: videostag });
    } catch (err) {
      return res.json({ success: false, msg: err.message });
    }
  },
  addSubscriber: async (req, res) => {
    try {
      const { channel_id } = req.body;
      let user = await userTable.findById(req.user.id);

      // console.log(user);
      const dat = await userTable.findOneAndUpdate(
        { _id: req.user.id },
        {
          subscribed: [channel_id, ...user.subscribed],
        },
        { new: true }
      );

      let us = await userTable.findById(channel_id);
      const up = await userTable.findOneAndUpdate(
        { _id: channel_id },
        {
          subscriberCount: us.subscriberCount + 1,
        },
        { new: true }
      );

      // user = await userTable.findById(req.user.id);
      // isSubscribed: user.subscribed.includes(channel_id),
      res.json({
        success: true,
        msg: 'Subscribed',
      });
    } catch (err) {
      return res.json({ success: false, msg: err.message });
    }
  },
  subscribedornot: async (req, res) => {
    try {
      const { channel_id } = req.body;
      let user = await userTable.findById(req.user.id);

      if (user.subscribed.includes(channel_id)) {
        res.json({
          success: true,
          subscribed: true,
        });
      } else {
        res.json({
          success: true,
          subscribed: false,
        });
      }
    } catch (err) {
      return res.json({ success: false, msg: err.message });
    }
  },
  search: async (req, res) => {
    try {
      // likeTable
      let text = req.params.text;

      const video = await videoTable
        .find({
          $or: [
            {
              title: {
                $regex: new RegExp(text, 'i'),
              },
            },
            {
              description: {
                $regex: new RegExp(text, 'i'),
              },
            },
            {
              tags: {
                $regex: new RegExp(text, 'i'),
              },
            },
          ],
        })
        .sort({
          views: -1,
          likes: -1,
        })
        .limit(20);

      res.json({
        success: true,
        videoList: video,
      });
    } catch (err) {
      return res.json({ success: false, msg: err.message });
    }
  },
  updateVideoDetails: async (req, res) => {
    try {
      let { title, description, tags, visibility, vid } = req.body;
      tags = tags.trim();
      if (tags.endsWith(',')) {
        tags = tags.slice(0, -1);
      }

      // console.log(tags);
      let tagArray = [];
      let tagsarr = tags.split(',');
      for (let a of tagsarr) {
        tagArray.push(a.toLocaleLowerCase().trim());
      }

      const dat = await videoTable.findOneAndUpdate(
        { _id: vid },
        {
          title,
          description,
          tags: tagArray,
          isPublic: visibility,
        },
        { new: true }
      );
      res.json({
        success: true,
        msg: 'Update Successfully',
      });
    } catch (err) {
      return res.json({ success: false, msg: err.message });
    }
  },
  //admin part
  getAdminAllVideoanduser: async (req, res) => {
    try {
      const video = await videoTable.find().sort({ uploadAt: -1 });
      const user = await userTable.find().sort({ createdAt: -1 });
      const comm = await comTable.find().sort({ createdAt: -1 });

      return res.json({
        success: true,
        allvideo: video,
        alluser: user,
        allcomm: comm,
      });
    } catch (err) {
      return res.json({ success: false, msg: err.message });
    }
  },
  getAdminApproved: async (req, res) => {
    try {
      const dat = await videoTable.findOneAndUpdate(
        { _id: req.params.vid },
        {
          isApprove: true,
        },
        { new: true }
      );
      return res.json({
        success: true,
        msg: 'Approved Successfully',
      });
    } catch (err) {
      return res.json({ success: false, msg: err.message });
    }
  },
  onAdminDeleteVideo: async (req, res) => {
    try {
      const data = await videoTable.findByIdAndRemove(req.params.v_id);
      // console.log(data);
      const user = await userTable.findById(data.userid);
      const dat = await userTable.findOneAndUpdate(
        { _id: data.userid },
        {
          postCount: user.postCount - 1,
        },
        { new: true }
      );

      sendEmailGrid(
        user.name.split(' ')[0],
        user.email,
        CLIENT_URL,
        data.title,
        'delete video'
      );

      res.json({
        success: true,
        msg: 'Deleted Successfully',
      });
    } catch (err) {
      return res.json({ success: false, msg: err.message });
    }
  },
  onMakeAdmin: async (req, res) => {
    try {
      const dat = await userTable.findOneAndUpdate(
        { _id: req.params.u_id },
        {
          isAdmin: true,
        },
        { new: true }
      );
      res.json({
        success: true,
        msg: 'Update Successfully',
      });
    } catch (err) {
      return res.json({ success: false, msg: err.message });
    }
  },
};

const createActivationToken = (payload) => {
  return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {
    expiresIn: '5m',
  });
};

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '1h',
  });
};

const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '7d',
  });
};

const removeTmp = (pat) => {
  fs.unlink(pat, (err) => {
    if (err) throw err;
  });
};

module.exports = userCtrl;
