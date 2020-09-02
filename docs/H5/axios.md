---
title: axios封装
date: 2020-05-29
---



目录：`api/request.js`

## 1. 引入及创建axios 实例

```js
import axios from 'axios'
import { Notify } from 'vant'
import { getToken } from '@/utils/auth'
Notify.setDefaultOptions({
  duration: 2200
})

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  withCredentials: false,
  timeout: 6000
})
```

- baseURL 指定为项目当前运行环境的VUE_APP_BASE_API
- 超时设置6000ms

## 2. 设置请求前拦截

```js
// 请求前拦截
service.interceptors.request.use(
  config => {
    if (getToken()) {
      config.headers['Authorization'] = 'Bearer ' + getToken()
      // config.headers['token'] = getToken()
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
```

- 若当前含有token 则请求带入token

## 3. 设置响应拦截

提前和后端沟通好统一规范，确定返回的res.data.code 各代表什么意思

此后端为自己搭建的eggjs 的后端服务，code 的意义如下：

- `code：200`   请求成功
- `code：201`、`code: 203`  修改、删除数据成功
- `code：202`、`code: 204`   修改、删除数据失败
- `code：301`  未知的接口错误
- `code：302` 接口请求参数缺少导致错误

```js
const successRes = res => {
  // 接口请求成功
  return res.data.data
}
const successChange = res => {
  // 删除，修改记录成功
  Notify({
    type: 'success',
    message: res.data.message
  })
  return res.data.data
}
const warning = res => {
  // 请求失败，字段缺失
  Notify({
    type: 'warning',
    message: res.data.message
  })
  return Promise.reject(res.data.message)
}
const danger = res => {
  // 请求失败，原因message
  Notify({
    type: 'danger',
    message: res.data.message
  })
  return Promise.reject(res.data.message)
}

// 响应拦截
service.interceptors.response.use(
  res => {
    switch (res.data.code) {
      case 200:
        return successRes(res)
      case 201 || 203:
        return successChange(res)
      case 202 || 204:
        return danger(res)
      case 301:
        return danger(res)
      case 302:
        return warning(res)
      default:
        break
    }
  },
  err => {
    danger(err)
  }
)
```

## 4. 文件下载处理

```js
service.download = async (url, params) => {
  // 下载二进制文件
  const fullUrl = process.env.VUE_APP_BASE_API + url
  const res = await axios.get(fullUrl, { params, responseType: 'blob' })
  // 保存文件
  const { fileName } = params
  if (!res.data) {
    Notify({
      type: 'danger',
      message: '文件下载失败'
    })
    return
  }
  if (window.navigator.msSaveBlob) {
    navigator.msSaveBlob(res.data, fileName)
    return
  }
  // 处理兼容IE
  let blobUrl = window.URL.createObjectURL(res.data)
  let link = document.createElement('a')
  link.download = blobUrl
  link.click()
  window.URL.revokeObjectURL(blobUrl)
}
```

```js
// 最后向外默认暴露
export default service
```

ps: 

- 挂载service.download 属性，接受两个参数，文件下载url地址和参数
- 指定接口数据返回类型为blob
- 利用浏览器API将blob数据保存为文件
- 处理兼容，利用blob文件生成本地blob 的url，利用a标签下载

## 5. 页面中使用

### 1.接口函数

在api文件夹下新建各类业务页面命名的文件夹及index文件，类如`api/user/index.js`， 再编写接口调用函数

```js
import request from '../request'

/** 获取人员分页列表*/
export function getUserListByPage(params) {
  return request({
    url: 'getUserListByPage',
    method: 'get',
    params
  })
}
```

### 2. 页面使用

引入：

```
import { getUserListByPage } from '@/api/user'
```

调用：

```js
import { getUserListByPage } from '@/api/user'
export default {
  name: 'UserList',
  data: function() {
    return {
      pageInfo: {
        pageNum: 1,
        pageSize: 5
      },
      recordInfo: {
        totalPage: 0,
        totalRecord: 0
      },
      loading: false,
      finished: false,
      list: []
    }
  },
  created: function() {
    this.onLoad()
  }
  methods: {
    onLoad: async function() {
      this.loading = true
      const res = await getUserListByPage(this.pageInfo).catch(() => {
        this.loading = false
      })
      this.loading = false
      if (res) {
        const { pageNum, pageSize, list, totalPage, totalRecord } = res
        this.list.push(...list)
        this.recordInfo = {
          totalPage,
          totalRecord
        }
        // 判断是否到底，否则页码++
        if (totalPage > pageNum) {
          this.pageInfo.pageNum++
        } else {
          // 到底
          this.finished = true
        }
      }
    }
  }
}

```



> 经过这样的配置在实际业务中，前端只需关系真的的数据，不需要编写具体的接口提示代码
>
> 而且在code 200 时候，axios返回的是res.data.data , 前端可以直接在接口调用的时候`.then((res)=>{})`，此时res才是前端真正关系的数据

