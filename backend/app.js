var createError = require('http-errors');
var express = require('express');
var path = require('path');
var app = express();
var cors = require('cors');

/** 建立路由對象 */
const router = require('./routes/index');

/** 解析 json 物件 */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
/** 跨域 */
app.use(cors());
/** 綁定靜態資源 */
app.use(express.static(path.join(__dirname, 'public')));

/** API 路由註冊 */
app.use('/api', router);

/** API 路由匹配失敗 */
app.use(function(req, res, next) {
  res.status(404).json(createError(404));
});

module.exports = app;
