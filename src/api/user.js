import request from '@/utils/request'

export function getUserList() {
    return request({
        url: '/user/list',
        method: 'get'
    })
}

export function login(data) {
    return request({
        url: '/user/login',
        method: 'post',
        data
    })
}
