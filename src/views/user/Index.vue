<template>
    <div class="columns">
        <!--个人信息-->
        <div class="column">
            <el-card class="box-card" shadow="never">
                <div slot="header">简介</div>
                    <div class="media">
                        <div class="media-left">
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
                    <p class="mb-1">文章数：   {{ topicUser.topicCount }}</p>
                    <p class="mb-1">邮箱：   {{ topicUser.email }}</p>
                    <p class="mb-1">论坛积分：  <code>{{ topicUser.score }}</code> </p>
                    <p class="mb-1">职业：   {{ topicUser.bio }}</p>
                    <p class="mb-1">注册时间：{{ dayjs(topicUser.createTime).format("YYYY-MM-DD") }}</p>

                </div>
            </el-card>
        </div>
        <!--帖子-->
        <div class="column is-three-quarters">
            <el-card class="box-card" shadow="never">
                <div slot="header">
                    帖子信息
                </div>
                <div>
                    <article v-for="(item,index) in topics" :key="index" class="media">
                        <div class="media-content">
                            <div>
                                <p class="has-ellipsis">
                                    <el-tooltip class="item" effect="dark" :content="item.title" placement="top">
                                        <router-link :to="{name:'post-detail',params:{id:item.id}}">
                                        <span class="is-size-6">
                                            {{item.title}}
                                        </span>
                                        </router-link>
                                    </el-tooltip>
                                </p>
                            </div>
                            <nav class="level has-text-grey is-mobile  is-size-7 mt-2">
                                <div class="level-left">
                                    <div class="level-left">
                                        <router-link class="level-item" :to="{ path: `/member/${item.username}/home` }">
                                            {{ item.alias }}
                                        </router-link>
                                        <span class="mr-1">发布于:{{ dayjs(item.createTime).format("YYYY-MM-DD") }}</span>
                                        <span v-for="(tag, index) in item.tags" :key="index" class="tag is-hidden-mobile is-success is-light mr-1">
                                                <router-link :to="{ name: 'tag', params: { name: tag.name } }">
                                                    {{ "#" + tag.name }}
                                                </router-link>
                                            </span>
                                        <span class="is-hidden-mobile">浏览:{{ item.view }}</span>
                                    </div>
                                </div>
                                <div v-if="token && user.id === topicUser.id" class="level-right">
                                    <router-link class="level-item" :to="{name: 'post-edit',params: {id: item.id}}">
                                        <span class="tag">编辑</span>
                                    </router-link>
                                    <a class="level-item">
                                        <span class="tag" @click="handleDelete(item.id)">
                                            删除
                                        </span>
                                    </a>
                                </div>
                            </nav>

                        </div>
                    </article>
                </div>
                <!--分页-->
                <pagination
                        v-show="page.total > 0"
                        :total="page.total"
                        :page.sync="page.current"
                        :limit.sync="page.size"
                        @pagination="init"
                />
            </el-card>
        </div>
    </div>
</template>

<script>
    import Pagination from "@/components/Pagination/Index";
    import {mapGetters} from 'vuex'
    import {deleteTopic} from "../../api/post";
    import {getUserInfoByName} from "../../api/user";

    export default {
        name: "Index",
        components: {Pagination},
        data(){
            return{
                flag: false,
                topicUser: {},
                topics: {},
                page: {
                    current: 1,
                    size: 5,
                    total: 0,
                    current: 1
                }
            }
        },
        computed: {
            ...mapGetters(['token','user'])
        },
        mounted() {
            this.fetchUserInfo()
        },
        methods: {
            fetchUserInfo(){
                getUserInfoByName(this.$route.params.username,this.page.current,this.page.size).then( response => {
                    const {data} = response
                    console.log(data)
                    this.topics = data.topics.records
                    this.topicUser = data.user
                    this.page.total = data.topics.total
                    this.page.current = data.topics.current
                    this.page.size = data.topics.size
                })
            },
            init(tab){
                this.fetchUserInfo()
            },
            handleDelete(id){
                const _this = this
                this.$confirm('确认删除吗？','提示',{
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(function () {
                    deleteTopic(id).then(response => {
                        const {code} = response
                        // alert(message)
                        if(code === 200){
                            _this.$message.success('删除成功！')
                            setTimeout(() => {
                                _this.$router.push({path: '/'})
                            },500)
                        }
                    })
                }).catch(() => {
                    this.$message.info("已取消删除！")
                })

            }
        }
    }
</script>

<style scoped>

</style>