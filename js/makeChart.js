"use strict";

export default function makeChart(recordButton, newPostRef, recordItem) {
    const title = recordItem.data; // 日付やタイトル
    const price = parseFloat(recordItem.price); // 数値に変換

    console.log("title: " + title);
    console.log("price: " + price);

    // 初回クリック時にサンプルデータを削除
    if (isFirstClick) {
        labels = [];
        dataList = [];
        isFirstClick = false;
    }

    // labels に title を追加し、dataList に price を追加
    labels.push(title);
    dataList.push(price);

    // チャートを更新
    myLineChart.data.labels = labels; // 更新された labels
    myLineChart.data.datasets[0].data = dataList; // 更新されたデータ
    myLineChart.update(); // チャートを再描画
}
