import request from '../utils/request'

//获取文章评论
export function fetchCommentByTopicId(id) {
    return request({
        url: '/comment/get_comments',
        method: 'get',
        params: {
            topicid: id
        }
    })
}

//添加评论功能
export function pushComment(data) {
    return request({
        url: '/comment/add_comment',
        method: 'post',
        data: data

    })
}