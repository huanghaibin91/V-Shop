<template>
    <div class="cash-register">
        <div class="search-box">
            <Select v-model="model1" :clearable="true" placeholder="请选择收银员" style="width:200px"> 
                <Option v-for="person in personList" :value="person.name" :key="person.name">
                    {{ person.name }}
                </Option> 
            </Select>
            <DatePicker type="daterange" :options="datarange" placement="bottom-end" placeholder="选择日期" style="width: 200px"></DatePicker> 
            <Button type="primary" icon="search">搜索</Button>
        </div>
        <div class="checkout-list">
            
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            personList: [
                {
                    name: '小张'
                },
                {
                    name: '小赵'
                },
                {
                    name: '小李'
                }
            ],
            datarange: {
                shortcuts: [
                    {
                        text: '最近一周',
                        value () {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            return [start, end];
                        }
                    },
                    {
                        text: '最近一个月',
                        value () {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            return [start, end];
                        }
                    },
                    {
                        text: '最近三个月',
                        value () {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            return [start, end];
                        }
                    }
                ]
            }
        }
    }
}
</script>

<style scoped>
    .search-box {
        padding: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .search-box>div {
        margin-right: 2em;
    }
</style>
