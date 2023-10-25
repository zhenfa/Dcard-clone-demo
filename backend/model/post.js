let mongoose = require('mongoose');

let PostSchema = new mongoose.Schema({
    _id:{
        type:String
    },
    classfication:{
        type:String,
        require:true
    },
    title:{
        type:String,
        require:[true, "Please provide a title"],
        trim:true,
        minlength:[2, "Please enter at least two charactor"],
        maxlength:[15, "8 charactor max"]
    },
    tag:{
        type:String
    },
    content:{
        type:String,
        require:[true, "Please provide content"],
        trim:false,
        minlength:[10, "Please enter at least ten charactor"],
        maxlength:[500, "500 charactor max"],

    },
    img_url:{
        type:String,
        require:[true,"Please provide a image"],
        trim:true
    },
    star:{
        type:Number,
        require:false
    },
    create_user:{
        type:String,
        require:[true,"Please provide a create user"],
        trim:true
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

module.exports = mongoose.model('Post', PostSchema);