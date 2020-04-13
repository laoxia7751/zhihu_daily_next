import axios from 'axios'
import { Toast } from 'antd-mobile'

const configAxios = axios.create({
    baseURL: 'https://v1.alapi.cn/api/',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    timeout: 60000
});

// 请求拦截
configAxios.interceptors.request.use((config) => {
    return config
}, (error) => {
    return Promise.reject(error)
})

//响应拦截器
configAxios.interceptors.response.use((response) => {
    return response.data.data || response.data
}, (error) => {
    console.log(error.statusText);
    //Toast.info(error)
    return Promise.reject(error)
})

//获取最新消息
export const getLatest = () => {
    return configAxios.get('zhihu/latest')
}

/**
 * 获取过往消息
 * @param {Number} date 20191225
 */
export const getBeforeNews = (date) => {
    return configAxios.get('zhihu/before?date=' + date)
}

//消息内容获取与离线下载
export const getNewsDetails = (id) => {
    return configAxios.get(`zhihu/news?id=${id}`)
}

/**
 * 获取新闻额外消息(赞，评论)
 * @param {Number} id 
 */
export const getNewsExtra = (id) => {
    return configAxios.get('http://news-at.zhihu.com/api/4/story-extra/' + id)
}

/**
 * 获取新闻对应长评论
 * @param {Number} id 
 */
export const getLongComments = id => {
    return configAxios.get(`zhihu/long_comments?id=${id}`)
}

/**
 * 获取新闻对应短评论
 * @param {Number} id 
 */
export const getShortComments = id => {
    return configAxios.get(`zhihu/short_comments?id=${id}`)
}