<template>
    <Modal title="欢迎登录" v-model="loginFlag" loading="loading" ok-text="登录" width="300" 
    class-name="login-in">
        <Form ref="formInline" :model="formInline" :rules="ruleInline">
            <FormItem prop="user">
                <Input type="text" v-model="formInline.user" placeholder="用户名">
                    <Icon type="person" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <FormItem prop="password">
                <Input type="password" v-model="formInline.password" placeholder="密码">
                    <Icon type="locked" slot="prepend"></Icon>
                </Input>
            </FormItem>
        </Form>
    </Modal>
</template>

<script>
export default {
    data () {
        return {
            loading: true,
            formInline: {
                user: '',
                password: ''
            },
            ruleInline: {
                user: [
                    { required: true, message: '请填写用户名', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请填写密码', trigger: 'blur' },
                    { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
                ]
            }
        }
    },
    computed: {
        
    },
    methods: {
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$Message.success('提交成功!');
                } else {
                    this.$Message.error('表单验证失败!');
                }
            })
        }
    }
}
</script>

<style>
    .login-in {
        background: url('../assets/login-bg.jpg') no-repeat center fixed;
    }
    .login-in .ivu-modal {
        position: absolute;
        right: 160px;
        top: 50%;
        transform: translateY(-50%);
    }
</style>


