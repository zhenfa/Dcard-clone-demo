const jwt = require('jsonwebtoken');

const Post = require('../model/post');
const User = require('../model/user');


/** 
 * [測試 API] GET : /api/test
 */
module.exports.test = async (req, res) => {
    
    try{
        res.status(200).json({message:"API Test Success"});
    }catch(error){
        res.status(500).send(error.message);
    }
}


/** 
 * [登入] GET : /api/login
 * @param { string } username  用戶名
 * @param { string } password 密碼
 */
module.exports.login = async (req, res) => {
    
    try{
        let {username, password} = req.body;
        
        let user = await User.findOne({ username, password });
        
        /** 確認是否有該用戶 */
        if( !user )
        {
            res.status(404).json({message:"User not found, Please check your username or password", data:user});
            return;
        }

        /** 創建 jwt token */
        const token =  jwt.sign({
            userId: user._id,
            username:user.username,
        }, process.env.JWT_SECRET, {expiresIn:"24h"});

        res.status(200).json({message:"User login successful!", data:{username, token}});

    }catch(error){
        res.status(500).send(error.message);
    }
}

/** 
 * [取得文章列表]  GET : /api/posts
 * 一次加載 20 筆數據
 * @param { number } pageKey 最後一筆文章頁籤，預設可為空
 * 
*/
module.exports.getPosts = async (req, res) => {
    try{
        let { pageKey } = req.query; 

        /** 取得後 10 筆資料 */
        let data = ( !pageKey )
                    ? await Post.find({}).limit(10).sort({_id:-1})
                    : await Post.find({_id:pageKey}).limit(10).sort({_id:-1});

        res.status(200).json({message:(data.length === 0) ? "no data" : "", data});

    }catch(error){
        res.status(500).send(error.message);
    }
}

/** 
 * [取得文章詳情] GET : /api/post/:id
 * @param { number } id 文章唯一碼
 * 
*/
module.exports.getPost = async (req, res) => {
    try{
        let { id } = req.params;

        let data = await Post.find({_id:id});
        
        if( !data )
        {
            res.status(404).send("Post not found");
            return;
        }

        res.status(200).json(data);

    }catch(error){
        res.status(500).send(error.message);
    }
}

// /**
//  * 
//  * @param {*} req 
//  * @param {*} res 
//  */
// module.exports = async function getCommments(req, res){

// }

/** 
 * [註冊] POST : /api/register 
 * @param { string } username 用戶名
 * @param { string } password 密碼
 * @param { string } sex 性別
 * @param { string } phone 手機號碼
*/
module.exports.register = async function register(req, res) {
    try{
        let { username, password, sex, phone } = req.body;

        /** 創建 user 模型 */ 
        let user = new User({
            username,
            password,
            sex,
            phone,
            create_date:new Date()
        })

        /** 註冊用戶 */
        let data = await user.save();

        res.status(200).json({message:"User register successful", data});

    }catch(error){
        res.status(400).json({message:"User created fail, Please check user form format", error});
    }
}