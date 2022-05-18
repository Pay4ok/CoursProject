"use strict"

let imgArr = new Array;
let State = false;
let curPos = 32;
let main_gallery_div;
let main_gallery_styleT;
let body_styleT;
let oneceDefine = false;
let imgArrTemp;

window.onload = function() {    
     main_gallery_div = document.querySelector('.main-gallery-div');
    
    main_gallery_styleT = main_gallery_div;
    body_styleT = document.querySelector('body').style;

    for (let i = 0; i < main_gallery_div.childElementCount; i++) { // Определение div
        if (main_gallery_div.children[i].tagName === "DIV" && (main_gallery_div.children[i].classList[0] != 'goleft' && main_gallery_div.children[i].classList[0] != 'goright')) {
            if (!oneceDefine) {
                imgArr.push(i);
            }
        }
        else {        
            console.log(main_gallery_div.children[i]);
        }
    }

    if (!oneceDefine) {
        imgArrTemp = imgArr;
    }
    imgArr = imgArrTemp;
    oneceDefine = true;
}

window.onresize = function() {
    setTimeout(() => {
        if (screen.width <= 470 && !State) {
            CloseGallery();
        }
        else if (screen.width > 470 && State) {
            
            curPos = (imgArr.length - 1) / 2;
            imgArr.sort(function(a, b) {
                return a - b;
              });
            for (let n =0; n < main_gallery_styleT.childElementCount; n++) {
                main_gallery_div.children[n].style = main_gallery_styleT.children[n];
            }
            State = false;
        }
    }, 1000);
}

function t_btnClick() {
    window.scrollTo({
        top: document.querySelector('.propose-phrase').offsetTop,
        behavior: "smooth",
    })
}

function gotoAbout() {
    window.scrollTo({
        top: document.querySelector('.propose').offsetTop,
        behavior: "smooth",
    })
}

function gotoGallery() {
    window.scrollTo({
        top: document.querySelector('.gallery').offsetTop,
        behavior: "smooth",
    })
}

function galleryOpen(e) {
    const left = document.querySelector('.goleft');
    const right = document.querySelector('.goright');

    main_gallery_div = document.querySelector('.main-gallery-div');

    main_gallery_styleT = main_gallery_div;
    body_styleT = document.querySelector('body').style;

    left.style.display = 'flex';
    right.style.display = 'flex';

    right.style.gridColumnStart = '3';
    left.style.gridColumnStart = '1';

    main_gallery_div.style.gridTemplateColumns = '1fr 1fr 1fr'
    main_gallery_div.style.height = '70vh'

    if (screen.width > 470) {
        document.querySelector('body').style.backgroundColor = '#191a1d';
        document.querySelector('body').style.color = 'white';
        
        
        for (let i = 0; i < main_gallery_div.childElementCount; i++) { // Определение div
            console.log(main_gallery_div.children[i].tagName === "DIV" && (main_gallery_div.children[i].classList[0] != 'goleft' && main_gallery_div.children[i].classList[0] != 'goright'));
            if (main_gallery_div.children[i].tagName === "DIV" && (main_gallery_div.children[i].classList[0] != 'goleft' && main_gallery_div.children[i].classList[0] != 'goright')) {

                main_gallery_div.children[i].style.height = '100%';
                main_gallery_div.children[i].style.transform = 'none';

                if (!oneceDefine) {
                    imgArr.push(i);
                }
            }
            else {        
                if (main_gallery_div.children[i].classList[0] == 'goleft') {
                    main_gallery_div.children[i].style.gridColumnStart = '1';
                    main_gallery_div.children[i].style.display = 'flex';
                }
                else if  (main_gallery_div.children[i].classList[0] == 'goright') {
                    main_gallery_div.children[i].style.gridColumnStart = '3';
                    main_gallery_div.children[i].style.display = 'flex';
                }
                else {
                    main_gallery_div.children[i].style.display = 'none';
                    console.log(main_gallery_div.children[i]);
                }
            }
        }

        if (!oneceDefine) {
            imgArrTemp = imgArr;
        }
        imgArr = imgArrTemp;
        oneceDefine = true;

        for (let num in imgArr) {     // Распределение div по сторонам
            console.log(main_gallery_div.children[imgArr[num]], num);
            if (num != (imgArr.length-1) / 2) {
                if (num < (imgArr.length-1) / 2) {
                    if (main_gallery_div.children[imgArr[num]].classList[0] === 'goleft') { // определение -- кнопка ли это? 
                        main_gallery_div.children[imgArr[num]].style.gridColumnStart = '1';
                        main_gallery_div.children[imgArr[num]].style.display = 'flex';
                    }
                    else if (main_gallery_div.children[imgArr[num]].classList[0] === 'goright') {
                        main_gallery_div.children[imgArr[num]].style.gridColumnStart = '3';
                        main_gallery_div.children[imgArr[num]].style.display = 'flex';
                    }
                    else {
                        main_gallery_div.children[imgArr[num]].style.transform = 'translateX(-400vh)';
                    }
                }
                else {
                    if (main_gallery_div.children[imgArr[num]].classList[0] === 'goleft') {   // определение -- кнопка ли это? 
                        main_gallery_div.children[imgArr[num]].style.gridColumnStart = '1';
                        main_gallery_div.children[imgArr[num]].style.display = 'flex';
                    }
                    else if (main_gallery_div.children[imgArr[num]].classList[0] === 'goright') {
                        main_gallery_div.children[imgArr[num]].style.gridColumnStart = '3';
                        main_gallery_div.children[imgArr[num]].style.display = 'flex';
                    }
                    else {    
                        main_gallery_div.children[imgArr[num]].style.transform = 'translateX(400vh)';
                    }
                }
            }
            else {
                main_gallery_div.children[imgArr[num]].style.gridColumnStart = '2';
            }
        }
    }
}

function galleryMove(e) {
    const moveBtn = e.target.parentElement;
    const centerIndex = (imgArr.length - 1) / 2;

    if (curPos === 32) curPos = centerIndex;

    if (screen.width > 470) {
        if (moveBtn.classList[0] === 'goleft') {
            if (main_gallery_div.children[imgArr[curPos + 1]] != undefined) {
                main_gallery_div.children[imgArr[centerIndex]].style.transform = 'translateX(-200vh)';

                main_gallery_div.children[imgArr[centerIndex+1]].style.transform = 'none';
                main_gallery_div.children[imgArr[centerIndex+1]].style.gridColumnStart = '2';

                curPos = curPos + 1;

                let temp = imgArr[0];
                for (let i = 0; i < imgArr.length; i++) { // циклический сдвиг массива для дальнейшей работы со смещением фотографий

                    if (i != imgArr.length - 1) {
                        imgArr[i] = imgArr[i+1];
                    }
                    else {
                        imgArr[i] = temp;
                    }
                }
            }
        }
        else if (moveBtn.classList[0] === 'goright') {
            if (main_gallery_div.children[imgArr[curPos - 1]] != undefined) {
                main_gallery_div.children[imgArr[centerIndex]].style.transform = 'translateX(200vh)';
                
                main_gallery_div.children[imgArr[centerIndex-1]].style.transform = 'none';
                main_gallery_div.children[imgArr[centerIndex-1]].style.gridColumnStart = '2';

                curPos = curPos - 1;

                let temp = imgArr[imgArr.length - 1];
                for (let i = imgArr.length - 1; i >= 0; i--) { // циклический сдвиг(в другую сторону)  массива для дальнейшей работы со смещением фотографий

                    if (i != 0) {
                        imgArr[i] = imgArr[i-1];
                    }
                    else {
                        imgArr[i] = temp;
                    }
                }
            }   
        }
    }
    else {
        console.log(curPos);
        if (moveBtn.classList[0] === 'goleft') {
            for (let i in imgArr) {
                console.log(main_gallery_div.children[imgArr[i]]);
            }
            if (main_gallery_div.children[imgArr[curPos + 1]] != undefined) {
                if (main_gallery_div.children[imgArr[curPos + 1]].classList[0] != 'goleft') {
                    main_gallery_div.children[imgArr[centerIndex]].style.transform = 'translateX(-100vh)';

                    main_gallery_div.children[imgArr[centerIndex+1]].style.transform = 'none';

                    curPos = curPos + 1;

                    let temp = imgArr[0];
                    for (let i = 0; i < imgArr.length; i++) { // циклический сдвиг массива для дальнейшей работы со смещением фотографий    

                        if (i != imgArr.length - 1) {
                            imgArr[i] = imgArr[i+1];
                        }
                        else {
                            imgArr[i] = temp;
                        }
                    }
                }
            }
        }
        else if (moveBtn.classList[0] === 'goright') {
            console.log(main_gallery_div.children[imgArr[curPos - 1]]);
            if (main_gallery_div.children[imgArr[curPos - 1]] != undefined) {
                if (main_gallery_div.children[imgArr[curPos - 1]].classList[0] != 'goright') {
                    main_gallery_div.children[imgArr[centerIndex]].style.transform = 'translateX(100vh)';
                    
                    main_gallery_div.children[imgArr[centerIndex-1]].style.transform = 'none';

                    curPos = curPos - 1;

                    let temp = imgArr[imgArr.length - 1];
                    for (let i = imgArr.length - 1; i >= 0; i--) { // циклический сдвиг(в другую сторону)  массива для дальнейшей работы со смещением фотографий

                        if (i != 0) {
                            imgArr[i] = imgArr[i-1];
                        }
                        else {
                            imgArr[i] = temp;
                        }
                    }
                }
            }  
        }
    }
}

function modalOpen() {
    document.querySelector('.modal-window').style.display = 'block';
}
function modalClose() {
    document.querySelector('.modal-window').style.display = 'none';
}

function DBOpen() {
  document.querySelector('.tours-db-window').style.display = 'block';
}

function tourDBClose() {
    document.querySelector('.tours-db-window').style.display = 'none';
}

function CloseGallery() {
    if (main_gallery_styleT != undefined) {

        curPos = (imgArr.length - 1) / 2;
        main_gallery_div.style = main_gallery_styleT.style;
        document.querySelector('body').style = body_styleT;

        imgArr.sort(function(a, b) {
            return a - b;
          });

        for (let i in imgArr) {
            console.log(imgArr[i]);
        }
        
        State = true;
    }  
}

window.onscroll = () => {
    console.log(Math.round(window.scrollY),main_gallery_div.offsetTop);
    if (Math.round(window.scrollY - 240) >= main_gallery_div.offsetTop || Math.round(window.scrollY) <= main_gallery_div.offsetTop - 650 ) {
        CloseGallery();

        curPos = (imgArr.length - 1) / 2;
            imgArr.sort(function(a, b) {
                return a - b;
              });
            for (let n =0; n < main_gallery_styleT.childElementCount; n++) {
                main_gallery_div.children[n].style = main_gallery_styleT.children[n];
            }
            State = false;
    }
}

