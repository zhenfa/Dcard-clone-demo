const express = require('express');
const router = express.Router();
const controller = require('../controllers/appController');
const {Auth} = require('../middleware/auth');

/** GET METHOD */
router.route('/test').get(controller.test);
router.route('/login').get(controller.login);
router.route('/cls').get(controller.getClassifications);
router.route('/posts').get(controller.getPosts);
router.route('/post/:id').get(controller.getPost);
// router.route('/commemts/:id').get(controller.getComments);

// /** POST METHOD */
router.route('/register').post(controller.register);
router.route('/post').post(Auth, controller.createPost);
// router.route('/comment').post(Auth, controller.creatComment);

// /** PUT METHOD */
// router.route('/post/:id').put(Auth, controller.putPost);
// router.route('/comment/:id').put(Auth, controller.putComment);

// /** DELETE METHOD */
// router.route('/post/:id').delete(Auth, controller.deletePost);
// router.route('/comment/:id').delete(Auth, controller.deleteComment);


module.exports = router;
