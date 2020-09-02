---
title: loading动画
date: 2020-05-27
---

## 1.效果

![](https://kumufengchun.oss-cn-hangzhou.aliyuncs.com/H5%28loading%29.gif)



## 2.代码

### 1.index.vue

```vue
<template>
  <transition name="loading-fade">
    <!--loading蒙版-->
    <div v-show="visible" class="loading-mask">
      <!--loading中间的图标-->
      <div class="loading-box">
        <van-image width="64vw" fit="contain" :src="loadingGif" />
        <span>{{ text }}</span>
      </div>
    </div>
  </transition>
</template>

<script>
import loadingGif from '../../../static/img/loading.gif'
export default {
  name: 'Loading',
  data: function() {
    return {
      loadingGif,
      visible: false,
      text: ''
    }
  }
}
</script>
<style lang="scss" scoped>
.loading-mask {
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  .loading-box {
    position: relative;
    display: flex;
    flex-direction: column;
  }
  .loading-box span {
    color: #000;
    font-size: 15px;
    text-align: center;
  }
}
</style>
```

### 2.index.js

使用 Vue.extend 构造器，创建一个“子类” (Loading)

```js
import LoadingComponent from './index.vue'

export default {
  install(Vue, options) {
    /**
     * 使用 Vue.extend 构造器，创建一个“子类” (Loading)。参数是一个包含组件选项的对象(LoadingComponent)。
     * 然后 创建一个 Loading 的实例 Profile 挂载到一个HTMLElement实例上
     */
    const Loading = Vue.extend(LoadingComponent)
    const instance = new Loading({
      el: document.createElement('div')
    })

    // 插入到document.body
    const parent = document.body
    parent.appendChild(instance.$el)
    if (options) {
      instance.text = options.text
    }

    const loadingMethod = {
      show(text) {
        instance.visible = true
        text ? (instance.text = text) : ''
      },
      hide() {
        instance.visible = false
      }
    }
    Vue.prototype.$myLoading = loadingMethod
  }
}
```

ps: 

- install传入vue实例及一个配置options，若实际调用时候` this.$myLoading.show()`没有额外传入加载文字，则默认显示全局的options配置文字
- 向$myLoading中注入两个方法 `show()`， `hide()`用于打开/关闭loading

### 3.挂载到全局main.js

```js
import Vue from 'vue'
import myLoading from './components/loading/index'

Vue.use(myLoading, { text: '加载中...' }) // 配置加载动画文字为： 加载中...
```

## 4.页面中使用

```js
      this.$myLoading.show() // 打开loading
      this.$myLoading.hide() // 关闭loading
```

