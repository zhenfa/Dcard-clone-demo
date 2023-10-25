const mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
    /** 用戶名 */
    username: {
        type: String,
        required: [true, "Please provide a unique username"],
        unique: [true, "Username already exists"],
        trim: true,
        minlength: 1,
        maxlength: 15
    },
    /** 密碼 */
    password: {
        type: String,
        required: [true, "Please provide a password"],
        trim: true,
        minlength: 8,
        maxlength: 15
    },
    /** 卡稱 */
    nickname: {
        type: String,
        required: false,
        trim: true,
        minlength: 1,
        maxlength: 10
    },
    /** 性別 */
    sex: {
        type: Boolean,
        required: [true, "Please provide your sex"]
    },
    /** 電話 */
    phone: {
        type: String,
        required: [true, "Please provide your phone number"],
        unique: [true, "The Phone Number has already been used, please use another one"],
        trim: true,
        minlength: 10,
        maxlength: 10
    },
    /** 創建時間 */
    create_date: {
        type: Date,
        required: true
    },
    /** 修改時間 */
    update_date: {
        type: Date,
        required: false
    }
});

module.exports = mongoose.model('User', UserSchema);