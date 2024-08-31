import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getDatabase, ref, push, set, remove, onChildAdded, onValue } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";
import loadList from "./load.js";
import firebaseConfig from "./firebaseconfig.js";  // デフォルトエクスポートとしてインポート

// Firebaseの初期化
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

//firebaseの登録場所を指定
const dbRef = ref(db, "household-log");

// HTML要素
const recordButton = document.getElementById('record');
const recordUser = document.getElementById('user-name');
const recordDate = document.getElementById('record-date');
const recordTitle = document.getElementById('record-title');
const recordPrice = document.getElementById('record-price');
const recordType = document.getElementById('record-type');
const recordMemo = document.getElementById('record-memo');
const recordListALL = document.getElementById('all-area');
const recordListMinus = document.getElementById('minus-area');
const recordListPlus = document.getElementById('plus-area');
const clearButtonHtml = '<button class="clear-button"><img src="../images/icon-clear.svg" width="16" height="16" alt="削除ボタン"></button>';

window.addEventListener('load', () => {
    loadList(dbRef, recordListALL, recordListMinus, recordListPlus, clearButtonHtml);
});

// optionのテキストをvalueに設定する
document.addEventListener('DOMContentLoaded', () => {
    const selectElement = document.getElementById('user-name');
    Array.from(selectElement.options).forEach(option => {
        option.value = option.text;
    });
});

// `recordButton` のクリックイベントリスナー
recordButton.addEventListener('click', () => {
    var recordItem = {
        data: recordDate.value,
        name: recordUser.value,
        title: recordTitle.value,
        price: recordPrice.value,
        type: recordType.value,
        memo: recordMemo.value,
    };

    if (!recordItem.data || !recordItem.name || !recordItem.title || !recordItem.price || !recordItem.type) {
        alert("入力していない項目があります。");
        return;
    }

    // firebaseへ追加
    const newPostRef = push(dbRef);
    set(newPostRef, recordItem);

    // 既存のアイテムをクリア
    recordListALL.innerHTML = '';
    recordListPlus.innerHTML = '';
    recordListMinus.innerHTML = '';

    // データベースをフロントに表示
    loadList(dbRef, recordListALL, recordListMinus, recordListPlus, clearButtonHtml);

    recordDate.value = '';
    recordTitle.value = '';
    recordPrice.value = '';
    recordType.value = '';
    recordMemo.value = '';
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
