<template>
    <div class="person-list">
        <div class="add-person">
            <Button @click.native="changePersonFlag" type="primary" icon="person-add">添加新员工</Button>
        </div>
        <div class="person-message">
            <Table :columns="columns" :data="data"></Table>
        </div>
        <!-- 添加员工弹窗 -->
        <Modal title="添加员工" v-model="addPersonFlag" :styles="{top: '20px'}" width="400"> 
            <Form :model="newPerson" :label-width="100"> 
                <FormItem label="员工姓名"> 
                    <Input v-model="newPerson.name" placeholder="请输入员工姓名"></Input> 
                </FormItem> 
                <FormItem label="员工工号"> 
                    <Input v-model="newPerson.name" placeholder="请输入员工工号"></Input> 
                </FormItem> 
                <FormItem label="登录密码"> 
                    <Input type="password" v-model="newPerson.password" placeholder="请输入登录密码"></Input> 
                </FormItem> 
                <FormItem label="确认登录密码"> 
                    <Input type="password" v-model="newPerson.password2" placeholder="再次输入密码"></Input> 
                </FormItem> 
                <FormItem label="权限设置"> 
                    <Select v-model="newPerson.jurisdiction" placeholder="请设置权限"> 
                        <Option value="三级">三级</Option> 
                        <Option value="二级">二级</Option> 
                        <Option value="一级">一级</Option>
                    </Select> 
                </FormItem>
                <FormItem label="联系电话"> 
                    <Input v-model="newPerson.telephone" placeholder="请输入联系电话"></Input> 
                </FormItem> 
                <FormItem label="家庭住址"> 
                    <Input v-model="newPerson.address" placeholder="请输入家庭住址"></Input> 
                </FormItem>
                <FormItem label="头像设置"> 
                    <Button @click="selectImg" type="ghost" icon="ios-cloud-upload-outline">选择用户头像</Button>
                    <input class="file-btn" type="file" style="visibility: hidden;">
                    <div class="img-place">
                        <img src="../assets/00000000.jpg" alt="">
                    </div>
                </FormItem> 
            </Form>
        </Modal>
    </div>
</template>

<script>
export default {
    data () {
        return {
            addPersonFlag: false,
            newPerson: {
                name: '',
                number: '',
                password: '',
                password2: '',
                jurisdiction: '',
                telephone: '',
                address: '',
                portrait: ''
            },
            // 表格设置
            columns: [
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
                    key: 'number'
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
                }
            ],
            data: [
                {
                    name: '小张',
                    position: '店长',
                    number: '01059371',
                    jurisdiction: '一级',
                    telephone: '17721259651',
                    address: '成都市武侯区新南门路8号'
                }
            ]
        }
    },
    methods: {
        changePersonFlag () {
            this.addPersonFlag = true;
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
