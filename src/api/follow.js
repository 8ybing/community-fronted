import request from '../utils/request'

//关注
export function follow(id) {
    return request({
        url: `/relationship/subscribe/${id}`,
        method: 'get'
    })
}

//取消关注
export function unfollow(id) {
    return request({
        url: `/relationship/unsubscribe/${id}`,
        method: 'get'
    })
}

//是否关注
export function isFollow(topicUserId) {
    return request({
        url: `/relationship/validate/${topicUserId}`,
        method: 'get',
    })
}