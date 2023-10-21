
import * as controller from '../controllers/appController';

var express = require('express');
var router = express.Router();

/* GET home page. */
router.route('/test').get((req,res) => {
  res.status(200).send("get sucess!!");
})

router.route('/register').post(controller.register);


export default router;
