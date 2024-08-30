import { onChildAdded } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";

export default function recording(dbRef, recordListALL, recordListMinus, recordListPlus) {  
    const clearButtonHtml = '<button class="clear-button"><img src="../images/icon-clear.svg" width="16" height="16" alt="削除ボタン"></button>';

    onChildAdded(dbRef, (snapshot) => {
        const recordItem = snapshot.val();
        const recordKey = snapshot.key;

        const date = recordItem.data; 
        const title = recordItem.title;
        const price = recordItem.price;
        const type = recordItem.type;  

        const newItem = document.createElement('li');
        const newItemType = document.createElement('li');

        newItem.classList.add('record-item');
        newItemType.classList.add('record-item');

        newItem.dataset.id = recordKey;
        newItem.classList.add(`id-${recordKey}`);
        newItemType.dataset.id = recordKey;
        newItemType.classList.add(`id-${recordKey}`);

        const jpType = type === "plus" ? "収入" : "支出";

        newItem.innerHTML = `${clearButtonHtml}<span contenteditable="true" class="id-${recordKey}-update">${date}</span><span contenteditable="true" class="item-title id-${recordKey}-update">${title}</span><span contenteditable="true" class="item-price id-${recordKey}-update">${price}円</span>`;
        newItemType.innerHTML = `${clearButtonHtml} ${jpType} : <span contenteditable="true" class="id-${recordKey}-update">${date}</span><span contenteditable="true" class="item-title id-${recordKey}-update">${title}</span><span contenteditable="true" class="item-price id-${recordKey}-update">${price}円</span>`;

        if (type === "plus") {
            recordListPlus.appendChild(newItem);
            recordListALL.appendChild(newItemType);
        } else {
            recordListMinus.appendChild(newItem);
            recordListALL.appendChild(newItemType);
        }
    });
}
