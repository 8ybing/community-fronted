<template>
    <section id="author">
        <el-card class="" shadow="never">
            <div slot="header">
                <span class="has-text-weight-bold">👨‍💻 关于作者</span>
            </div>
            <div class="has-text-centered">
                <p class="is-size-5 mb-5">
                    <router-link :to="{ path: `/user/${user.username}/home` }">
                        {{ user.alias }} <span class="is-size-7 has-text-grey">{{ '@' + user.username }}</span>
                    </router-link>
                </p>
                <div class="columns is-mobile">
                    <div class="column is-half">
                        <code>{{ user.topicCount }}</code>
                        <p>文章</p>
                    </div>
                    <div class="column is-half">
                        <code>{{ user.followerCount }}</code>
                        <p>粉丝</p>
                    </div>
                </div>
                <div>
                    <button
                            v-if="isFollow"
                            class="button is-success button-center is-fullwidth"
                            @click="handleUnFollow(user.id)">已关注
                    </button>

                    <button v-else class="button is-link button-center is-fullwidth" @click="handleFollow(user.id)">
                        关注
                    </button>
                </div>
            </div>
        </el-card>
    </section>
</template>

<script>
    import {follow,isFollow,unfollow} from "../../api/follow";
    import {mapGetters} from 'vuex'

    export default {
        name: "Author",
        props: {
            user: {
                type: Object,
                default: null
            }
        },
        data(){
            return{
                isFollow: false
            }
        },
        mounted() {
            this.fetchInfo()
        },
        computed: {
            ...mapGetters([
                'token'
            ])
        },
        methods: {
            fetchInfo() {
                if(this.token != null && this.token != ''){
                    isFollow(this.user.id).then( response => {
                        const {data} = response
                        // console.log(data)
                        this.isFollow = data.isFollow
                    })
                }
            },
            handleFollow: function (id) {
                if(this.token != null && this.token != ''){
                    follow(id).then(response => {
                        const {message} = response
                        this.$message.success(message)
                        this.isFollow = !this.isFollow
                        this.user.followerCount = parseInt(this.user.followerCount) + 1
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
                    this.user.followerCount = parseInt(this.user.followerCount) - 1
                })
            }
        }
    }
</script>

<style scoped>

</style>