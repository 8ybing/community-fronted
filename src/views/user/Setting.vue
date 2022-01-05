<template>
    <div class="columns">
        <div class="column ">
            <el-card class="box-card" shadow="never">
                <div slot="header">
                   个人信息
                </div>
                <div class="columns media">
                    <div class="column is-4-mobile media-content avatar" @click="changeAvatar()">
                        <figure class="image is-96x96">
                            <img :src="topicUser.avatar" style="border-radius: 100px;">
                            <div id="edit-icon" >
                                <i style="font-size: 30px" class="el-icon-edit edit"></i>
                            </div>
                        </figure>
                    </div>
                    <Avatar ref="avatar"></Avatar>
                    <div class="column is-8-mobile media-content m-auto">
                        <span class="has-text-weight-semibold is-size-4">{{topicUser.username}}</span><br>
                        <span class="is-size-7 has-text-grey"> @{{topicUser.alias}}</span>
                        <div class=" columns is-mobile mt-4">
                            <div class="column is-half">
                                <strong>{{topicUser.followCount}}</strong>
                                <p class="has-text-weight-bold">关注</p>
                            </div>
                            <div class="column is-half">
                                <strong>{{topicUser.followerCount}}</strong>
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
                    <p class="mb-1">昵称：   {{ topicUser.alias }}</p>
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

                        <el-form-item label="昵称" prop="alias">
                            <el-input v-model="ruleForm.alias" placeholder="请输入要修改的昵称"></el-input>
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
    import Avatar from "./Avatar"

    export default {
        name: "Setting",
        components: {Avatar},
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
                dialogVisible: false,
                readonly: true,
                edit: true,
                topicUser: {},
                ruleForm: {
                    id: '',
                    username: '',
                    alias: '',
                    mobile: '未设置',
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
                },
            };

        },
        // props: ['dialogVisible'],
        created() {
            this.fetchUserInfo()
        },
        methods: {
            aaaa() {
                console.log(this.topicUser)
            },
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
                    // console.log(response)
                    if(code === 200){
                        this.$message.success('修改成功！如果资料未更新，请手动刷新网页！')
                        setTimeout( () => {
                            this.fetchUserInfo()
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
                                // console.log(data)
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
            },
            changeAvatar(){
                this.$refs.avatar.open(this.topicUser)
                // this.dialogVisible = true
            }
        }
    }
</script>

<style scoped>
    .avatar:hover {
        cursor: pointer;
        transition-duration: 500ms;
        filter: brightness(70%);
    }
    .edit{
        display: none;
    }
    .avatar:hover .edit{
        top: 30px;
        left: 35px;
        position: absolute;
        display: block;
    }
</style>