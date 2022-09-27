'use strict'

import Axios from 'axios'

const axios = Axios.create({
    baseURL: `${import.meta.env.VITE_APP_BASE_API}/api/v1`,
    timeout: 8000,
})

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

// 前置拦截器
axios.interceptors.request.use(
    (response) => {
        return response
    },
    (error) => {
        return console.log(error)
    }
)

// 后置拦截器
axios.interceptors.response.use(
    (response) => {
        if (response.data.code !== 200) {
            return console.log(response.data.msg)
        }
        return response.data
    },
    (error) => {
        return console.log('服务器错误，请稍后再试')
    }
)

export default axios
