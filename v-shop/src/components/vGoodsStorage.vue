<template>
    <Row>
        <Col :sm="{ span: 16, offset: 4 }" :md="{ span: 12, offset: 6 }" :lg="{ span: 12, offset: 6 }">
            <Tabs :size="small"> 
                <TabPane label="新商品入库">
                    <Form ref="formValidate" :model="goodsValidate" :rules="ruleValidate" :label-width="100"> 
                        <FormItem label="商品编码" prop="coding"> 
                            <Input v-model="goodsValidate.coding" placeholder="请输入商品编码"></Input> 
                        </FormItem> 
                        <FormItem label="商品名称" prop="name"> 
                            <Input v-model="goodsValidate.name" placeholder="请输入商品名称"></Input> 
                        </FormItem> 
                        <FormItem label="商品单价" prop="price"> 
                            <Input v-model="goodsValidate.price" placeholder="请输入商品单价"></Input> 
                        </FormItem>
                        <FormItem label="商品数量" prop="number"> 
                            <Input v-model="goodsValidate.number" placeholder="请输入商品数量"></Input> 
                        </FormItem>
                        <FormItem label="商品分类" prop="category"> 
                            <Select v-model="goodsValidate.category" placeholder="请选择商品分类"> 
                                <Option value="休闲零食">休闲零食</Option> 
                                <Option value="酒水饮料">酒水饮料</Option> 
                                <Option value="粮油副食">粮油副食</Option>
                                <Option value="生鲜水果">生鲜水果</Option>
                                <Option value="日常洗护">日常洗护</Option>
                                <Option value="厨卫用品">厨卫用品</Option>
                            </Select> 
                        </FormItem> 
                        <FormItem label="选择保质期" prop="date"> 
                            <DatePicker type="date" placeholder="选择日期" v-model="goodsValidate.date"></DatePicker> 
                        </FormItem> 
                        <FormItem label="商品图片" prop="desc"> 
                            
                        </FormItem> 
                        <FormItem> 
                            <Button type="primary" @click="handleSubmit('formValidate')">提交</Button> 
                            <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button> 
                        </FormItem> 
                    </Form>
                </TabPane> 
                <TabPane label="快捷入库">
                    <Form ref="formValidate" :model="goodsValidate" :rules="ruleValidate" :label-width="100"> 
                        <FormItem label="商品编码" prop="coding"> 
                            <Input v-model="goodsValidate.coding" placeholder="请输入商品编码"></Input> 
                        </FormItem>  
                        <FormItem label="商品数量" prop="number"> 
                            <Input v-model="goodsValidate.number" placeholder="请输入商品数量"></Input> 
                        </FormItem> 
                        <FormItem label="选择保质期" prop="date"> 
                            <DatePicker type="date" placeholder="选择日期" v-model="goodsValidate.date"></DatePicker> 
                        </FormItem> 
                        <FormItem> 
                            <Button type="primary" @click="handleSubmit('formValidate')">提交</Button> 
                            <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button> 
                        </FormItem> 
                    </Form>
                </TabPane> 
            </Tabs>
        </Col>
    </Row>
</template>

<script>
export default {
    data () { 
        return { 
            goodsValidate: { 
                coding: '', 
                name: '', 
                price: '', 
                number: '', 
                category: '', 
                date: '', 
                image: '' 
            }, 
            ruleValidate: { 
                coding: [ 
                    { required: true, message: '邮箱不能为空', trigger: 'blur' }, 
                    { type: 'email', message: '邮箱格式不正确', trigger: 'blur' } 
                ],
                name: [ 
                    { required: true, message: '商品名称不能为空', trigger: 'blur' } 
                ],  
                price: [ 
                    { required: true, message: '请选择城市', trigger: 'change' } 
                ], 
                number: [ 
                    { required: true, message: '请选择性别', trigger: 'change' } 
                ], 
                category: [ 
                    { required: true, type: 'array', min: 1, message: '至少选择一个爱好', trigger: 'change' }, 
                    { type: 'array', max: 2, message: '最多选择两个爱好', trigger: 'change' } 
                ], 
                date: [ 
                    { required: true, type: 'date', message: '请选择日期', trigger: 'change' } 
                ], 
                time: [ 
                    { required: true, type: 'date', message: '请选择时间', trigger: 'change' } 
                ], 
                desc: [ 
                    { required: true, message: '请输入个人介绍', trigger: 'blur' }, 
                    { type: 'string', min: 20, message: '介绍不能少于20字', trigger: 'blur' } 
                ] 
            } 
        } 
    }, 
    methods: { 
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
    
</style>
