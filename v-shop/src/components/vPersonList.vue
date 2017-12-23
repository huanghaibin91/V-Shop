<template>
    <div class="person-list">
        <div class="add-person">
            <Button @click.native="changeUserFlag" type="primary" icon="person-add">添加新员工</Button>
        </div>
        <div class="person-message">
            <Table :columns="userTable" :data="userList"></Table>
        </div>
        <!-- 添加员工弹窗 -->
        <Modal title="添加员工" v-model="addUserFlag" :styles="{top: '20px'}" width="400"> 
            <Form ref="newUser" :model="newUser" :rules="checkNewUser" :label-width="100"> 
                <FormItem label="员工姓名" prop="name"> 
                    <Input v-model="newUser.name" placeholder="请输入员工姓名"></Input> 
                </FormItem> 
                <FormItem label="员工工号" prop="coding"> 
                    <Input v-model="newUser.coding" placeholder="请输入员工工号"></Input> 
                </FormItem> 
                <FormItem label="员工职位" prop="position"> 
                    <Input v-model="newUser.position" placeholder="请输入员工职位"></Input> 
                </FormItem> 
                <FormItem label="登录密码" prop="password"> 
                    <Input type="password" v-model="newUser.password" placeholder="请输入登录密码"></Input> 
                </FormItem> 
                <FormItem label="确认登录密码" prop="password2"> 
                    <Input type="password" v-model="newUser.password2" placeholder="再次输入密码"></Input> 
                </FormItem> 
                <FormItem label="权限设置" prop="jurisdiction"> 
                    <Select v-model="newUser.jurisdiction" placeholder="请设置权限"> 
                        <Option value="三级">三级</Option> 
                        <Option value="二级">二级</Option> 
                        <Option value="一级">一级</Option>
                    </Select> 
                </FormItem>
                <FormItem label="联系电话" prop="telephone"> 
                    <Input v-model="newUser.telephone" placeholder="请输入联系电话"></Input> 
                </FormItem> 
                <FormItem label="家庭住址"> 
                    <Input v-model="newUser.address" placeholder="请输入家庭住址"></Input> 
                </FormItem>
                <FormItem label="头像设置"> 
                    <Button @click="clickSelectImg" type="ghost" icon="ios-cloud-upload-outline">选择用户头像</Button>
                    <input @change="selectImg($event)" class="file-btn" type="file" style="visibility: hidden;">
                    <div class="img-place">
                        <!-- 头像图片位置 -->
                    </div>
                </FormItem> 
            </Form>
            <div slot="footer">
                <Button @click.native="submitAddUser" type="primary">确认</Button>
                <Button @click.native="resetAddUser" type="text">重置</Button>
            </div>
        </Modal>
    </div>
</template>

<script>

import IndexedDB from '../indexedDB/IndexedDB'

export default {
    data () {
        // 检查员工工号
        const checkUserCoding = (rule, value, callback) => {
            const reg = /^[0-9]\d*$/g;
            if (value === '') {
                callback(new Error('请设置员工工号作为登录账号'));
            } else {
                if (reg.test(value)) {
                    const users = this.$store.state.users.userList;
                    for (let i = 0, len = users.length; i < len; i++) {
                        if (users[i].coding === value) {
                            callback(new Error('员工工号已存在，请重新设置'));
                        }
                    }
                    callback();
                } else {
                    callback(new Error('员工工号为数字'));
                }
            }
        }
        // 检查重复密码
        const checkPassword2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次确认登录密码'));
            } else {
                if (value === this.newUser.password) {
                    callback();
                } else {
                    callback(new Error('两次输入密码不一致'));
                }
            }
        }
        // 检查电话号码
        const checkTelephone = (rule, value, callback) => {
            const reg = /^1[34578]\d{9}$/;
            if (value === '') {
                callback(new Error('请设置员工手机号'));
            } else {
                if (reg.test(value)) {
                    callback();
                } else {
                    callback(new Error('手机号格式不正确'));
                }
            }
        }
        return {
            addUserFlag: false,
            newUser: {
                name: '',
                coding: '',
                position: '',
                password: '',
                password2: '',
                jurisdiction: '',
                telephone: '',
                address: '',
                avatar: ''
            },
            checkNewUser: {
                name: { required: true, message: '员工姓名不能为空', trigger: 'blur' },
                coding: { required: true, validator: checkUserCoding, trigger: 'blur' },
                position: { required: true, message: '员工职位不能为空', trigger: 'blur' },
                password: [
                    { required: true, message: '请设置登录密码', min: 6, trigger: 'blur' },
                    { min: 6, message: '登录密码长度不小于六位',  trigger: 'blur' },
                ],
                password2: { required: true, validator: checkPassword2, trigger: 'blur' },
                jurisdiction: { required: true, message: '请设置员工权限', trigger: 'change' },
                telephone: { required: true, validator: checkTelephone, trigger: 'blur' },
            },
            // 表格设置
            userTable: [
                {
                    title: '姓名',
                    width: 100,
                    align: 'center',
                    key: 'name'
                },
                {
                    title: '职位',
                    width: 100,
                    align: 'center',
                    key: 'position'
                },
                {
                    title: '工号',
                    width: 100,
                    align: 'center',
                    key: 'coding'
                },
                {
                    title: '权限',
                    width: 100,
                    align: 'center',
                    key: 'jurisdiction'
                },
                {
                    title: '联系电话',
                    width: 200,
                    align: 'center',
                    key: 'telephone'
                },
                {
                    title: '家庭住址',
                    align: 'center',
                    key: 'address'
                },
                {
                    title: '操作',
                    align: 'center',
                    key: 'action',
                    width: 100,
                    render: (h, params) => {
                        return h('Button', {
                            props: {
                                type: 'warning',
                                size: 'small',
                                icon: 'trash-b'
                            },
                            on: {
                                click: () => {
                                    if (this.$store.state.currUser.coding) {
                                        if (this.$store.state.currUser.jurisdiction === '一级') {
                                            this.$store.commit('deleteUser', params.index);
                                            let _this = this;
                                            let vshopDB = null;
                                            IndexedDB.openDB('vshopDB', 1, vshopDB, {
                                                name: 'vshop',
                                                key: 'name'
                                            }, function (db) {
                                                let vshopDB = db;
                                                IndexedDB.putData(vshopDB, 'vshop', [_this.$store.state.users]);
                                            });
                                        } else {
                                            this.$Message.error('当前用户没有删除员工权限');
                                        }
                                    } else {
                                        this.$Message.error('用户未登录无法进行此项操作，请登录后再试');
                                    }
                                }
                            }
                        }, '删除');
                    }
                }
            ],
            userList: this.$store.state.users.userList
        }
    },
    methods: {
        changeUserFlag () {
            this.addUserFlag = true;
        },
        // 选择用户头像
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
                        _this.newUser.avatar = reader.result;
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
        // 提交新用户
        submitAddUser () {
            let _this = this;
            this.$refs['newUser'].validate((valid) => { 
                if (valid) { 
                    var user = this.newUser;
                    delete user.password2;
                    if (this.$store.state.currUser.coding) {
                        if (this.$store.state.currUser.jurisdiction === '一级') {
                            this.$store.commit('addNewUser', user);
                            this.$Message.success('添加新员工成功');
                            this.newUser = {
                                name: '',
                                coding: '',
                                position: '',
                                password: '',
                                password2: '',
                                jurisdiction: '三级',
                                telephone: '',
                                address: '',
                                avatar: ''
                            };
                            document.querySelector('.img-place').innerHTML = '';
                            let _this = this;
                            let vshopDB = null;
                            IndexedDB.openDB('vshopDB', 1, vshopDB, {
                                name: 'vshop',
                                key: 'name'
                            }, function (db) {
                                let vshopDB = db;
                                IndexedDB.putData(vshopDB, 'vshop', [_this.$store.state.users]);
                            });
                        } else {
                            this.$Message.error('当前用户没有添加新员工权限');
                        }
                    } else {
                        this.$Message.error('用户未登录无法进行此项操作，请登录后再试');
                    }
                } else { 
                    this.$Message.error('表单验证失败!'); 
                } 
            });
        },
        // 重置
        resetAddUser () {
            this.$refs['newUser'].resetFields(); 
        }
    }
}
</script>

<style scoped>
    .add-person {
        padding: 10px;
    }
    .img-place {
        width: 200px;
        height: 200px;
        margin-top: 10px;
        border: 1px dashed #dddee1;
    }
    .img-place img {
        width: 100%;
        height: 100%;
    }
</style>
