<template>
    <div class="columns">
        <!--文章详情-->
        <div class="column is-three-quarters">
            <!--主题-->
            <el-card class="box-card" shadow="never">
                <div slot="header" class="has-text-centered">
                    <p class="is-size-5 has-text-weight-bold">{{topic.title}}</p>
                    <div class="has-text-grey is-size-7 mt-3">
                        <span>{{dayjs(topic.createTime).format('YYYY/MM/DD HH:mm:ss')}}</span>
                        <el-divider direction="vertical"/>
                        <span>发布者：{{topicUser.alias}}</span>
                        <el-divider direction="vertical"/>
                        <span>查看：{{topic.view}}</span>
                    </div>
                </div>

                <!--markdown-->
                <div id="preview"></div>

                <!--标签-->
                <nav class="level has-text-grey is-size-7 mt-6">
                    <div class="level-left">
                        <p class="level-item">
                            <b-taglist>
                                <router-link v-for="(tag,index) in tags" :key="index" :to="{name: 'tag',params: {name: tag.name}}">
                                    <b-tag type="is-info is-light mr-1">
                                        {{"#"+ tag.name}}
                                    </b-tag>
                                </router-link>
                            </b-taglist>
                        </p>
                    </div>
                    <div v-if="token && user.id === topicUser.id" class="level-right">
                        <router-link class="level-item" :to="{name: 'topic-edit',params: {id: topic.id}}">
                            <span class="tag">编辑</span>
                        </router-link>
                        <a class="level-item">
                            <span class="tag" @click="handleDelete(topic.id)">
                                删除
                            </span>
                        </a>
                    </div>
                </nav>
            </el-card>
        </div>
        <!--作者信息-->
        <div class="column">
            <Author v-if="flag" :user="topicUser">
            </Author>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import {getTopicDetail} from "../../api/post";
    import Author from "./Author";

    import Vditor from 'vditor'
    import 'vditor/dist/index.css'

    export default {
        name: "TopicDetail",
        components: {Author},
        data(){
            return{
                flag: false,
                topic: {
                    id: this.$route.params.id,
                    content: ''
                },
                tags: [],
                topicUser: {},

            }
        },
        computed: {
            ...mapGetters([
                'token','user'
            ])
        },
        mounted() {
            this.fetchTopic()
        },
        methods: {
            renderMarkdown(md){
                Vditor.preview(document.getElementById('preview'),md, {
                    hljs: {style: 'github'}
                })
            },
            //帖子详情初始化
            async fetchTopic(){
                getTopicDetail(this.$route.params.id).then( response => {
                    const {data} = response
                    console.log(data)
                    document.title = data.topic.title

                    this.topic = data.topic
                    this.tags = data.tags
                    this.topicUser = data.user

                    this.renderMarkdown(this.topic.content)
                    this.flag = true
                })
            },
            handleDelete(id){
                deleteTopic().then()
            }
        }
    }
</script>

<style scoped>

</style>