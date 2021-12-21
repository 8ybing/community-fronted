import request from '../utils/request'

//每日一句js
export function getTodayTip() {
    return request({
        url: '/tip/today',
        method: 'get'
    })
}

//每日一句2
export function getTipsApi() {
    return request({
        url: '/tip/api/dailytip',
        method: 'get'
    })
}