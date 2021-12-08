<template>
    <div class="columns">
        <div class="column is-full">
            <el-card class="box-card" shadow="never">
                <div slot="header" class="is-clearfix">
                    <span><i class="el-icon-edit">主题 / 更新主题</i></span>
                </div>
                <div>
                    <el-form ref="topic" :model="topic" class="demo-topic">
                        <el-form-item prop="title">
                            <el-input v-model="topic.title" placeholder="输入新主题名称">
                            </el-input>
                        </el-form-item>

                        <!--markdown-->
                        <div id="vditor" />
                        <b-taginput
                                v-model="tags"
                                class="my-3"
                                maxlength="15"
                                maxtags="3"
                                ellipsis
                                placeholder="请输入主题标签，限制15个字符和3个标签"
                        />

                        <el-form-item class="mt-3">
                            <el-button type="primary" @click="handleUpdate()">更新</el-button>
                            <el-button @click="resetForm('topic')">重置</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";
    import Vditor from "vditor";
    import 'vditor/dist/index.css'
    import {getTopicDetail, update} from "../../api/post";

    export default {
        name: "PostEdit",
        components: {},
        data(){
            return{
                topic: {},
                tags: []
            }
        },
        created() {
            this.fetchTopic()
        },
        computed: {
            ...mapGetters([
                'token'
            ]),
        },
        methods: {
            renderMarkdown(md){
                this.contentEditor = new Vditor("vditor",{
                    height :460,
                    placeholder: "请输入要更新的内容",
                    preview: {
                        hljs: {style: 'monokai'},
                    },
                    mode: 'sv',
                    after:() => {
                        this.contentEditor.setValue(md)
                    }
                })
            },
            fetchTopic(){
                getTopicDetail(this.$route.params.id).then(response => {
                    const {data} = response
                    this.topic = data.topic
                    this.tags = data.tags.map(tag => tag.name)
                    this.renderMarkdown(data.topic.content)
                })
            },
            handleUpdate: function () {
                this.topic.content = this.contentEditor.getValue()
                update(this.topic).then(response => {
                    const {data,code,message} = response
                    // console.log(data)
                    if(code === 200){
                        this.$message.success(message)
                        setTimeout(() => {
                            this.$router.push({path: '/post/'+this.topic.id})
                        },500)
                    }
                })

            }
        }
    }
</script>

<style scoped>

</style>