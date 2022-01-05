<template>
    <div>
        <div class="columns" >
            <!--个人信息-->
            <div class="column" >
                <el-card class="box-card" shadow="never" >
<!--                    <div slot="header">简介</div>-->
                    <div class="parent" >
<!--                        <img :src="topicUser.avatar" class="blur is-full" alt="">-->
                        <!--头像-->
                        <div class="cover columns media">
                            <div class="column is-2 is-5-mobile has-text-centered">
                                <figure class="image is-128x128 media-left">
                                    <img class="is-4-mobile" :src="topicUser.avatar"  style="border-radius: 100px;">
                                </figure>
                            </div>
                            <!--用户名+粉丝数量-->
                            <div class="column is-5 is-3-mobile info">
                                <p class="has-text-weight-semibold title is-mobile is-size-5-mobile">{{topicUser.username}}</p>
                                <p class="subtitle is-size-5 has-text-grey is-mobile is-size-7-mobile"> @{{topicUser.alias}}</p>
                                <div class=" columns mt-4 is-mobile">
                                    <div class="column is-3 is-4-mobile">
                                        <strong>{{topicUser.followCount}}</strong>
                                        <p class="has-text-weight-bold is-size-7-mobile">关注</p>
                                    </div>
                                    <div class="column is-3 is-4-mobile">
                                        <strong>{{topicUser.topicCount}}</strong>
                                        <p class="has-text-weight-bold is-size-7-mobile">文章数</p>
                                    </div>
                                    <div class="column is-3 is-4-mobile">
                                        <strong>{{topicUser.followerCount}}</strong>
                                        <p class="has-text-weight-bold is-size-7-mobile">粉丝</p>
                                    </div>
                                </div>
                            </div>
                            <!--关注功能-->
                            <div class="column m-auto is-4-mobile info" v-show="isSelf">
                                <b-button v-if="isFollow" rounded  class="is-info mr-3 mb-2" @click="handleUnFollow(topicUser.id)">
                                    <i class="el-icon-check"></i>已关注</b-button>

                                <b-button v-else rounded outlined class="is-info mr-3 mb-2" @click="handleFollow(topicUser.id)">
                                    <i class="el-icon-plus"></i>关注</b-button>

                                <b-button rounded outlined class="is-info mr-3 mb-2" @click="chat(topicUser.id)">
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
                isFollow: false,
                isSelf: true
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
    /*.avatar:hover {*/
    /*    cursor: pointer;*/
    /*    transition-duration: 500ms;*/
    /*    filter: brightness(70%);*/
    /*}*/
    /*.edit{*/
    /*    display: none;*/
    /*}*/
    /*.avatar:hover .edit{*/
    /*    top: 50px;*/
    /*    left: 50px;*/
    /*    position: absolute;*/
    /*    display: block;*/
    /*}*/
    .blur{
        /*z-index: 3;*/
        position: absolute;
        top:1.5%;
        left: -0.1%;
        right: 1%;
        width:101%;
        /*margin: -10px;*/
        max-width: 1360px;
        max-height: 180px;
        height: 100%;
        object-fit:cover;
        -webkit-filter: blur(20px); /* Chrome, Opera */
    }
    .info{
        z-index: 10;
    }

</style>