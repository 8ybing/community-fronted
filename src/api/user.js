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
        url: '/ums/user/update',
        method: 'post',
        data: user
    })
}

//修改用户密码
export function modifyPass(paramsMap) {
    return request({
        url: '/ums/user/updatepass',
        method: 'post',
        params: {
            id: paramsMap.id,
            oldPass: paramsMap.oldPass,
            newPass: paramsMap.newPass
        }
    })
}

//修改用户头像
export function changeAvatar(formdata) {
    return request({
        url: '/ums/user/updateImage',
        method: 'post',
        headers: {'Content-Type': 'multipart/form-data'},
        data: formdata,
    })
}