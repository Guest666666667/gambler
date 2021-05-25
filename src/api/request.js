import axios from 'axios';

// 创建axios实例
const service = axios.create({
    baseURL: process.env.API_ROOT, // api 的 base_url
    //withCredentials: true,
    timeout: 10 * 60 * 1000, // 请求超时时间
    headers: {
        //'Content-Type': 'application/json'
        'Content-Type': 'application/x-www-form-urlencoded'
    }
});
//获取用户信息
const getUserInfo = function (params) {
    return service({
        url: 'http://121.36.45.228:8080/gambling/userInfo',
        method: 'post',
        data: params
    });
}
//获取游戏结果
const getGameResult = function (params) {
    return service({
        url: 'http://121.36.45.228:8080/gambling/gameResult',
        method: 'post',
        data: params
    });
}
export default {
    getUserInfo,
    getGameResult
}