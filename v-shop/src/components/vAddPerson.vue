<template>
    <Modal title="添加员工" v-model="modal" class-name="set-goods" width="400"> 
        <Form :model="formTop" :label-width="80"> 
            <FormItem label="员工姓名"> 
                <Input v-model="formTop.input1"></Input> 
            </FormItem> 
            <FormItem label="员工工号"> 
                <Input v-model="formTop.input2"></Input> 
            </FormItem> 
            <FormItem label="登录密码"> 
                <Input type="password" v-model="formTop.input3"></Input> 
            </FormItem> 
            <FormItem label="权限设置"> 
                <Select v-model="formTop.input4" placeholder="请设置权限"> 
                    <Option value="三级">三级</Option> 
                    <Option value="二级">二级</Option> 
                    <Option value="一级">一级</Option>
                </Select> 
            </FormItem>
            <FormItem label="联系电话"> 
                <Input v-model="formTop.input5"></Input> 
            </FormItem> 
            <FormItem label="头像设置"> 
                <Input type="img"></Input> 
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
                input4: '',
                input5: '',
                input6: ''
            }
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
</style>
