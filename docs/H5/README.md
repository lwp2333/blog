---
title: H5项目基本架构
date: 2020-05-29
---



# 图例:

<img src="https://kumufengchun.oss-cn-hangzhou.aliyuncs.com/H5%281%29.png" style="zoom: 33%;" />

<img src="https://kumufengchun.oss-cn-hangzhou.aliyuncs.com/H5%28loading%29.gif"  />

# 目录结构

```
├─public
│  │  favicon.ico
│  │  index.html
│  │  robots.txt
│  │  
│  └─img
│      └─icons             
├─src
│  │  App.vue
│  │  main.js
│  │  registerServiceWorker.js
│  ├─api
│  │  ├─common
│  │  │      index.js  
│  │  └─user
│  │          index.js     
│  ├─assets
│  │      logo.png
│  ├─common
│  │  └─options
│  │          mavonEditor.js
│  │          tags.js  
│  ├─components
│  │  └─loading
│  │          index.js
│  │          index.vue    
│  ├─layout
│  │  ├─main
│  │  │      index.vue  
│  │  ├─navbarMain
│  │  │      index.vue  
│  │  └─tabbar
│  │          index.vue    
│  ├─router
│  │      index.js
│  ├─store
│  │      index.js
│  ├─style
│  │      common.scss
│  ├─utils
│  │      request.js
│  └─views
│      │  index.vue     
└─static
    └─img
│  .browserslistrc
│  .editorconfig
│  .env.development
│  .env.production
│  .eslintrc.js
│  .gitignore
│  .prettierrc
│  babel.config.js
│  deploy.sh
│  package-lock.json
│  package.json
│  postcss.config.js
│  README.md
│  vue.config.js
```

# 主要使用到vue+ vantui+ axios + vw移动端适配

ps：

内涵以下各类插件的配置与使用

- axios
- mavon-editor
- nprogress
- js-cookie
- dayjs
- 等......

[线上地址]: http://days.lwp.fun

