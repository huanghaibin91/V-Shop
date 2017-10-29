<template>
    <Row>
        <Col :sm="{ span: 16, offset: 4 }" :md="{ span: 12, offset: 6 }" :lg="{ span: 12, offset: 6 }">
            <Tabs> 
                <TabPane label="新商品入库">
                    <Form ref="goods" :model="goods" :rules="checkGoods" :label-width="100"> 
                        <FormItem label="商品编码" prop="coding"> 
                            <Input v-model="goods.coding" placeholder="请输入商品编码"></Input> 
                        </FormItem> 
                        <FormItem label="商品名称" prop="name"> 
                            <Input v-model="goods.name" placeholder="请输入商品名称"></Input> 
                        </FormItem> 
                        <FormItem label="商品单价" prop="price"> 
                            <Input v-model="goods.price" placeholder="请输入商品单价"></Input> 
                        </FormItem>
                        <FormItem label="商品数量" prop="number"> 
                            <Input v-model="goods.number" placeholder="请输入商品数量"></Input> 
                        </FormItem>
                        <FormItem label="商品分类" prop="category"> 
                            <Select v-model="goods.category" placeholder="请选择商品分类"> 
                                <Option value="休闲零食">休闲零食</Option> 
                                <Option value="酒水饮料">酒水饮料</Option> 
                                <Option value="粮油副食">粮油副食</Option>
                                <Option value="生鲜水果">生鲜水果</Option>
                                <Option value="日常洗护">日常洗护</Option>
                                <Option value="厨卫用品">厨卫用品</Option>
                            </Select> 
                        </FormItem> 
                        <FormItem label="选择保质期" prop="date"> 
                            <DatePicker type="date" placeholder="选择日期" v-model="goods.date"></DatePicker> 
                        </FormItem> 
                        <FormItem label="商品图片" prop="img"> 
                            <Button @click="selectImg" type="ghost" icon="ios-cloud-upload-outline">选择商品图片</Button>
                            <input class="file-btn" type="file" style="visibility: hidden;">
                            <div class="img-place">
                                <img src="../assets/00000000.jpg" alt="">
                            </div>
                        </FormItem> 
                        <FormItem> 
                            <Button type="primary" @click="handleSubmit('goods')">提交</Button> 
                            <Button type="ghost" @click="handleReset('goods')" style="margin-left: 10px">重置</Button> 
                        </FormItem> 
                    </Form>
                </TabPane> 
                <TabPane label="快捷入库">
                    <!-- <Form ref="formValidate" :model="goodsValidate2" :rules="ruleValidate2" :label-width="100"> 
                        <FormItem label="商品编码" prop="coding"> 
                            <Input v-model="goodsValidate2.coding" placeholder="请输入商品编码"></Input> 
                        </FormItem>  
                        <FormItem label="商品数量" prop="number"> 
                            <Input v-model="goodsValidate2.number" placeholder="请输入商品数量"></Input> 
                        </FormItem> 
                        <FormItem label="选择保质期" prop="date"> 
                            <DatePicker type="date" placeholder="选择日期" v-model="goodsValidate2.date"></DatePicker> 
                        </FormItem> 
                        <FormItem> 
                            <Button type="primary" @click="handleSubmit('formValidate')">提交</Button> 
                            <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 10px">重置</Button> 
                        </FormItem> 
                    </Form> -->
                </TabPane> 
            </Tabs>
        </Col>
    </Row>
</template>

<script>
export default {
    data () { 
        // 验证商品信息规则
        // 检查编码
        const checkCoding = (rule, value, callback) => {
            const reg = /^[0-9]\d*$/g;
            if (value === '') {
                callback(new Error('请输入商品编码'));
            } else {
                if (reg.test(value)) {
                    callback();
                } else {
                    callback(new Error('商品编码为数字'));
                }
            }
        }
        // 检查价格
        const checkPrice = (rule, value, callback) => {
            const reg = /^(\d+\.\d{1,1}|\d+)$/g;
            if (value === '') {
                callback(new Error('请输入商品价格'));
            } else if (reg.test(value)) {
                callback();
            } else {
                callback(new Error('商品单价应为最多一位小数的数字'));
            }
        }
        // 检查数量
        const checkNumber = (rule, value, callback) => {
            const reg = /^[1-9]\d*$/g;
            if (value === '') {
                callback(new Error('请输入商品数量'));
            } else {
                if (reg.test(value)) {
                    callback();
                } else {
                    callback(new Error('商品数量为整数数字'));
                }
            }
        }

        return { 
            goods: { 
                coding: '', 
                name: '', 
                price: '', 
                number: '', 
                category: '', 
                date: '', 
                image: '' 
            }, 
            checkGoods: { 
                coding: { required: true, validator: checkCoding, trigger: 'blur' },
                name: { required: true, message: '商品名称不能为空', trigger: 'blur' },
                price: { required: true, validator: checkPrice, trigger: 'blur' },
                number: { required: true, validator: checkNumber, trigger: 'blur' }, 
                category: { required: true, message: '请选择一个商品分类', trigger: 'change' }, 
                date: { required: true, type: 'date', message: '请选择日期', trigger: 'change' } 
            } 
        } 
    }, 
    methods: { 
        selectImg () {
            document.querySelector('.file-btn').click();
        },
        
        handleSubmit (name) { 
            this.$refs[name].validate((valid) => { 
                if (valid) { 
                    this.$Message.success('提交成功!'); 
                } else { 
                    this.$Message.error('表单验证失败!'); 
                } 
            }) 
        }, 
        handleReset (name) { 
            this.$refs[name].resetFields(); 
        } 
    }
}
</script>

<style scoped>
    .img-place {
        width: 300px;
        height: 300px;
        margin-top: 10px;
        border: 1px dashed #dddee1;
    }
    .img-place img {
        width: 100%;
        height: 100%;
    }
</style>
