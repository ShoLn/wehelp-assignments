///////////////////////////////////////////////////////////////
/////////////////////// 使用promise的方法 //////////////////////
///////////////////////////////////////////////////////////////

////////////////////////////// create Promise object ///////////////////////////////

let promise = new Promise(function (resolve, reject) {
    let req = new XMLHttpRequest();
    req.open(
        "get",
        "https://padax.github.io/taipei-day-trip-resources/taipei-attractions-assignment.json"
    );
    req.onload = function () {
        resolve(this.responseText);
    };
    req.onerror = function () {
        reject();
    };
    req.send();
});

promise
    .then(function (data) {
        ////// 當XMLhttprequest讀取完後的動作，處理json資料，擷取title跟picture src ////////
        let dataResults = JSON.parse(data).result.results;
        let picArray = [];
        let titleArray = [];
        for (let i = 0; i < dataResults.length; i++) {
            let firstPic = dataResults[i].file.split("//")[1];
            let picTemp = "https://" + firstPic.substr(0, firstPic.length - 6);
            picArray.push(picTemp);
            let titleTemp = dataResults[i].stitle;
            titleArray.push(titleTemp);
        }
        //// 製作根據目前已導入的圖片數量決定要導入幾張圖片的function //////
        function create_div_pic() {
            let allDivPic = document.querySelectorAll("div.pic");
            allDivPicLength = allDivPic.length; // 抓取目前div.pic數量
            titleArrayLength = titleArray.length;
            differ = titleArrayLength - allDivPicLength;
            ///// 自訂導入數量參數的function ///////
            function number(num) {
                let allDivPic = document.querySelectorAll("div.pic");
                allDivPicLength = allDivPic.length; // 抓取目前div.pic數量
                for (let i = allDivPicLength; i < allDivPicLength + num; i++) {
                    let div_pic = document.createElement("div"); // 新增div.pic
                    div_pic.classList.add("pic");
                    let img = document.createElement("img"); // 新增 img
                    img.src = picArray[i];
                    let div_p = document.createElement("div"); // 新增 div.p
                    div_p.classList.add("p");
                    div_p.innerText = titleArray[i];
                    div_pic.appendChild(img); // append img to div.pic
                    div_pic.appendChild(div_p); // append div.p to div.pic
                    let div_picup = document.querySelector("div.picup");
                    div_picup.appendChild(div_pic); // append div.pic to div.picup
                }
                let div_picup = document.querySelector("div.picup");
                let div_middle = document.createElement("div"); //製作div.middle並append至div.picup
                div_middle.classList.add("middle");
                div_picup.appendChild(div_middle);
            }
            //// 根據已載入的圖片數量決定要新增幾張圖片，若都載入完了則alert no more data ////
            if (differ > 8) {
                number(4);
                number(4);
            } else if (differ < 8 && differ >= 5) {
                number(4);
                number(differ - 4);
            } else if (differ < 5 && differ > 0) {
                number(differ);
            } else {
                alert("No more data!!!!!!!!!!!");
            }
        }
        //////// 讀取自動導入8張圖片 //////////      
        create_div_pic();     
        /////// 點擊button導入圖片 /////////
        let button = document.querySelector("button");
        button.addEventListener("click", () => {
            create_div_pic();
        });
    })
    .catch(function () {
        // AJAX連線失敗時執行此函式 //
        alert("Teavel Data Connect Failed!!!!!!!");
    });

///////////////////////////////////////////////////////////////
/////////////////////// 沒用promise的方法 //////////////////////
///////////////////////////////////////////////////////////////

// function getData(cb) {
//   let req = new XMLHttpRequest();
//   req.open(
//     "get",
//     "https://padax.github.io/taipei-day-trip-resources/taipei-attractions-assignment.json"
//   );
//   req.onload = function () {
//     cb(this.responseText);
//   };

//   req.send();
// }

// getData(function (data) {
//   let dataResults = JSON.parse(data).result.results;
//   let picArray = [];
//   let titleArray = [];
//   for (let i = 0; i < dataResults.length; i++) {
//     let firstPic = dataResults[i].file.split("//")[1];
//     let picTemp = "https://" + firstPic.substr(0, firstPic.length - 6);
//     picArray.push(picTemp);
//     let titleTemp = dataResults[i].stitle;
//     titleArray.push(titleTemp);
//   }
//   /////////////// create image and p tag put into div.pic ///////////////
//   let div_pic = document.querySelectorAll("div.pic");
//   for (let i = 0; i < div_pic.length; i++) {
//     let img = document.createElement("img");
//     let div_p = document.createElement("div");
//     div_p.classList.add('p')
//     img.src = picArray[i];
//     div_p.innerText = titleArray[i];
//     div_pic[i].appendChild(img);
//     div_pic[i].appendChild(div_p);
//   }
// });

// /////////////   button event //////////////////////
// let button = document.querySelector("div.button button");
// button.addEventListener("click", () => {
//   ////////////////////   AJAX   ///////////////////
//   getData(function (data) {
//     let dataResults = JSON.parse(data).result.results;
//     let picArray = [];
//     let titleArray = [];
//     for (let i = 0; i < dataResults.length; i++) {
//       let firstPic = dataResults[i].file.split("//")[1];
//       let picTemp = "https://" + firstPic.substr(0, firstPic.length - 6);
//       picArray.push(picTemp);
//       let titleTemp = dataResults[i].stitle;
//       titleArray.push(titleTemp);
//     }
//     ////////////////// createMiddle function //////////////
//     function createMiddle() {
//       let div_middle = document.createElement("div");
//       div_middle.classList.add("middle");
//       let div_picup = document.querySelector("div.picup");
//       div_picup.appendChild(div_middle);
//     }
//     //////////////////  addOne div.pic function /////////////
//     function addOne() {
//       let div_pic = document.createElement("div"); // create div tag as div_pic
//       div_pic.classList.add("pic"); // add class pic to div_pic
//       let img = document.createElement("img"); // create img tag
//       let div_p = document.createElement("div"); // create div.p tag
//       div_p.classList.add('p')
//       let div_pic_all = document.querySelectorAll("div.pic"); // select all div.pic
//       img.src = picArray[div_pic_all.length]; // add src attribute to img
//       div_p.innerText = titleArray[div_pic_all.length]; // add innerText attribute to p
//       div_pic.appendChild(img); // append img to div_pic
//       div_pic.appendChild(div_p); // append p to div_pic
//       let div_picup = document.querySelector("div.picup"); // select div.picup
//       div_picup.appendChild(div_pic); // append div.pic to div.picup
//     }
//     let div_pic_all = document.querySelectorAll("div.pic"); // select all div.pic
//     let lendif = titleArray.length - div_pic_all.length;
//     if (lendif >= 8) {
//       createMiddle();
//       for (let i = 0; i < 4; i++) {
//         addOne();
//       }
//       createMiddle();
//       for (let i = 0; i < 4; i++) {
//         addOne();
//       }
//     } else if (lendif >= 4 && lendif < 8) {
//       createMiddle();
//       for (let i = 0; i < 4; i++) {
//         addOne();
//       }
//       createMiddle();
//       for (let i = 0; i < lendif - 4; i++) {
//         addOne();
//       }
//     } else if (lendif < 4 && lendif > 0) {
//       createMiddle();
//       for (let i = 0; i < lendif; i++) {
//         addOne();
//       }
//     } else {
//       alert("no more data");
//     }
//   });
// });
