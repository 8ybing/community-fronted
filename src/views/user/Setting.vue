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
                    <el-Form :model="changePassForm" label-width="70px">
                        <el-form-item label="原密码" prop="oldPass">
                            <el-input v-model="changePassForm.oldPass" placeholder="请输入原密码"></el-input>
                        </el-form-item>
                        <el-form-item label="新密码" prop="newPass">
                            <el-input v-model="changePassForm.newPass" placeholder="请输入新密码"></el-input>
                        </el-form-item>
                        <el-form-item label="确认密码" prop="rePass">
                            <el-input v-model="changePassForm.oldPass" placeholder="请再次输入新密码"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm('changePassForm')">立即修改</el-button>
                        </el-form-item>
                    </el-Form>

                </div>
            </el-card>
        </div>
    </div>
</template>

<script>
    import {getUserInfoByName, updateUserInfo} from "../../api/user";

    export default {
        name: "Setting",
        data(){
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
                    oldPass: '',
                    newPass: ''
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
                            this.fetchUserInfo()
                        },1000)
                    }
                })
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style scoped>

</style>