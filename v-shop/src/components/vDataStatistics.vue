<template>
    <div class="data-statistics">
        <div>

        </div>
        <div id="sales-category-chart">

        </div>
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
                text: '本月各类商品销售占比'
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
            let nowMonth = new Date().getMonth();
            for (let i = 0, len = this.cashRegisterList.length; i < len; i++) {
                if (new Date(this.cashRegisterList[i].time).getMonth() === nowMonth) {
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
        // 各类商品本月销售占比

        // 本月销售排名前二十商品
        rankingTwenty () {
            let arr = [];
            let nowMonth = new Date().getMonth();
            for (let i = 0, len = this.cashRegisterList.length; i < len; i++) {
                if (new Date(this.cashRegisterList[i].time).getMonth() === nowMonth) {
                    for (let j = 0, len = this.cashRegisterList[i].goodsList.length; j < len; j++) {
                        let flag = true;
                        for (let z = 0, len = arr.length; i < len;  i++) {
                            if (this.cashRegisterList[i].goodsList[j].coding === arr[z].coding) {
                                arr[z].total += this.cashRegisterList[i].goodsList[j].total;
                                flag = false;
                                break;
                            }
                        }
                        if (flag) {
                            let obj = new Object();
                            obj.coding = this.cashRegisterList[i].goodsList[j].coding;
                            obj.name = this.cashRegisterList[i].goodsList[j].coding;
                            obj.total = this.cashRegisterList[i].goodsList[j].total;
                            arr.push(obj);
                        }
                    }
                }
            }
            return arr;
        },
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
        // 年度每月营业额
        yearTurnover () {
            let arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            let nowYear = new Date().getFullYear();
            for (let i = 0, len = this.cashRegisterList.length; i < len; i++) {
                if (new Date(this.cashRegisterList[i].time).getFullYear() === nowYear) {
                    switch (this.cashRegisterList[i].time.getMonth()) {
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

<style>

</style>
