import axios from 'axios'
import { Video } from '@/model/resources'

export const API_BASE_URL = process.env.VUE_APP_API_BASE_URL

axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    let data = response.data
    if (data.code === 0) {
        return data.data
    } else {
        Promise.reject(new Error(data.msg))
    }
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});

/**
 * 获取所有资源
 */
export function resources(): Promise<Video[]> {
    return axios.get(API_BASE_URL + '/resources')
}

/**
 * 文件地址
 * @param path 路径
 */
export function content(path: string): string {
    return `${API_BASE_URL}/content?path=${path}`
}