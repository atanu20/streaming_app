const router = require('express').Router();
const userCtrl = require('../controllers/userCtrl');
const auth = require('../middleware/auth');

router.post('/register', userCtrl.register);

router.post('/activation', userCtrl.activateEmail);

router.post('/login', userCtrl.login);

router.get('/infor', auth, userCtrl.getUserInfor);
router.post('/uploadVideo', auth, userCtrl.uploadVideo);

router.patch('/uploadProfileImg', auth, userCtrl.uploadProfileImg);
router.patch('/updateDesc', auth, userCtrl.updateDesc);
router.post('/getAllVideo', auth, userCtrl.getAllVideo);
router.post('/getRandomAccountDetails', auth, userCtrl.getRandomAccountDetails);
router.get('/getAllFavVideo', auth, userCtrl.getAllFavVideo);
router.get('/getVideoById/:vid', auth, userCtrl.getVideoById);
router.get('/getCommentsById/:vid', auth, userCtrl.getCommentsById);
router.post('/postComments', auth, userCtrl.postComments);
router.get('/updateViews/:v_id', auth, userCtrl.updateViews);
router.get('/updateLikes/:v_id', auth, userCtrl.updateLikes);
router.get('/likedornot/:v_id', auth, userCtrl.likedornot);
router.get('/onDeleteVideo/:v_id', auth, userCtrl.onDeleteVideo);
router.get('/getTrendingVideo', auth, userCtrl.getTrendingVideo);
router.get('/getViewedVideo', auth, userCtrl.getViewedVideo);
router.get('/getLikedVideo', auth, userCtrl.getLikedVideo);
router.get('/getAllTags', auth, userCtrl.getAllTags);

router.post('/addSubscriber', auth, userCtrl.addSubscriber);
router.post('/subscribedornot', auth, userCtrl.subscribedornot);
router.get('/search/:text', auth, userCtrl.search);
router.post('/updateVideoDetails', auth, userCtrl.updateVideoDetails);

// admin part

router.get('/getAdminAllVideoanduser', auth, userCtrl.getAdminAllVideoanduser);
router.get('/getAdminApproved/:vid', auth, userCtrl.getAdminApproved);
router.get('/onAdminDeleteVideo/:v_id', auth, userCtrl.onAdminDeleteVideo);
router.get('/onMakeAdmin/:u_id', auth, userCtrl.onMakeAdmin);

module.exports = router;
