<template>
    <div>
        <el-card shadow="never">
            <div slot="header" class="is-clearfix">
                检索到<code>{{search.total}}</code>
                条关于<code class="has-text-info">{{search.keyword}}</code>
                的记录
            </div>
            <div>
                <article v-for="(item,index) in list" :key="index" class="media">
                    <div class="media-left">
                        <figure class="image is-48x48">
<!--                            <img :src="item" style="border-radius: 5px" alt="">-->
                            <img :src="`https://cn.gravatar.com/avatar/${item.userId}?s=164&d=monsterid`" style="border-radius: 5px;">
                        </figure>
                    </div>
                    <div class="media-content">
                        <div>
                            <p class="has-ellipsis">
                                <el-tooltip class="item" effect="dark" :content="1" placement="top">
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
                        </nav>
                    </div>
                </article>
            </div>
            <!--分页-->
            <pagination
                    v-show="search.total > 0"
                    :total="search.total"
                    :page.sync="search.current"
                    :limit.sync="search.pageSize"
                    @pagination="init"
            />
        </el-card>
    </div>
</template>

<script>
    import {searchByKeywords} from "../api/search";
    import Pagination from "../components/Pagination/Index";

    export default {
        name: "Search",
        components: {Pagination},
        data(){
            return{
                list: [],
                search: {
                    keyword: this.$route.query.keyword,
                    pageNum: 1,
                    pageSize: 10,
                    total: 0
                }
            }
        },
        created() {
            this.fetchList()
        },
        methods: {
            fetchList(){
                // alert(1)
                searchByKeywords(this.search).then(response => {
                    const {data} = response
                    console.log(data)
                    this.list = data.records
                    this.search.total = data.total
                })
            }
        }
    }
</script>

<style scoped>

</style>