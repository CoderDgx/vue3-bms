// 1.区分环境变量方式一:
// export const API_BASE_URL = '/dev'
// export const API_BASE_URL = '/prod'

// 2.区分环境变量方式二:
// let baseURL = ''
// if (process.env.NODE_ENV === 'production') {
//   baseURL = '/prod'
// } else if (process.env.NODE_ENV === 'development') {
//   baseURL = '/dev'
// } else {
//   baseURL = '/test'
// }

// 3.区分环境变量方式三: 加载.env文件
export const API_BASE_URL = process.env.VUE_APP_BASE_URL;

export const TIME_OUT = 10000;
