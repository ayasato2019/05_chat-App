import { onValue } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";

export default function loadList(dbRef, recordListALL, recordListMinus, recordListPlus, clearButtonHtml) {
    onValue(dbRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
            // データを日付でソートするためにエントリを配列に変換
            const entries = Object.entries(data);

            // 日付でソート
            entries.sort((a, b) => {
                const dateA = new Date(a[1].data);
                const dateB = new Date(b[1].data);
                return dateA - dateB; // 古い順
            });

            // 既存のデータをクリア
            recordListALL.innerHTML = '';
            recordListPlus.innerHTML = '';
            recordListMinus.innerHTML = '';

            // ソートされたデータをループして表示
            for (const [key, recordItem] of entries) {
                const name = recordItem.name; 
                const date = recordItem.data; 
                const title = recordItem.title;
                const price = recordItem.price;
                const type = recordItem.type;
                const memo = recordItem.memo;

                const newItem = document.createElement('li');
                const newItemType = document.createElement('li');

                newItem.classList.add('record-item');
                newItemType.classList.add('record-item');

                newItem.dataset.id = key;
                newItem.classList.add(`id-${key}`);
                newItemType.dataset.id = key;
                newItemType.classList.add(`id-${key}`);

                const jpType = type === "plus" ? "収入" : "支出";

                newItem.innerHTML = `${clearButtonHtml}<span class="item-user">${name}</span><span contenteditable="true" class="id-${key}-update">${date}</span><span contenteditable="true" class="item-title id-${key}-update">${title}</span><span contenteditable="true" class="item-price id-${key}-update">${price}円</span><span class="tooltip">${memo}</span>`;
                newItemType.innerHTML = `${clearButtonHtml} <span class="type type-${type}">${jpType}</span><span class="item-user">${name}</span><span contenteditable="true" class="id-${key}-update">${date}</span><span contenteditable="true" class="item-title id-${key}-update">${title}</span><span contenteditable="true" class="item-price id-${key}-update">${price}円</span><span class="tooltip">${memo}</span>`;

                if (type === "plus") {
                    recordListPlus.appendChild(newItem);
                    recordListALL.appendChild(newItemType);
                } else {
                    recordListMinus.appendChild(newItem);
                    recordListALL.appendChild(newItemType);
                }
            }
        }
    });
}
