import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getDatabase, ref, push, set, remove, onChildAdded } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";
import recording from "./recording.js";
import makeChart from "./makeChart.js";

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

//firebaseの登録場所を指定
const dbRef = ref(db, "household-log");

// HTML要素
const recordButton = document.getElementById('record');
const recordDate = document.getElementById('record-date');
const recordTitle = document.getElementById('record-title');
const recordPrice = document.getElementById('record-price');
const recordType = document.getElementById('record-type');
const recordListALL = document.getElementById('all-area');
const recordListMinus = document.getElementById('minus-area');
const recordListPlus = document.getElementById('plus-area');

makeChart();

// `recordButton` のクリックイベントリスナー
recordButton.addEventListener('click', () => {
    var recordItem = {
        data: recordDate.value,
        name: document.querySelector("#user-name").value,
        title: recordTitle.value,
        price: recordPrice.value,
        type: recordType.value
    };

    if (!recordItem.data || !recordItem.name || !recordItem.title || !recordItem.price || !recordItem.type) {
        alert("入力していない項目があります。");
        return;
    }

    const newPostRef = push(dbRef);
    set(newPostRef, recordItem);

    // フロントに新しいレコードを表示
    recording(dbRef, recordListALL, recordListMinus, recordListPlus);
    makeChart(dbRef);

    recordDate.value = '';
    recordTitle.value = '';
    recordPrice.value = '';
    recordType.value = '';
});

// グローバルなクリックリスナーを追加
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('clear-button') || e.target.closest('.clear-button')) {
        const button = e.target.closest('.clear-button');
        if (button) {
            const itemId = button.closest('li').dataset.id;
            const itemRef = ref(db, `household-log/${itemId}`);

            remove(itemRef)
                .then(() => {
                    console.log('Item removed from Firebase');
                    document.querySelectorAll(`.id-${itemId}`).forEach(item => item.remove());

                    let records = JSON.parse(localStorage.getItem('records')) || {};
                    delete records[itemId];
                    localStorage.setItem('records', JSON.stringify(records));
                })
                .catch(error => {
                    console.error('Error removing item: ', error);
                });
        }
    }
});
