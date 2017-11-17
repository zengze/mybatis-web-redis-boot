import TokenUtil from '../common/TokenUtil';
import { message } from 'antd'
export default class Api {
    //static URL= 'http://192.168.100.37:9090/happy_module_userinfo/';
    // static MENU_URL = 'http://localhost:8080/MENU.json';
    static MENU_URL = '/MENU.json';
    static URL = 'http://localhost:8090/';
    static dealy = (flag = false, ms = 3000) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                flag
                    ?
                    resolve(`暂停${ms}`) :
                    reject('连接超时')
            }, ms)
        })
    }
    static calcUrl = (subUrl) => {
        return Api.URL + subUrl;
    }

    // ,"Authorization":TokenUtil.getUserToken()
    static request = (url, { method = 'GET', body, params, credentials = "include", mode = "CORS", headers = { "Content-Type": "application/json", "Authorization": `Bearer ${TokenUtil.getUserToken()}` } } = {}) => {
        let init = { method, headers, credentials };
        if (body)
            init.body = JSON.stringify(body)
        if (params && method === 'GET') {
            let paramsArray = [];
            Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
            if (url.search(/\?/) === -1) {
                url += '?' + paramsArray.join('&')
            } else {
                url += '&' + paramsArray.join('&')
            }
        }
        let myRequest = fetch(url, init)
        return Promise.race([myRequest, Api.dealy()])
            .then(res => res.json())
            .then(json => {
                if (json.code == -1) {
                    message.info('登录超时！请重新登录', 2)
                    window.location.href = '/login'
                } else {
                    return json
                }
            })
            .catch(error => Promise.reject(`执行url ${url}错误 ： 配置${init}`))
            // .then(res => res.ok ? res.json() : Promise.reject(`执行url ${url}错误 ： 配置
            // ${init}`))
    }
}
