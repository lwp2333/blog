---
title: utils工具函数等
date: 2020-05-27
---



> 放置各类工具类函数(例如： 数据格式化函数，数据校验函数，正则等)

## auth.js

获取本地cookie

```js
import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token, {
    expires: 7
  })
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

```

