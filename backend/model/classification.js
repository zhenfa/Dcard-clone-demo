let mongoose = require('mongoose');

let ClassificationSchema = mongoose.Schema({
    /** 分類名稱 */
    title:{
        type:String,
        trim:true,
        require:[true, "Please provide a name"],
        minlength:[3, "3 ~ 15 charactor limit"],
        maxlength:[15, "3 ~ 15 charactor limit"]
    },
    /** 是否為熱門標籤 */
    hot:{
        type:Boolean,
        require:false
    },
    /** 分類圖片 */
    img_url:{
        type: String,
        require:[true,"Please provide a image"]
    },
    /** 創建者 */
    create_user:{
        type:String,
        require:false
    },
    /** 創建時間 */
    create_date:{
        type:Date,
        require:[true, "Please provide a create date"]
    }
})

module.exports = mongoose.model('Classification', ClassificationSchema);