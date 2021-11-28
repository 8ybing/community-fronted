import {getToken, removeToken, setToken} from "../../utils/auth";
import { userLogin } from "@/api/auth/auth"
import {getUserInfo, logout} from "../../api/auth/auth";

const state = {
    token: getToken(),
    user: ''
}

const mutations = {
    SET_TOKEN_STATE: (state ,token ) => {
        state.token = token
    },
    SET_USER_STATE: (state,user) => {
        state.user = user
    }
}

const actions = {
    //用户登录
    login({commit},userInfo){
        // console.log(userInfo)
        const {username , pass , rememberMe} = userInfo
        return new Promise((resolve,reject) => {
            userLogin({username: username.trim(),password: pass,rememberMe:rememberMe}).then((response) => {
                const {data} = response
                commit('SET_TOKEN_STATE',data.token)
                setToken(data.token)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    //获取用户信息
    getInfo({ commit,state }){
        return new Promise((resolve,reject) => {
            getUserInfo().then((response) => {
                // console.log(response)
                const {data} = response
                // console.log(data)
                if(!data){
                    commit('SET_TOKEN_STATE','')
                    commit('SET_USER_STATE','')
                    removeToken()
                    resolve()
                    reject('Verification failed,Please login again.')
                }
                commit('SET_USER_STATE',data)
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    },

    //注销
    logout({commit,state}) {
        return new Promise((resolve,reject) => {
            logout(state.token)
                .then((response) => {
                    console.log(response)
                    commit('SET_TOKEN_STATE','')
                    commit('SET_USER_STATE','')
                    removeToken()
                    resolve()
                })
                .catch((error) => {
                    reject(error)
                })
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}