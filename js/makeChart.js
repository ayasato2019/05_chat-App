"use strict";

export default function makeChart(recordButton, newPostRef, recordItem) {
    // Chart の初期化
let chartLabels = ["サンプルA", "サンプルB", "サンプルC", "サンプルD", "サンプルF"];
let chartDataList = [47, 25, 10, 65, 52, 89]; // 数値の配列に修正

var ctx = document.getElementById("myChart").getContext("2d");
var myLineChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: chartLabels,
        datasets: [
            {
                label: "お金の増減表",
                data: chartDataList,
                tension: 0,
                fill: true,
                borderWidth: 2,
                borderColor: 'rgba(61, 51, 65, 1)',
                backgroundColor: 'rgba(188, 178, 201, 0.2)'
            }
        ]
    },
    options: {
        scales: {
            x: {beginAtZero: true},
            y: {beginAtZero: true}
        }
    }
});

    const date = recordItem.data; // 日付やタイトル
    const price = parseFloat(recordItem.price); // 数値に変換

    console.log("date: " + date);
    console.log("price: " + price);

    // 初回クリック時にサンプルデータを削除
    if (isFirstClick) {
        chartLabels = [];
        chartDataList = [];
        isFirstClick = false;
    }

    // labels に title を追加し、dataList に price を追加
    chartLabels.push(title);
    dataList.push(price);

    // チャートを更新
    myLineChart.data.chartLabels = chartLabels; // 更新された labels
    myLineChart.data.chartDataList[0].data = chartDataList; // 更新されたデータ
    myLineChart.update(); // チャートを再描画
}
