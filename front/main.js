(function(){

    /** [ API ] 取得熱門看板資料
     * 
     * @returns { Array } 熱門看板資料列
     */
    let getHotClassification = async () => {
        try{
            let response = await axios('http://localhost:3000/api/cls')

            return response.data.data;

        }catch(error){
            let { status, data } = error.response;
            /** TODO:lOG RECORD */
            console.log(`[API fail-${status}]-${data.message}`);
            return [];
        }        
    }

    /** [ API ]取得文章列表資料
     * 
     * @param { number } [pageKey=""] - 上一筆最後一則文章的 key，default:""    
     * @returns { Array } 熱門看板 json 資料
     */
    let getPosts = async ( pageKey="" ) =>{
        try{
            let response = await axios.get('http://localhost:3000/api/posts');

            const { data } = response.data;

            /** 紀錄每次請求最後一筆的 pageKey */
            if( data.length !== 0 )
            {   
                let [lastPostsItem] = data.slice(-1);
                /** 儲存至 LocalStorage */
                window.localStorage.setItem("pageKey", lastPostsItem);
            }

            return data;

        }catch(error){
            let { status, data } = error.response;
            /** TODO:lOG RECORD */
            console.log(`[API fail-${status}]-${data.message}`);
            return [];
        }
    }

    /** [ ACTION ] 創建 Post List，操作 DOM
     * 
     * @param { Array } [jsonData=[]] - Post模型數據陣列
     */
    let actionPostList = ( jsonData = [] ) => {

        if( jsonData.length === 0 )
        {
            // TODO: 返回沒有資料圖示
            console.log("沒有更多資料了，嘗試創建個文章吧");
            return;
        }
        try{
            let strHtml = "";

            /** 創建文章列表 html */
            jsonData.forEach(item => {
                strHtml += 
                `<article class="py-5 w-full flex flex-col h-[156px] justify-between border-b cursor-pointer" id=${item.id}>
                    <header class="flex items-center">
                        <div class="pr-2">
                            <img class="rounded-full" src="${item.img_url}" alt="">
                        </div>
                        <span class="text-sm text-gray-400">${item.classification}．${item.create_user}．23 小時</span>
                    </header>
                    <section>
                        <h2 class="font-extrabold text-lg overflow-hidden whitespace-nowrap text-ellipsis">${item.title}</h2>
                        <p class="text-sm text-gray-500 whitespace-nowrap text-ellipsis overflow-hidden">
                            ${item.content}
                        </p>
                    </section>
                    <footer>
                        <div class="flex items-center">
                            <div class="flex pr-4 cursor-pointer">
                                <div class="rounded-full p-1 5 bg-red-400 ">
                                    <svg class="fill-white" xmlns="http://www.w3.org/2000/svg" height="0.7em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><style>svg{fill:#fafcff}</style><path d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2H464c26.5 0 48 21.5 48 48c0 18.5-10.5 34.6-25.9 42.6C497 275.4 504 288.9 504 304c0 23.4-16.8 42.9-38.9 47.1c4.4 7.3 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48H294.5c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3V320 272 247.1c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192H96c17.7 0 32 14.3 32 32V448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V224c0-17.7 14.3-32 32-32z"/></svg>
                                </div>
                                <span class="text-sm text-[#cccccc] pl-1.5 font-bold">${item.star || 0}</span>
                            </div>
                            <div class="flex pr-4 cursor-pointer">
                                <div class="rounded-full p-1 bg-[#3397CF] flex">
                                    <svg class="fill-white" xmlns="http://www.w3.org/2000/svg" height="0.7em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><style>svg{fill:#f7f7f8}</style><path d="M64 0C28.7 0 0 28.7 0 64V352c0 35.3 28.7 64 64 64h96v80c0 6.1 3.4 11.6 8.8 14.3s11.9 2.1 16.8-1.5L309.3 416H448c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H64z"/></svg>
                                </div>
                                <span class="text-sm text-[#cccccc] pl-1.5 font-bold">${item.comment || 0}</span>
                            </div>
                            <div class="flex pr-4 cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><style>svg{fill:#cccccc}</style><path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z"/></svg>
                                <span class="text-sm text-[#cccccc] pl-1.5 font-bold">收藏</span>
                            </div>
                        </div>
                    </footer>
                </article>`
            })

            /** 操作 DOM */
            document.getElementById("posts-list").innerHTML = strHtml;

        }catch(error){
            /** TODO:lOG RECORD */
            console.log(`[ACTION fail]-${error.message}`);
        }
    }

    /** [ ACTION ] 創建 Hot Classification List，操作 DOM
     * 
     * @param { Array } [jsonData=[]] - Classification模型數據陣列
     */
    let actionHotClassication = (jsonData=[])=>{
        if( jsonData.length === 0 )
        {
            // TODO: 返回沒有資料圖示
            console.log("沒有更多資料了");
            return;
        }
        try{
            let strHtml = "";

            /** 創建熱門分類列表 html */
            jsonData.forEach( item => {
                strHtml += 
                `<a href="#" class="hover:bg-[#040D21]" id="${item.id}">
                    <li class="">
                        <div class="flex h-11 pl-5 pr-2 5 items-center">
                            <img class="rounded-full w-[28px] h-[28px]" src="${item.img_url}" alt="">
                            <h5 class="overflow-hidden text-base text-[#9FB2BC] ml-2.5 mr-2.5 whitespace-nowrap">${item.title}</h5>
                        </div>
                    </li>
                </a>`
            });

            /** 操作 DOM */
            document.getElementById("hot-cls-list").innerHTML = strHtml;

        }catch(error){
            /** TODO:lOG RECORD */
            console.log(`[ACTION fail]-${error.message}`);
        }
    }

    /** [ ACTION ]資料初始化
     * 
     */
    let init = async () => {

        /** 清除先前狀態 */
        window.localStorage.clear();

        /** 取得初始化資料 */
        let strHotCls = await getHotClassification();
        let strPosts = await getPosts();

        /** 操作所有區塊 DOM */
        actionHotClassication(strHotCls);
        actionPostList(strPosts);
 
    }

    init();
})()