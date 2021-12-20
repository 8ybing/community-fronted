<template>
    <div>
        <div class="columns">
            <!--个人信息-->
            <div class="column is-full">
                <el-card class="box-card" shadow="never">
<!--                    <div slot="header">简介</div>-->
                    <div class="media mt-4 ml-5">
                        <div class="media-left">
                            <figure class="image is-128x128">
                                <img :src="`https://gravatar.loli.net/avatar/${topicUser.id}?s=164&d=monsterid`" style="border-radius: 100px;">
                            </figure>
                        </div>
                        <div class="media-content mt-5 ml-6">
                            <p class="has-text-weight-semibold title is-3">{{topicUser.username}}</p>
                            <p class="subtitle is-size-5 has-text-grey"> @{{topicUser.alias}}</p>
                            <div class=" columns is-mobile mt-4">
                                <div class="column is-2">
                                    <code>{{topicUser.followCount}}</code>
                                    <p class="has-text-weight-bold">关注</p>
                                </div>
                                <div class="column is-2">
                                    <code>{{topicUser.topicCount}}</code>
                                    <p class="has-text-weight-bold">文章数</p>
                                </div>
                                <div class="column is-2">
                                    <code>{{topicUser.followerCount}}</code>
                                    <p class="has-text-weight-bold">粉丝</p>
                                </div>
                            </div>
                        </div>
                        <div class="mt-6 mr-6">
                            <b-button v-if="isFollow" rounded  class="is-info mr-3" @click="handleUnFollow(topicUser.id)">
                                <i class="el-icon-check"></i>已关注</b-button>

                            <b-button v-else rounded outlined class="is-info mr-3" @click="handleFollow(topicUser.id)">
                                <i class="el-icon-plus"></i>关注</b-button>

                            <b-button rounded outlined class="is-info mr-3" @click="chat(topicUser.id)">
                                <i class="el-icon-chat-line-round"></i>私信</b-button>

                            <el-dropdown>
                                <b-button rounded outlined class="is-info is-hover">
                                    <i class="el-icon-more"></i>
                                </b-button>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item>加入黑名单</el-dropdown-item>
                                    <el-dropdown-item>举报</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>

                        </div>
                    </div>
                </el-card>
            </div>
        </div>
        <div class="columns">
            <div class="column is-one-fifth">
                <el-card class="box-card" shadow="never">
                    <div slot="header">个人简介</div>
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
            <div class="column">
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

                    <el-empty v-show="page.total === 0" description="暂无文章哦！"></el-empty>

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
    </div>


</template>

<script>
    import Pagination from "@/components/Pagination/Index";
    import {mapGetters} from 'vuex'
    import {deleteTopic} from "../../api/post";
    import {getUserInfoByName} from "../../api/user";
    import {follow,isFollow,unfollow} from "../../api/follow";

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
                },
                isFollow: false
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
                    if(this.token != null && this.token != ''){
                        isFollow(this.topicUser.id).then( response => {
                            const {data} = response
                            console.log(data)
                            this.isFollow = data.isFollow
                        })
                    }
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
                                _this.fetchUserInfo()
                            },500)
                        }
                    })
                }).catch(() => {
                    this.$message.info("已取消删除！")
                })
            },
            handleFollow: function (id) {
                if(this.token != null && this.token != ''){
                    follow(id).then(response => {
                        const {message} = response
                        this.$message.success(message)
                        this.isFollow = !this.isFollow
                        this.topicUser.followerCount = parseInt(this.topicUser.followerCount) + 1
                    })
                }else{
                    this.$message.info("请先登录")
                }
            },
            handleUnFollow: function (id) {
                unfollow(id).then(response => {
                    const {message} = response
                    this.$message.success(message)
                    this.isFollow = !this.isFollow
                    this.topicUser.followerCount = parseInt(this.topicUser.followerCount) - 1
                })
            },
            chat(id){
                this.$message.info("私信功能正在开发中...")
            }
        }
    }
</script>

<style scoped>

</style>