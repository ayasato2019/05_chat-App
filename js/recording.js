// recording.js
import { onChildAdded } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";

export default function recording(dbRef) {
    const recordListALL = document.getElementById('all-area');
    const recordListMinus = document.getElementById('minus-area');
    const recordListPlus = document.getElementById('plus-area');    
    const clearButtonHtml = '<button class="clear-button"><img src="../images/icon-clear.svg" width="16" height="16" alt="削除ボタン"></button>';

    onChildAdded(dbRef, (snapshot) => {
        const recordItem = snapshot.val();  // Firebaseからのデータを取得
        const recordKey = snapshot.key;     // Firebaseのキーを取得

        // 元データが改変されないようにコピー
        const date = recordItem.data; 
        const title = recordItem.title;
        const price = recordItem.price;
        const type = recordItem.type;  

        // li要素を作成
        const newItem = document.createElement('li');
        const newItemType = document.createElement('li');

        // 共通のclassを付与
        newItem.classList.add('record-item');
        newItemType.classList.add('record-item');

        // IDを付与
        newItem.dataset.id = recordKey;
        newItem.classList.add(`record-${recordKey}`);
        newItemType.dataset.id = recordKey;
        newItemType.classList.add(`record-${recordKey}`);

        // タイプを判断
        const jpType = type === "plus" ? "収入" : "支出";

        // 文字列を付与
        newItem.innerHTML = `${clearButtonHtml} ${date}  ${title}  ${price}円 `;
        newItemType.innerHTML = `${clearButtonHtml} ${jpType} : ${date}  ${title}  ${price}円`;

        // リストに追加
        if (type === "plus") {
            recordListPlus.appendChild(newItem);
            recordListALL.appendChild(newItemType);
        } else {
            recordListMinus.appendChild(newItem);
            recordListALL.appendChild(newItemType);
        }
    });
}
