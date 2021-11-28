import request from '../utils/request'

//每日一句js
export function getTodayTip() {
    return request({
        url: '/tip/today',
        method: 'get'
    })

}