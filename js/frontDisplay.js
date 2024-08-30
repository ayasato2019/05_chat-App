
export default function recording(newPostRef, recordItem) {
    const recordListALL = document.getElementById('all-area');
    const recordListMinus = document.getElementById('minus-area');
    const recordListPlus = document.getElementById('plus-area');    
    const clearButtonHtml = '<button class="clear-button"><img src="../images/icon-clear.svg" width="16" height="16" alt="削除ボタン"></button>';

    // 元データが改変されないようにコピー
    const date = recordItem.data; 
    const title = recordItem.title;
    const price = recordItem.price;
    const type = recordItem.type;  

    // liを作る
    const newItem = document.createElement('li');
    const newItemType = document.createElement('li');

    // 共通のclassを付与
    newItem.classList.add('record-item');
    newItemType.classList.add('record-item');

    // IDを付与
    const newPostRefCopy = newPostRef;
    newItem.dataset.id = newPostRef;
    newItem.classList.add(`record-${newPostRef}`);
    newItemType.dataset.id =  newPostRefCopy;
    newItemType.classList.add(`record-${ newPostRefCopy}`);

    // タイプを判断
    const jpType = type === "plus" ? "収入" : "支出";

    // 文字列を付与
    newItem.innerHTML = `${date}  ${title}  ${price}円 ${clearButtonHtml}`;
    newItemType.innerHTML = `${jpType} : ${date}  ${title}  ${price}円 ${clearButtonHtml}`;

    if (type === "plus") {
        recordListPlus.appendChild(newItem);
        recordListALL.appendChild(newItemType);
    } else {
        recordListMinus.appendChild(newItem);
        recordListALL.appendChild(newItemType);
    }
}


