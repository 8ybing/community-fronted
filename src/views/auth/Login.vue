<template>
    <div class="card" >
<!--        <div class="columns is-half is-offset-one-quarter">-->
            <el-card shadow="never" v-loading="loading" >
                <div slot="header" class="has-text-centered has-text-weight-bold">
                    用户登录
                </div>
                <div>
                    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="70px" >
                        <el-form-item label="用户名" prop="username">
                            <el-input v-model="ruleForm.username" placeholder="请输入用户名" >
                            </el-input>
                        </el-form-item>

                        <el-form-item label="密码" prop="pass" >
                            <el-input v-model="ruleForm.pass" type="password"show-password placeholder="请输入密码" >
                            </el-input>
                        </el-form-item>

                        <el-form-item label="记住" prop="deivery">
                            <el-switch v-model="ruleForm.rememberMe"></el-switch>
                        </el-form-item>

                        <el-form-item>
                            <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                            <el-button @click="resetForm('ruleForm')">重置</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-card>
<!--        </div>-->
    </div>
</template>

<script>

    export default {
        name: "Login",
        data() {
            return {
                redirect: undefined,
                loading: false,
                ruleForm: {
                    username: '',
                    pass: '',
                    rememberMe: false
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { min: 6, max: 50, message: '长度在 6 到 50 个字符', trigger: 'blur' }
                    ],
                    pass: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
                    ]
                },
                cuser_info:{
                    confirm_pwd:'',
                },
                visible2: true
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.loading = true

                        this.$store.dispatch("user/login",this.ruleForm)
                        .then(() => {
                            this.$message({
                                message: '登录成功！',
                                type: 'success'
                            });
                            this.$store.dispatch("user/getInfo")
                            setTimeout(() => {
                                this.loading = false
                                this.$router.push({path: this.redirect || "/"})
                            },100)
                        })
                        this.loading = false

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            changePass(value,kind) {
                this.visible2 = !(value === 'show');
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

