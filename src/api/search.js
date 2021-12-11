import request from '../utils/request'

//搜索功能
export function searchByKeywords(paramsMap) {
    return request({
        url: '/search',
        method: 'get',
        params: {
            keyword: paramsMap.keyword,
            pageNum: paramsMap.pageNum,
            pageSize: paramsMap.pageSize
        }

    })
}