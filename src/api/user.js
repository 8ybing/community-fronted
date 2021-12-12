import request from '../utils/request'

//获取用户信息以及用户的帖子信息
export function getUserInfoByName(username,pageNum,pageSize) {
    return request({
        url: '/ums/user/' + username,
        method: 'get',
        params: {
            //文章分页信息
            pageNum: pageNum,
            pageSize: pageSize
        }
    })
}

//更新用户信息
export function updateUserInfo(user) {
    return request({
        url: '/ums/user/updateUserInfo',
        method: 'post',
        data: user
    })
}