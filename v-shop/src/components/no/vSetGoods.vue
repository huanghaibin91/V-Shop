<template>
    <Modal title="更改商品信息" v-model="modal" class-name="set-goods" width="400"> 
        <Form :model="formTop" :label-width="80"> 
            <FormItem label="商品名称"> 
                <Input v-model="formTop.input1"></Input> 
            </FormItem> 
            <FormItem label="商品单价"> 
                <Input v-model="formTop.input2"></Input> 
            </FormItem> 
            <FormItem label="商品库存"> 
                <Input v-model="formTop.input3"></Input> 
            </FormItem> 
            <FormItem label="商品分类"> 
                <Select v-model="formTop.input4" placeholder="请选择商品分类"> 
                    <Option value="休闲零食">休闲零食</Option> 
                    <Option value="酒水饮料">酒水饮料</Option> 
                    <Option value="粮油副食">粮油副食</Option>
                    <Option value="生鲜水果">生鲜水果</Option>
                    <Option value="日常洗护">日常洗护</Option>
                    <Option value="厨卫用品">厨卫用品</Option>
                </Select> 
            </FormItem> 
            <FormItem label="商品保质期" prop="date"> 
                <DatePicker type="date" placeholder="选择日期" v-model="formTop.input5"></DatePicker> 
            </FormItem> 
        </Form>
    </Modal>
</template>

<script>
export default {
    data () {
        return {
            modal: false,
            formTop: {
                input1: '',
                input2: '',
                input3: '',
                input5: '',
                input: ''
            }
        }
    }
}
</script>

<style>
    .set-goods .ivu-modal {
        position: absolute;
        top: 50px;
        left: 50%;
        transform: translateX(-50%);
    }
</style>
