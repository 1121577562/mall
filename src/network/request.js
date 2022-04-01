import axios from "axios";

export function request(config) {
    //1.创建 axios的实例
    const instance = axios.create({
        baseURL: "http://127.0.0.1:3000",
        timeout: 5000
    });

    //2.设置请求和响应拦截器
    instance.interceptors.request.use((config) => {
        return config;
    }, (err) => {
        console.log(err);
    });

    instance.interceptors.response.use((result) => {
        return result.data;
    }, (err) => {
        console.log(err);
    });

    // 3.发送真正的网络请求 (axios实例本身返回的就是一个promise实例)
    return instance(config);
}