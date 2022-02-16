// 建立用username 找 name 的功能
let button_search_username = document.querySelector("button.search_username");
button_search_username.addEventListener("click", (e) => {
    let input_search_username = document.querySelector("input.search_username");
    let search_username_value = input_search_username.value; // 取得input value
    // 定義fetch api get_name function
    async function get_name() {
        //取得 fetch api return 的 promise 中的 resolve, 為response, 存入response變數
        let response = await fetch(
            `/api/members?username=${search_username_value}`
        );
        // response.json 會 return 一個 promise, 取得其中的 resolve, 為respone中body轉換為json的格式
        let response_body_json = await response.json();
        // 若成功查詢，則在查詢框下方顯示查詢結果，若查詢結果為null則顯示查無此帳號
            let div_search_username_result = document.querySelector(
                "div.search_username_result"
            );
        if (response_body_json.data) {
            let search_name = response_body_json.data.name;
            div_search_username_result.innerText = search_name + ` (${response_body_json.data.username})`;
            input_search_username.value = ""
        } else {
            console.log('失敗')
            div_search_username_result.innerText = "查無此帳號";
            input_search_username.value = ""
        }
    }
    get_name();
});

// 建立更新該登入username的name之功能
let button_update_name = document.querySelector("button.update_name");
button_update_name.addEventListener("click", (e) => {
    let input_update_name = document.querySelector("input.update_name");
    let update_name_json = { name: input_update_name.value }; // 將input value轉乘json表示法
    // 定義fetch api update_name function
    async function update_name() {
        //取得 fetch api return 的 promise 中的 resolve, 為response, 存入response變數
        let response = await fetch("/api/member", {
            method: "POST",
            body: JSON.stringify(update_name_json),
            headers: {
                "content-type": "application/json",
            },
        });
        // response.json 會 return 一個 promise, 取得其中的 resolve, 為respone中body轉換為json的格式
        let response_body_json = await response.json();
        // 如果return ok 在下方顯示更新成功 及 更改上方歡迎名稱
        let update_name_result = document.querySelector(
            "div.update_name_result"
        );
        let welcome_name = document.querySelector("div.p2");
        if (response_body_json.ok) {
            update_name_result.innerText = "更新成功";
            welcome_name.innerText = `${input_update_name.value}，歡迎登入系統`;
            input_update_name.value = ""
        } else {
            update_name_result.innerText = "更新失敗，更新名稱不可為空白";
        }
    }
    update_name();
});
