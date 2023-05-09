import axios from "axios";
import { ElMessage, ElMessageBox } from 'element-plus'
import { fixedDataType } from "element-plus/es/components/table-v2/src/common";
import router from "../router";
//创建一个axios实例
const $http = axios.create({
  baseURL: "/api",
  // timeout: 30*1000,
  // headers: {'X-Custom-Header': 'foobar'}
});

// 添加请求拦截器
$http.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    config.headers.token = "1234566";
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
$http.interceptors.response.use(
  function (res) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    if (res.data.code === 0 && res.data.msg==="NOTLOGIN") {
      ElMessage.error('请先登录！')
 
      router.push("/")
    } else {
      let data = res.data;
      return data;
    }
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);
export default $http;
