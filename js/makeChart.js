"use strict";

export default function makeChart(recordButton, newPostRef, recordItem) {
    const title = recordItem.text;
    const price = recordItem.price;
    const type = recordItem.type;  

    console.log("title: " + title);
    console.log("price: " + price);
    console.log("type: " + type);

    if (type === "minus") {
        if (isFirstClick) {
            // 初回クリック時にサンプルデータを削除
            labels = [];
            dataList = [];
            isFirstClick = false; // フラグを更新して初回クリック処理をスキップ
        }
        // labels に title を追加し、dataList に price を追加
        labels.push(title);
        dataList.push(price);

        // チャートを更新
        myPieChart.data.labels = labels; // 更新された labels
        myPieChart.data.datasets[0].data = dataList; // 更新されたデータ
        myPieChart.update(); // チャートを再描画
    };
}
