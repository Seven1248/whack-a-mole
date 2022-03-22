//初始化
var btn = document.getElementsByTagName("button")[0]; //button
var time = document.getElementById("time"); //找到時間
var combo = document.getElementById("combo"); //找到分數
var animal = document.getElementsByClassName("cell");
var flag = 0; //判別遊戲狀況 停止 0 遊戲中 1
var sec = 0, count = 0;
var beYellow = new Array(); //到時候會存放所有 red 事件的轉黃定時器，陣列有 100 個位置
btn.addEventListener("click", gamestart); //規劃點選動作


//gamestart 遊戲開始
function gamestart() { //遊戲開始
    sec = 60, count = 0, flag = 1;
    time.textContent = `剩餘時間：${sec}`;
    combo.textContent = `成績分數：${count}`;
    btn.removeEventListener("click", gamestart); //關閉 btn，不要再讓人去按他觸發多餘的 gamestart()

    let start = setInterval(() => { //控制倒數以及遊戲區間的隔離（按鈕）
        if (sec == 0) {
            clearInterval(start);
            flag = 0;
            alert(`遊戲結束，你成功餵貝斯 ${count} 次棒棒糖`)
            btn.addEventListener("click", gamestart);//開啟 btn
        }
        else {
            sec--;
            time.textContent = `剩餘時間：${sec}`;
        }
    }, 1000);  //每1000毫秒(1秒)執行一次

    for (let i = 0; i < 100; i++) {//產生 100 組紅色事件 
        let ontime = Math.floor(Math.random() * 57000); //隨機 0~56999 ms
        let which = Math.floor(Math.random() * 9);  //隨機 0~8 處
        let delay = Math.floor(Math.random() * 2999) + 1000; //隨機 1~3 秒

        setTimeout(function () {
            showit(which, delay, i);
        }, ontime);
    }
}


//觸發紅燈事件
function showit(siWhich, siDelay, siId) { //在指定的 siWhitch 位置變成 red 事件
    if (animal[siWhich].title != "white") { //你不是等待 (white) 狀態，就不要塞紅色

        let next = Math.floor(Math.random() * 9);  //隨機 0~8 處
        console.log(next)
        setTimeout(function () {
            showit(next, siDelay, siId);
        }, 100);  //延遲0.1秒後
    }
    else { //確定該位置是白色，可以進行黃色事件
        animal[siWhich].src = "yellow.png";
        animal[siWhich].style.background = "yellow";
        animal[siWhich].title = "yellow";
        animal[siWhich].alt = siId;

        beYellow[siId] = setTimeout(() => { //警告一段時間後就會生氣
            animal[siWhich].src = "red.png";
            animal[siWhich].style.background = "red";
            animal[siWhich].title = "red";
            animal[siWhich].alt = null;
            myTimeout(siWhich);
        }, siDelay);
    }
}

//鍵盤事件
document.onkeydown = keyboard;//每次的鍵盤動作都會送到 keyboard 函式
function keyboard() {
    if (flag) {
        switch (event.keyCode) {
            case 103: getcount(0); break;
            case 104: getcount(1); break;
            case 105: getcount(2); break;
            case 100: getcount(3); break;
            case 101: getcount(4); break;
            case 102: getcount(5); break;
            case 97: getcount(6); break;
            case 98: getcount(7); break;
            case 99: getcount(8); break;
        }
    }
}


//計分事件
function getcount(who) { // 計分且將黃色變綠色  who=0~8
    if (animal[who].title == "yellow") { //確定是遊戲中的紅色事件
        animal[who].src = "green.png";
        animal[who].style.background = "green";
        animal[who].title = "green";

        /*加分*/
        count++;
        combo.textContent = `成績分數：${count}`;

        id = animal[who].alt; //id 1~100
        clearTimeout(beYellow[id]); //清除原先路線的轉黃定時器
        animal[who].alt = null;

        setTimeout(() => { //green 0.5 秒之後自己變回 yellow
            animal[who].src = "white.png";
            animal[who].style.background = null;
            animal[who].title = "white";
        }, 500);
    }
}

function myTimeout(who){
    setTimeout(() => { //green 1 秒之後自己變回 yellow
            animal[who].src = "white.png";
            animal[who].style.background = null;
            animal[who].title = "white";
        }, 1000);
    
}