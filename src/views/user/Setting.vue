<template>
    <div class="columns">
        <div class="column ">
            <el-card class="box-card" shadow="never">
                <div slot="header">
                   个人信息
                </div>
                <div class="media">
                    <div class="media-content">
                        <figure class="image is-96x96">
                            <img :src="`https://gravatar.loli.net/avatar/${topicUser.id}?s=164&d=monsterid`" style="border-radius: 100px;">
                        </figure>
                    </div>
                    <div class="media-content mt-1 ml-4">
                        <span class="has-text-weight-semibold is-size-4">{{topicUser.username}}</span>
                        <span class="is-size-7 has-text-grey"> @{{topicUser.alias}}</span>
                        <div class=" columns is-mobile mt-4">
                            <div class="column is-half">
                                <code>{{topicUser.followCount}}</code>
                                <p class="has-text-weight-bold">关注</p>
                            </div>
                            <div class="column is-half">
                                <code>{{topicUser.followerCount}}</code>
                                <p class="has-text-weight-bold">粉丝</p>
                            </div>
                        </div>
                    </div>
                </div>
            </el-card>

            <el-card class="box-card" shadow="never">
                <div slot="header">详细信息</div>
                <div class="container">
                    <p class="mb-1">用户名：   {{ topicUser.username }}</p>
                    <p class="mb-1">别名：   {{ topicUser.alias }}</p>
                    <p class="mb-1">手机号：   {{ topicUser.mobile }}</p>
                    <p class="mb-1">文章数：   <code>{{ topicUser.topicCount }}</code></p>
                    <p class="mb-1">邮箱：   {{ topicUser.email }}</p>
                    <p class="mb-1">论坛积分：  <code>{{ topicUser.score }}</code> </p>
                    <p class="mb-1">职业：   {{ topicUser.bio }}</p>
                    <p class="mb-1">注册时间：{{ dayjs(topicUser.createTime).format("YYYY-MM-DD") }}</p>

                </div>
            </el-card>
        </div>
        <div class="column is-three-quarters">
            <el-card class="box-card" shadow="never">
                <div slot="header">
                    资料修改
                </div>
                <div>
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="70px" class="demo-ruleForm">
                        <el-form-item label="用户名" prop="username">
                            <el-input v-model="ruleForm.username" :disabled="edit"></el-input>
                        </el-form-item>

                        <el-form-item label="别名" prop="alias">
                            <el-input v-model="ruleForm.alias" placeholder="请输入要修改的别名"></el-input>
                        </el-form-item>

                        <el-form-item label="手机号" prop="mobile">
                            <el-input v-model="ruleForm.mobile" placeholder="请输入要修改的手机号"></el-input>
                        </el-form-item>

                        <el-form-item label="邮箱" prop="email">
                            <el-input v-model="ruleForm.email" placeholder="请输入要修改的邮箱"></el-input>
                        </el-form-item>

                        <el-form-item>
                            <el-button type="primary" @click="handleUpdateUserInfo('ruleForm')">立即修改</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-card>
            <el-card class="box-card" shadow="never">
                <div slot="header">
                    密码修改
                </div>
                <div>
                    <el-Form :model="changePassForm" :rules="changePassRules" ref="changePassForm" label-width="90px">
                        <el-form-item label="原密码" prop="oldPass">
                            <el-input v-model="changePassForm.oldPass" placeholder="请输入原密码" type="password" show-password></el-input>
                        </el-form-item>
                        <el-form-item label="新密码" prop="newPass">
                            <el-input v-model="changePassForm.newPass" placeholder="请输入新密码" type="password" show-password></el-input>
                        </el-form-item>
                        <el-form-item label="确认密码" prop="renewPass">
                            <el-input v-model="changePassForm.renewPass" placeholder="请再次输入新密码" type="password" show-password></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="handleChangePass('changePassForm')">立即修改</el-button>
                        </el-form-item>
                    </el-Form>

                </div>
            </el-card>
        </div>
    </div>
</template>

<script>
    import {getUserInfoByName, updateUserInfo,modifyPass} from "../../api/user";

    export default {
        name: "Setting",
        data(){
            var validatePass = (rule,value,callback) => {
                if(value === ''){
                    callback(new Error('请输入新密码'));
                }else if(value.toString().length < 6 || value.toString().length > 18){
                    callback(new Error('密码长度为6-18个字符！'))
                }else{
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.changePassForm.newPass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return{
                readonly: true,
                edit: true,
                topicUser: {},
                ruleForm: {
                    id: '',
                    username: '',
                    alias: '',
                    mobile: '',
                    email: ''
                },
                rules: {
                    username: [
                        { required: false, message: '请输入要修改的用户名', trigger: 'change' },
                        { min: 3, max: 9, message: '长度在 3 到 9 个字符', trigger: 'change' }
                    ],
                    alias: [
                        { required: false, message: '请输入要修改的别名', trigger: 'change' }
                    ],
                    mobile: [
                        { required: false, message: '请输入要修改的手机号', trigger: 'change' }
                    ],
                    email: [
                        { required: false, message: '请输入要修改的邮箱', trigger: 'change' }
                    ]
                },
                changePassForm: {
                    id: '',
                    oldPass: '',
                    newPass: '',
                    renewPass: ''
                },
                changePassRules: {
                    oldPass: [{required: true,message: '请输入原密码',trigger: 'change'},
                        { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }],
                    newPass: [{required: true,validator: validatePass,trigger: 'change'},
                        { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }],
                    renewPass: [{required: true,validator: validatePass2,trigger: 'change'},
                        { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }]
                }
            };

        },
        created() {
            this.fetchUserInfo()
        },
        methods: {
            fetchUserInfo(){
                getUserInfoByName(this.$route.params.username).then( response => {
                    const {data} = response
                    // console.log(data)
                    this.topicUser = JSON.parse(JSON.stringify(data.user))
                    this.ruleForm= data.user
                    this.changePassForm.id = data.user.id
                    console.log(this.topicUser)
                })
            },
            handleUpdateUserInfo(formName) {
                updateUserInfo(this.ruleForm).then(response => {
                    const {data,code,message} = response
                    console.log(response)
                    if(code === 200){
                        this.$message.success('修改成功！')
                        setTimeout( () => {

                        },1000)
                    }
                })
            },
            handleChangePass(formName){
                this.$refs[formName].validate( (valid) => {
                    if(valid){
                        // if(this.changePassForm.oldPass === this.changePassForm.newPass){
                        //     this.$message.error('原密码不能与新密码相同！')
                        // }else if(this.changePassForm.newPass != this.changePassForm.renewPass){
                        //     this.$message.error('密码两次输入不一致！')
                        // }else{
                            //提交修改密码
                            // let obj = {
                            //     id: this.changePassForm.id,
                            //     oldPass: this.changePassForm.oldPass,
                            //     newPass: this.changePassForm.newPass
                            // }
                            modifyPass(this.changePassForm).then( response => {
                                const {code,data,message} = response
                                console.log(data)
                                if(code === 200){
                                    this.$message.success(message)
                                    setTimeout( () =>{
                                        this.$refs[formName].resetFields();
                                    },500)
                                }else{
                                    this.$message.warning(message)
                                }
                            })

                        // }
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>