<template>
    <article class="media">
        <div class="media-content">
            <form @submit.prevent="onSubmit">
                <b-field>
                    <b-input
                            v-model.lazy="commentText"
                            type="textarea"
                            maxlength="400"
                            placeholder="Add a comment..."
                            :disabled="isLoading"></b-input>
                </b-field>
                <nav class="level">
                    <div class="level-left">
                        <b-button
                                type="is-primary"
                                native-type="submit"
                                class="level-item"
                                :disabled="isLoading">提交
                        </b-button>
                    </div>
                </nav>
            </form>
        </div>
    </article>
</template>

<script>
    import {pushComment} from "../../api/comment";

    export default {
        name: "LvCommentsForm",
        data(){
            return{
                commentText: '',
                isLoading: false
            }
        },
        props: {
            slug: {
                type: String,
                default: null
            }
        },
        methods: {
            async onSubmit(){
                this.loading = true
                try {
                    const postData = {}
                    // console.log(this.commentText)
                    postData.content = this.commentText
                    postData.topic_id = this.slug
                    console.log(postData)
                    await pushComment(postData)
                    this.$emit('loadComments',this.slug)
                    this.$message.success("评论成功！")
                    this.commentText = ''
                }catch (e) {
                    this.$buefy.toast.open({
                        message: `很抱歉，评论失败！. ${e}`,
                    type: 'is-danger'
                    })
                }finally {
                    this.loading = false
                }
            }
        }
    }
</script>

<style scoped>

</style>