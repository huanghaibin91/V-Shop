<template>
    <Row>
        <Col :sm="{ span: 16, offset: 4 }" :md="{ span: 12, offset: 6 }" :lg="{ span: 12, offset: 6 }">
            <Tabs> 
                <TabPane label="新商品入库">
                    <Form ref="newGoods" :model="newGoods" :rules="checkNewGoods" :label-width="100"> 
                        <FormItem label="商品编码" prop="coding"> 
                            <Input v-model="newGoods.coding" placeholder="请输入商品编码"></Input> 
                        </FormItem> 
                        <FormItem label="商品名称" prop="name"> 
                            <Input v-model="newGoods.name" placeholder="请输入商品名称"></Input> 
                        </FormItem> 
                        <FormItem label="商品单价" prop="price"> 
                            <Input v-model.number="newGoods.price" placeholder="请输入商品单价"></Input> 
                        </FormItem>
                        <FormItem label="商品数量" prop="number"> 
                            <Input v-model.number="newGoods.number" placeholder="请输入商品数量"></Input> 
                        </FormItem>
                        <FormItem label="商品分类" prop="category"> 
                            <Select v-model="newGoods.category" placeholder="请选择商品分类"> 
                                <Option value="休闲零食">休闲零食</Option> 
                                <Option value="酒水饮料">酒水饮料</Option> 
                                <Option value="粮油副食">粮油副食</Option>
                                <Option value="生鲜水果">生鲜水果</Option>
                                <Option value="日常洗护">日常洗护</Option>
                                <Option value="厨卫用品">厨卫用品</Option>
                                <Option value="其它品类">其它品类</Option>
                            </Select> 
                        </FormItem> 
                        <FormItem label="选择保质期" prop="date"> 
                            <DatePicker type="date" placeholder="选择日期" v-model="newGoods.date"></DatePicker> 
                        </FormItem> 
                        <FormItem label="商品图片" prop="img"> 
                            <Button @click="clickSelectImg" type="ghost" icon="ios-cloud-upload-outline">选择商品图片</Button>
                            <input @change="selectImg($event)" class="file-btn" type="file" style="visibility: hidden;">
                            <div class="img-place">
                                <!-- 商品图片位置 -->
                            </div>
                        </FormItem> 
                        <FormItem> 
                            <Button type="primary" @click="submitNewGoods">提交</Button> 
                            <Button type="ghost" @click="resetNewGoods" style="margin-left: 10px">重置</Button> 
                        </FormItem> 
                    </Form>
                </TabPane> 
                <TabPane label="快捷入库">
                    <Form ref="oldGoods" :model="oldGoods" :rules="checkOldGoods" :label-width="100"> 
                        <FormItem label="商品编码" prop="coding"> 
                            <Input v-model="oldGoods.coding" placeholder="请输入商品编码"></Input> 
                        </FormItem>  
                        <FormItem label="商品数量" prop="number"> 
                            <Input v-model.number="oldGoods.number" placeholder="请输入商品数量"></Input> 
                        </FormItem> 
                        <FormItem label="选择保质期" prop="date"> 
                            <DatePicker type="date" placeholder="选择日期" v-model="oldGoods.date"></DatePicker> 
                        </FormItem> 
                        <FormItem> 
                            <Button type="primary" @click="submitOldGoods">提交</Button> 
                            <Button type="ghost" @click="resetOldGoods" style="margin-left: 10px">重置</Button> 
                        </FormItem> 
                    </Form>
                </TabPane> 
            </Tabs>
        </Col>
    </Row>
</template>

<script>

import IndexedDB from '../indexedDB/IndexedDB'

export default {
    data () { 
        // 验证商品信息规则
        // 检查新商品编码
        const checkNewCoding = (rule, value, callback) => {
            const reg = /^[0-9]\d*$/g;
            if (value === '') {
                callback(new Error('请输入商品编码'));
            } else {
                if (reg.test(value)) {
                    const goods = this.$store.state.goods.goodsList;
                    for (let i = 0, len = goods.length; i < len; i++) {
                        if (goods[i].coding === value) {
                            callback(new Error('商品编码已存在，请使用便捷入库添加已有商品'));
                        }
                    }
                    callback();
                } else {
                    callback(new Error('商品编码为数字'));
                }
            }
        }
        // 检查旧商品编码
        const checkOldCoding = (rule, value, callback) => {
            const reg = /^[0-9]\d*$/g;
            if (value === '') {
                callback(new Error('请输入商品编码'));
            } else {
                if (reg.test(value)) {
                    const goods = this.$store.state.goods.goodsList;
                    for (let i = 0, len = goods.length; i < len; i++) {
                        if (goods[i].coding === value) {
                            callback();
                        }
                    }
                    callback(new Error('商品编码不存在，请使用新商品入库添加新商品'));
                } else {
                    console.log(this);
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
            newGoods: { 
                coding: '', 
                name: '', 
                price: '', 
                number: '', 
                category: '', 
                date: '', 
                image: '',
                sales: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            }, 
            checkNewGoods: { 
                coding: { required: true, validator: checkNewCoding, trigger: 'blur' },
                name: { required: true, message: '商品名称不能为空', trigger: 'blur' },
                price: { required: true, validator: checkPrice, trigger: 'blur' },
                number: { required: true, validator: checkNumber, trigger: 'blur' }, 
                category: { required: true, message: '请选择一个商品分类', trigger: 'change' }, 
                date: { required: true, type: 'date', message: '请选择日期', trigger: 'change' } 
            },
            checkOldGoods: {
                coding: { required: true, validator: checkOldCoding, trigger: 'blur' },
                number: { required: true, validator: checkNumber, trigger: 'blur' }, 
                date: { required: true, type: 'date', message: '请选择日期', trigger: 'change' } 
            },
            oldGoods: {
                coding: '',
                number: '',
                date: ''
            }
        } 
    }, 
    methods: { 
        // 选择商品图片
        clickSelectImg () {
            document.querySelector('.file-btn').click();
        },
        selectImg (event) {
            let _this = this,
                info = '',
                imgPlace = document.querySelector('.img-place'),
                files = event.target.files,
                type = 'default',
                reader = new FileReader();
            if (/image/.test(files[0].type)){
                reader.readAsDataURL(files[0]);
                type = "image";
            } else {
                reader.readAsText(files[0]);
                type = "text";
            }
            reader.onerror = function(){
                imgPlace.innerHTML = "不能读取文件，错误代码 " + reader.error.code;
            };
            reader.onload = function(){
                let html = "";
                switch(type) {
                    case "image":
                        html = "<img style='width: 100%; height: 100%;' src=\"" + reader.result + "\">";
                        _this.newGoods.image = reader.result;
                        break;
                    case "text":
                        html = reader.result;
                        break;
                    default:
                        break;
                }
                imgPlace.innerHTML = html;
            };
        },
        // 提交新商品入库
        submitNewGoods () { 
            this.$refs['newGoods'].validate((valid) => { 
                if (valid) { 
                    if (this.$store.state.currUser.coding) {
                        this.$store.commit('addNewGoods', this.newGoods);
                        this.$Message.success('新商品入库成功');
                        this.newGoods = {
                            coding: '', 
                            name: '', 
                            price: '', 
                            number: '', 
                            category: '休闲零食', 
                            date: new Date(), 
                            image: '',
                            sales: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                        };
                        document.querySelector('.img-place').innerHTML = '';
                        let _this = this;
                        let vshopDB = null;
                        IndexedDB.openDB('vshopDB', 1, vshopDB, {
                            name: 'vshop',
                            key: 'name'
                        }, function (db) {
                            let vshopDB = db;
                            IndexedDB.putData(vshopDB, 'vshop', [_this.$store.state.goods]);
                        });
                    } else {
                        this.$Message.error('用户未登录无法进行此项操作，请登录后再试');
                    }
                } else { 
                    this.$Message.error('表单验证失败!'); 
                } 
            });
        }, 
        // 重置
        resetNewGoods () { 
            this.$refs['newGoods'].resetFields(); 
        },
        // 提交快捷入库
        submitOldGoods () { 
            this.$refs['oldGoods'].validate((valid) => { 
                if (valid) { 
                    if (this.$store.state.currUser.coding) {
                        this.$store.commit('addOldGoods', this.oldGoods);
                        this.$Message.success('快捷入库成功');
                        this.oldGoods = {
                            coding: '',
                            number: '',
                            date: new Date()
                        }
                        let _this = this;
                        let vshopDB = null;
                        IndexedDB.openDB('vshopDB', 1, vshopDB, {
                            name: 'vshop',
                            key: 'name'
                        }, function (db) {
                            let vshopDB = db;
                            IndexedDB.putData(vshopDB, 'vshop', [_this.$store.state.goods]);
                        });
                    } else {
                        this.$Message.error('用户未登录无法进行此项操作，请登录后再试');
                    }
                } else { 
                    this.$Message.error('表单验证失败!'); 
                } 
            }) 
        }, 
        // 重置
        resetOldGoods () { 
            this.$refs['oldGoods'].resetFields(); 
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
        overflow: hidden;
    }
</style>
