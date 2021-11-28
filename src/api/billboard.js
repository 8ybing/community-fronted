import request from '../utils/request'

//公告板js
export function getBillBoard() {
    return request({
        url: '/billboard/show',
        method: 'get'
    })

}