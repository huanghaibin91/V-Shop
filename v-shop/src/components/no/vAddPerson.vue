<template>
    <Modal title="添加员工" v-model="modal" class-name="set-goods" width="400"> 
        <Form :model="person" :label-width="80"> 
            <FormItem label="员工姓名"> 
                <Input v-model="person.name"></Input> 
            </FormItem> 
            <FormItem label="员工工号"> 
                <Input v-model="person.coding"></Input> 
            </FormItem> 
            <FormItem label="登录密码"> 
                <Input type="password" v-model="person.password"></Input> 
            </FormItem> 
            <FormItem label="权限设置"> 
                <Select v-model="person.jurisdiction" placeholder="请设置权限"> 
                    <Option value="三级">三级</Option> 
                    <Option value="二级">二级</Option> 
                    <Option value="一级">一级</Option>
                </Select> 
            </FormItem>
            <FormItem label="联系电话"> 
                <Input v-model="person.telephone"></Input> 
            </FormItem> 
            <FormItem label="家庭住址"> 
                <Input v-model="person.address"></Input> 
            </FormItem>
            <FormItem label="头像设置"> 
                <Button @click="selectImg" type="ghost" icon="ios-cloud-upload-outline">选择商品图片</Button>
                <input class="file-btn" type="file" style="visibility: hidden;">
                <div class="img-place">
                    <img src="../assets/00000000.jpg" alt="">
                </div>
            </FormItem> 
        </Form>
    </Modal>
</template>

<script>
export default {
    data () {
        return {
            modal: false,
            person: {
                name: '',
                coding: '',
                password: '',
                jurisdiction: '',
                telephone: '',
                address: '',
                portrait: ''
            },
        }
    }
}
</script>

<style scoped>
    .set-goods .ivu-modal {
        position: absolute;
        top: 50px;
        left: 50%;
        transform: translateX(-50%);
    }
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
