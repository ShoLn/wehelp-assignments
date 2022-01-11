function getData(cb) {
  let req = new XMLHttpRequest();
  req.open(
    "get",
    "https://padax.github.io/taipei-day-trip-resources/taipei-attractions-assignment.json"
  );
  req.onload = function () {
    cb(this.responseText);
  };

  req.send();
}

getData(function (data) {
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
  /////////////// create image and p tag put into div.pic ///////////////
  let div_pic = document.querySelectorAll("div.pic");
  for (let i = 0; i < div_pic.length; i++) {
    let img = document.createElement("img");
    let p = document.createElement("p");
    img.src = picArray[i];
    p.innerText = titleArray[i];
    div_pic[i].appendChild(img);
    div_pic[i].appendChild(p);
  }
});

/////////////   button event //////////////////////
let button = document.querySelector("div.button button");
button.addEventListener("click", () => {
  ////////////////////   AJAX   ///////////////////
  getData(function (data) {
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
    ////////////////// createMiddle function //////////////
    function createMiddle() {
      let div_middle = document.createElement("div");
      div_middle.classList.add("middle");
      let div_picup = document.querySelector("div.picup");
      div_picup.appendChild(div_middle);
    }
    //////////////////  addOne div.pic function /////////////
    function addOne() {
      let div_pic = document.createElement("div"); // create div tag as div_pic
      div_pic.classList.add("pic"); // add class pic to div_pic
      let img = document.createElement("img"); // create img tag
      let p = document.createElement("p"); // create p tag
      let div_pic_all = document.querySelectorAll("div.pic"); // select all div.pic
      img.src = picArray[div_pic_all.length]; // add src attribute to img
      p.innerText = titleArray[div_pic_all.length]; // add innerText attribute to p
      div_pic.appendChild(img); // append img to div_pic
      div_pic.appendChild(p); // append p to div_pic
      let div_picup = document.querySelector("div.picup"); // select div.picup
      div_picup.appendChild(div_pic); // append div.pic to div.picup
    }
    let div_pic_all = document.querySelectorAll("div.pic"); // select all div.pic
    let lendif = titleArray.length - div_pic_all.length;
    if (lendif >= 8) {
      createMiddle();
      for (let i = 0; i < 4; i++) {
        addOne();
      }
      createMiddle();
      for (let i = 0; i < 4; i++) {
        addOne();
      }
    } else if (lendif >= 4 && lendif < 8) {
      createMiddle();
      for (let i = 0; i < 4; i++) {
        addOne();
      }
      createMiddle();
      for (let i = 0; i < lendif - 4; i++) {
        addOne();
      }
    } else if (lendif < 4 && lendif > 0) {
      createMiddle();
      for (let i = 0; i < lendif; i++) {
        addOne();
      }
    } else {
      alert("no more data");
    }
  });
});





// ////////////////////////////// Promise///////////////////////////////////////////////////

// function getData() {
//   return new Promise(function (resolve, reject) {
//     let req = new XMLHttpRequest();
//     req.open(
//       "get",
//       "https://padax.github.io/taipei-day-trip-resources/taipei-attractions-assignment.json"
//     );
//     req.onload = function () {
//       resolve(this.responseText);
//     };
//     req.onerror = function () {
//       reject("error");
//     };
//     req.send();
//   });
// }

// let promise = getData();
// promise.then(function (data) {
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
//   ////////////////////////////// create image and p tag put into div.pic /////////////////////////
//   let div_pic = document.querySelectorAll("div.pic");
//   for (let i = 0; i < div_pic.length; i++) {
//     let img = document.createElement("img");
//     let p = document.createElement("p");
//     img.src = picArray[i];
//     p.innerText = titleArray[i];
//     div_pic[i].appendChild(img);
//     div_pic[i].appendChild(p);
//   }
// });

// ////////////////////////////// create div.pic when click load more /////////////////////////
// let button = document.querySelector("div.button button");
// button.addEventListener("click", (e) => {
//     for (let i=0; i<8; i++){
//         let div_pic = document.createElement("div")
//         div_pic.classList.add('pic')
//         let div_picup = document.querySelector("div.picup")
//         div_picup.appendChild(div_pic)
//     }
// });