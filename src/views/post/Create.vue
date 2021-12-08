<template>
    <div class="columns">
        <div class="column is-full">
            <el-card class="box-card" shadow="never" v-loading="loading">
                <div slot="header" class="is-clearfix">
                    <span><i class="el-icon-edit">主题 / 发布主题</i></span>
                </div>
                <div>
                    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" class="demo-ruleForm">
                        <el-form-item prop="title">
                            <el-input v-model="ruleForm.title" placeholder="输入主题名称">
                            </el-input>
                        </el-form-item>

                        <!--markdown-->
                        <div id="vditor" v-model="ruleForm.content"/>
                            <b-taginput
                                    v-model="ruleForm.tags"
                                    class="my-3"
                                    maxlength="15"
                                    maxtags="3"
                                    ellipsis
                                    placeholder="请输入主题标签，限制15个字符和3个标签"
                            />

                        <el-form-item>
                            <el-button type="primary" @click="submitForm('ruleForm')">立即发表</el-button>
                            <el-button @click="resetForm('ruleForm')">重置</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script>
    import {post} from '../../api/post'
    import Vditor from "vditor";
    import 'vditor/dist/index.css'

    export default {
        name: "Create",

        data(){
            return{
                loading: false,
                contentEditor: {},
                ruleForm: {
                    title: '',   //标题
                    tags: [],    //标签
                    content: ''  //内容
                },
                rules: {
                    title: [
                        {required: true,message:'请输入话题名称',trigger: 'blur'},
                        {
                            min: 1,
                            max: 25,
                            message: '长度在1到25个字符',
                            trigger: 'blur'
                        }
                    ],
                }
            }
        },
        mounted() {
            this.contentEditor = new Vditor('vditor',{
                height: 500,
                placeholder: '此处为话题内容...',
                theme: 'classic',
                counter: {
                    enable: true,
                    type: 'markdown'
                },
                preview: {
                    delay: 0,
                    hljs: {
                        style: 'monokai',
                        lineNumber: true
                    }
                },
                tab: '\t',
                typewriterMode: true,
                toolbarConfig: {
                    pin: true
                },
                cache: {
                    enable: false
                },
                mode: 'sv'
            })
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.loading = true
                        // alert('submit!');
                        if(this.contentEditor.getValue().length === 1 ||
                            this.contentEditor.getValue() == null ||
                            this.contentEditor.getValue() === ''
                        ){
                            alert('还没有输入内容呢')
                            return false
                        }
                        if(this.ruleForm.tags == null || this.ruleForm.tags.length === 0){
                            alert('还没有输入标签呢')
                            return false
                        }
                        this.ruleForm.content = this.contentEditor.getValue()
                        //向后端发起请求，发表
                        post(this.ruleForm).then((response) => {
                            const {data} = response
                            this.$message.success('发布成功！')
                            // console.log(data)
                            setTimeout(() => {
                                this.$router.push({
                                    name: 'post-detail',
                                    params: {id: data.id}
                                })
                            },800)
                        })
                        this.loading = false

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields()
                this.contentEditor.setValue('')
                this.ruleForm.tags = ''
            }
        }
    }
</script>

<style scoped>

</style>