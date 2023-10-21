var express = require('express');
var router = express.Router();
var controller = require('../controllers/appController');

/** GET METHOD */
router.route('/login').get(controller.login);
router.route('/posts/:index').get(controller.getPosts);
router.route('/post/:id').get(controller.getPost);
router.route('/commemts/:id').get(controller.getComments);

/** POST METHOD */
router.route('/register').post(controller.register);
router.route('/post').post(controller.createPost);
router.route('/comment').post(controller.creatComment);

/** PUT METHOD */
router.route('/post/:id').put(controller.putPost);
router.route('/comment/:id').put(controller.putComment);

/** DELETE METHOD */
router.route('/post/:id').delete(controller.deletePost);
router.route('/comment/:id').delete(controller.deleteComment);


module.exports = router;
