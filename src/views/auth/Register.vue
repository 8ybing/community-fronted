<template>
    <div class="card">
        <el-card class="box-card" shadow="never">
            <div slot="header" align="center">🎉<span class="has-text-weight-bold">新用户注册</span></div>
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

                <el-form-item label="用户名" prop="username">
                    <el-input v-model="ruleForm.username" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="密码" prop="pass">
                    <el-input v-model="ruleForm.pass" autocomplete="off" type="password" show-password></el-input>
                </el-form-item>

                <el-form-item label="确认密码" prop="checkPass">
                    <el-input v-model="ruleForm.checkPass" autocomplete="off" type="password" show-password></el-input>
                </el-form-item>

                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="ruleForm.email"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">立即注册</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
    import {userRegister} from "../../api/auth/auth";

    export default {
        name: "Register",
        data() {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.ruleForm.checkPass !== '') {
                        this.$refs.ruleForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                loading: false,
                ruleForm: {
                    username: '',
                    pass: '',
                    checkPass: '',
                    email: ''
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
                    ],
                    pass: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { validator: validatePass, trigger: 'blur'}
                    ],
                    checkPass: [
                        { required: true, message: '请再次输入密码', trigger: 'blur' },
                        { validator: validatePass2, trigger: 'blur'}
                    ],
                    email: [
                        { type: 'email', required: true, message: '请输入正确邮箱', trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.loading = true
                        userRegister(this.ruleForm).then((response) => {
                            const {code,message} = response
                            if(code === 200){
                                this.$message({
                                    message: '账号注册成功',
                                    type: 'success'
                                })
                                setTimeout(() => {
                                    this.loading = false
                                    this.$router.push({path: this.redirect || '/login'})
                                },100)
                            }else{
                                this.$message.error('注册失败' )
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style scoped>
    .card {
        max-height: 300px;
        max-width: 520px;
        height: 100%;
        width: 100%;
        margin: auto;
    }
</style>