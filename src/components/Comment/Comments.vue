<template>
    <section class="box comments">
        <h3 class="title is-5 mt-4">评论区</h3>
        <hr>
        <lv-comments-form :slug="slug" v-if="token" @loadComments="fetchComments"></lv-comments-form>
        <lv-comments-item
                v-for="comment in comments"
                :key="comment.id"
                :comment="comment">
        </lv-comments-item>
    </section>
</template>

<script>
    import {mapGetters} from 'vuex'
    import LvCommentsItem from './CommentsItem'
    import LvCommentsForm from './CommentForm'
    import {fetchCommentByTopicId} from "../../api/comment";

    export default {
        name: "LvComments",
        components: {
            LvCommentsItem,LvCommentsForm
        },
        data(){
            return{
                comments: []
            }
        },
        props: {
            slug: {
                type: String,
                default: null
            }
        },
        computed: {
          ...mapGetters([
              'token'
          ])
        },
        async mounted() {
            await this.fetchComments(this.slug)
        },
        methods: {
            //初始化
            async fetchComments(topic_id){
                // console.log(topic_id)
                fetchCommentByTopicId(topic_id).then(response => {
                    const {data} = response
                    // console.log(data)
                    this.comments = data
                })
            }
        }
    }
</script>

<style scoped>

</style>