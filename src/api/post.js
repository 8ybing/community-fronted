import request from '../utils/request'

//列表
export function getArticleList(pageNo,size,tab) {
    return request({
        url: '/post/list',
        method: 'get',
        params: {pageNo: pageNo,size: size,tab: tab}
    })
}

//发帖
export function post(topic) {
    return request({
        url: '/post/create',
        method: 'post',
        data: topic
    })
}

//帖子详情、浏览
export function getTopicDetail(id) {
    return request({
        url: `/post`,
        method: 'get',
        params: {
            id: id
        }
    })

}