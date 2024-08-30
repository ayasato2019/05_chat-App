import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getDatabase, ref, push, set, remove, onChildAdded, onChildRemoved, updadte }  from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";
import recording from "./recording.js";
// Firebaseの初期化
const firebaseConfig = {
    apiKey: "AIzaSyCgbypcDaNpYPBd8gg44QwDzrMyvBbz8gw",
    authDomain: "household-log.firebaseapp.com",
    projectId: "household-log",
    storageBucket: "household-log.appspot.com",
    messagingSenderId: "445619022902",
    appId: "1:445619022902:web:b994fce2eb3bb3e9e6bc97"
};
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const dbRef = ref(db, "household-log");

// HTML要素
const recordButton = document.getElementById('record');
const recordDate = document.getElementById('record-date');
const recordTitle = document.getElementById('record-title');
const recordPrice = document.getElementById('record-price');
const recordType = document.getElementById('record-type');

// Chart の初期化
let labels = ["サンプルA", "サンプルB", "サンプルC"];  // 初期状態のラベル
let dataList = ["47", "25", "10"];  // 初期状態のデータ
let isFirstClick = true;

// チャートの描画
var ctx = document.getElementById("pieChart").getContext("2d");
var myPieChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: labels,  // 初期状態の labels
        datasets: [{
            backgroundColor: [
                "#6b5991",
                "#A6639F",
                "#EEC1E9",
                "#8B6E88",
                "#D2A1CD",
                "#c270af",
                "#AD84A9",
                "#bbb2c9"
            ],
            data: dataList,  // 初期状態のデータ
        }]
    },
});

// `recordButton` のクリックイベントリスナー
recordButton.addEventListener('click', () => {
    var recordItem = {
        data: recordDate.value,
        name: document.querySelector("#user-name").value,
        title: recordTitle.value,
        price: recordPrice.value,
        type: recordType.value
    };

    // 必要なデータが入力されているか確認
    if (!recordItem.data || !recordItem.name || !recordItem.title || !recordItem.price || !recordItem.type) {
        alert("入力していない項目があります。");
        return;
    }

    const newPostRef = push(dbRef);  // Firebaseに新しいレコードを追加
    set(newPostRef, recordItem);     // データをFirebaseにセット

    // フロントに新しいレコードを表示
    recording(dbRef);

    // 入力ボックスを空に戻す
    recordDate.value = '';
    recordTitle.value = '';
    recordPrice.value = '';
    recordType.value = '';
});

// recording.js
// recording.js で Firebase の onChildAdded イベントリスナーを設定し、データが追加されたときにリストを更新
