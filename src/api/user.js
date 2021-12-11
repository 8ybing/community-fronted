import request from '../utils/request'

//获取个人信息以及账户下的帖子信息
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