<template>
    <div class="data-statistics">
        <h2>数据统计</h2>
        <div class="month-turnover-box">
            <div class="month-turnover">
                <h1>
                    本月营业额 <br>
                    <span>{{ monthTurnover }}</span>
                </h1>
            </div>
            <div id="sales-category-chart"></div>
        </div>
        <h3>本月销售前二十商品</h3>
        <div id="ranking-twenty-chart"></div>
        <h3>年度销售统计</h3>
        <div id="year-turnover-chart"></div>
    </div>
</template>

<script>

import Highcharts from 'highcharts/highstock'
import HighchartsMore from 'highcharts/highcharts-more'
import HighchartsDrilldown from 'highcharts/modules/drilldown'
import Highcharts3D from 'highcharts/highcharts-3d'
import Highmaps from 'highcharts/modules/map'

HighchartsMore(Highcharts) 
HighchartsDrilldown(Highcharts)
Highcharts3D(Highcharts)
Highmaps(Highcharts)

export default {
    data () {
        return {
            categoryChart: null,
            rankingTwentyChart: null,
            yearTurnoverChart: null,
            cashRegisterList: this.$store.state.cashRegister.cashRegisterList
        }
    },
    mounted () {
        let _this = this;
        this.categoryChart = new Highcharts.Chart(document.getElementById('sales-category-chart'), {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false
            },
            title: {
                text: '本月各类商品销售占比图'
            },
            tooltip: {
                headerFormat: '{series.name}<br>',
                pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: true
                }
            },
            series: [
                {
                    type: 'pie',
                    name: '商品销售占比',
                    data: [
                        ['休闲零食', _this.categoryTurnover[0] / _this.monthTurnover * 100],
                        ['酒水饮料', _this.categoryTurnover[1] / _this.monthTurnover * 100],
                        ['粮油副食', _this.categoryTurnover[2] / _this.monthTurnover * 100],
                        ['生鲜水果', _this.categoryTurnover[3] / _this.monthTurnover * 100],
                        ['日常洗护', _this.categoryTurnover[4] / _this.monthTurnover * 100],
                        ['厨卫用品', _this.categoryTurnover[5] / _this.monthTurnover * 100],
                        ['其它品类', _this.categoryTurnover[6] / _this.monthTurnover * 100]
                    ]
                }
            ]
        });
        this. rankingTwentyChart = new Highcharts.Chart(document.getElementById('ranking-twenty-chart'), {
            chart: {
                type: 'bar'
            },
            title: {
                text: '本月销售前二十商品统计图'
            },
            xAxis: {
                categories: _this.rankingTwentyName,
                title: {
                    text: null
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: '本月销售金额 (元)',
                    align: 'high'
                },
                labels: {
                    overflow: 'justify'
                }
            },
            tooltip: {
                valueSuffix: ' 元'
            },
            plotOptions: {
                bar: {
                    dataLabels: {
                        enabled: true,
                        allowOverlap: true
                    }
                }
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'top',
                x: -40,
                y: 100,
                floating: true,
                borderWidth: 1,
                backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
                shadow: true
            },
            credits: {
                enabled: false
            },
            series: [
                {
                    name: '销售金额',
                    data: _this.rankingTwentyTotal
                }, 
                // {
                //     name: '销售数量',
                //     data: _this.rankingTwentyCount
                // }
            ]
        });
        this.yearTurnoverChart = new Highcharts.Chart(document.getElementById('year-turnover-chart'), {
            chart: {
                type: 'column'
            },
            title: {
                text: '年度销售统计图'
            },
            xAxis: {
                categories: [
                    '一月',
                    '二月',
                    '三月',
                    '四月',
                    '五月',
                    '六月',
                    '七月',
                    '八月',
                    '九月',
                    '十月',
                    '十一月',
                    '十二月'
                ],
                crosshair: true
            },
            yAxis: {
                min: 0,
                title: {
                    text: '月销量 (件)'
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f} 元</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: [
                {
                    name: '本月营业额',
                    data: _this.yearTurnover
                }
            ]
        });
    },
    computed: {
        // 本月营业额
        monthTurnover: function () {
            let nowMonth = new Date().getMonth();
            let all = 0;
            for (let i = 0, len = this.cashRegisterList.length; i < len; i++) {
                if (new Date(this.cashRegisterList[i].time).getMonth() === nowMonth) {
                    all += this.cashRegisterList[i].allTotal;
                }
            }
            return all;
        },
        // 各类商品营业额
        categoryTurnover: function () {
            let arr = [0, 0, 0, 0, 0, 0, 0];
            let nowYear = new Date().getFullYear();
            let nowMonth = new Date().getMonth();
            for (let i = 0, len = this.cashRegisterList.length; i < len; i++) {
                if (new Date(this.cashRegisterList[i].time).getFullYear() === nowYear && new Date(this.cashRegisterList[i].time).getMonth() === nowMonth) {
                    for (let j = 0, len = this.cashRegisterList[i].goodsList.length; j < len; j++) {
                        switch (this.cashRegisterList[i].goodsList[j].category) {
                            case '休闲零食':
                                arr[0] += this.cashRegisterList[i].goodsList[j].total;
                                break;
                            case '酒水饮料':
                                arr[1] += this.cashRegisterList[i].goodsList[j].total;
                                break;
                            case '粮油副食':
                                arr[2] += this.cashRegisterList[i].goodsList[j].total;
                                break;
                            case '生鲜水果':
                                arr[3] += this.cashRegisterList[i].goodsList[j].total;
                                break;
                            case '日常洗护':
                                arr[4] += this.cashRegisterList[i].goodsList[j].total;
                                break;
                            case '厨卫用品':
                                arr[5] += this.cashRegisterList[i].goodsList[j].total;
                                break;
                            case '其它品类':
                                arr[6] += this.cashRegisterList[i].goodsList[j].total;
                                break;
                            default: break;
                        }
                    }
                }
            }
            return arr;
        },

        // 本月销售排名前二十商品
        rankingTwenty () {
            let arr = [];
            let nowYear = new Date().getFullYear();
            let nowMonth = new Date().getMonth();
            for (let i = 0, len = this.cashRegisterList.length; i < len; i++) {
                if (new Date(this.cashRegisterList[i].time).getFullYear() === nowYear && new Date(this.cashRegisterList[i].time).getMonth() === nowMonth) {
                    for (let j = 0, len = this.cashRegisterList[i].goodsList.length; j < len; j++) {
                        let flag = true;
                        for (let z = 0, len = arr.length; z < len;  z++) {
                            if (this.cashRegisterList[i].goodsList[j].coding === arr[z].coding) {
                                arr[z].count += this.cashRegisterList[i].goodsList[j].count;
                                arr[z].total += this.cashRegisterList[i].goodsList[j].total;
                                flag = false;
                                break;
                            }
                        }
                        if (flag) {
                            let obj = new Object();
                            obj.coding = this.cashRegisterList[i].goodsList[j].coding;
                            obj.name = this.cashRegisterList[i].goodsList[j].name;
                            obj.count = this.cashRegisterList[i].goodsList[j].count;
                            obj.total = this.cashRegisterList[i].goodsList[j].total;
                            arr.push(obj);
                        }
                    }
                }
            }
            return arr;
        },
        // 本月销售排名前二十商品名称
        rankingTwentyName () {
            let arr = [];
            let rankingTwenty = this.rankingTwenty;
            rankingTwenty.sort(function (a, b) {
                return b.total - a.total; 
            });
            rankingTwenty.slice(0, 20).forEach(function (element) {
                arr.push(element.name);
            });
            return arr;
        },
        // 本月销售排名前二十商品销售额
        rankingTwentyTotal () {
            let arr = [];
            let rankingTwenty = this.rankingTwenty;
            rankingTwenty.sort(function (a, b) {
                return b.total - a.total; 
            });
            rankingTwenty.slice(0, 20).forEach(function (element) {
                arr.push(element.total);
            });
            return arr;
        },
        // 本月销售排名前二十商品销售数量
        rankingTwentyCount () {
            let arr = [];
            let rankingTwenty = this.rankingTwenty;
            rankingTwenty.sort(function (a, b) {
                return b.total - a.total; 
            });
            rankingTwenty.slice(0, 20).forEach(function (element) {
                arr.push(element.count);
            });
            return arr;
        },
        // 年度每月营业额
        yearTurnover () {
            let arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            let nowYear = new Date().getFullYear();
            for (let i = 0, len = this.cashRegisterList.length; i < len; i++) {
                if (new Date(this.cashRegisterList[i].time).getFullYear() === nowYear) {
                    switch (new Date(this.cashRegisterList[i].time).getMonth()) {
                        case 0:
                            arr[0] += this.cashRegisterList[i].allTotal;
                            break;
                        case 1:
                            arr[1] += this.cashRegisterList[i].allTotal;
                            break;
                        case 2:
                            arr[2] += this.cashRegisterList[i].allTotal;
                            break;
                        case 3:
                            arr[3] += this.cashRegisterList[i].allTotal;
                            break;
                        case 4:
                            arr[4] += this.cashRegisterList[i].allTotal;
                            break;
                        case 5:
                            arr[5] += this.cashRegisterList[i].allTotal;
                            break;
                        case 6:
                            arr[6] += this.cashRegisterList[i].allTotal;
                            break;
                        case 7:
                            arr[7] += this.cashRegisterList[i].allTotal;
                            break;
                        case 8:
                            arr[8] += this.cashRegisterList[i].allTotal;
                            break;
                        case 9:
                            arr[9] += this.cashRegisterList[i].allTotal;
                            break;
                        case 10:
                            arr[10] += this.cashRegisterList[i].allTotal;
                            break;
                        case 11:
                            arr[11] += this.cashRegisterList[i].allTotal;
                            break;
                        default: break;
                    }
                }
            }
            return arr;
        }
    }
}
</script>

<style scoped>
    .data-statistics h1 {
        text-align: center;
    }
    .data-statistics h1 span {
        color: #ff9900;
    }
    .data-statistics h2 {
        padding: 10px;
    }
    .data-statistics h3 {
        padding: 10px;
    }
    .month-turnover-box {
        display: flex;
        height: 400px;
        align-content: center;
        background-color: white;
    }
    .month-turnover {
        width: 30%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    #sales-category-chart {
        width: 70%;
    }
    #ranking-twenty-chart {
        height: 600px;
    }
</style>
