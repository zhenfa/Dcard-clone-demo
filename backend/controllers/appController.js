/** 
 * [登入] GET : /api/login
 * @param { string } account  帳號
 * @param { string } password 密碼
 */
export async function login(req, res) {

}

/** 
 * [取得文章列表] GET : /api/login 
 * @param { number } index 文章頁籤，預設可為空
 * 
*/
export async function getPosts(req, res) {

}

/** 
 * [註冊] POST : /api/register 
 * @param { string } account 帳號
 * @param { string } password 密碼
 * @param { string } sex 性別
*/
export async function register(req, res) {
    res.status(200).json({status:200, data:"asd"});
}