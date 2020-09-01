---
title: Vue项目代码整体规范及风格
date: 2019-12-28
categories:
  - 其他
tags:
  - vue
---

# 代码基本规范

## 1.代码风格

- 等号运算符

  ```js
  const a = 1
  const b = '1'
  const bool = a === b ?: 'yes': 'no'
  const bool = a !== b ?: 'yes': 'no'
  ```

- 换行符及缩进
  换行符使用： LF，2 个空格作为缩进

- v-for 循环渲染，绑定 key 且，v-if 不和 v-for 在同一行（节点）

- 删除多余的 console.log

- vue 中变量命名小驼峰命名法，节点样式 class 中划线命名

  ```js
  // js
  const userName = '鲁班'
  ```

  ```html
  <!-- template -->
  <div class="boxCard">
    <div class="boxCard—item">
      <div class="boxCard-item-top">
        <span class="title">党建活动</span>
        <el-divider></el-divider>
      </div>
    </div>
  </div>
  ```

- 在控制语句（if、else、while 等）的小括号前放一个空格，使用空格把运算符隔开，不要在圆括号内加空格，不要在中括号内添加空格，在大括号内添加空格

  ```js
  // if、else、while 等的小括号前放一个空格
  if (item) {
    return item.label
  } else {
    return ''
  }

  // 空格隔开运算符
  const x = y + 5

  // 不在圆括号内加空格
  function bar(foo) {
    return foo
  }

  // 不在中括号内加空格
  const foo = [1, 2, 3]

  // 在大括号内加空格
  const foo = { clark: 'kent' }
  ```

- 特定规则逻辑，写清注释，多行/_ 注释： _/， 单行：// 注释，（且内容前面需要有空格）

  ```js
  // 不在中括号内加空格
  const foo = [1, 2, 3]

  computed: {
      /**
       *  附件列表（除png，jpg图片文件）
       */
      fileList: function() {
        if (this.policeInfo.fileList && this.policeInfo.fileList.length > 0) {
          const arr = this.policeInfo.fileList.filter(item => {
            return item.ext !== 'png' && item.ext !== 'jpg'
          })
          return arr
        } else {
          return []
        }
      }
    },
  ```

  ## 2.关于 axios 拦截

  ### 1.响应拦截

- 响应拦截，code 为 0000 时，统一 reslove(res.data) , 接口.then(res), res 就为我们真正关心的数据对象
- code 为 9999 时，统一 reject(res.msg)， 统一提示信息为服务器异常
- code 为 0001 时，统一 reject (res.msg)，提示接口返回的 res.msg 信息

ps： 调用接口时，不必要在逻辑代码中每次去判断 code 为 0000，再去拿 res.data。可用直接使用.then(res=>{/_代码逻辑_/})处理必须带有 loading 效果的列表接口时，需要在 catch 中捕获异常，来关闭 loading

```js
    initData: async function() {
      this.loading = true
      const res = await queryPolicyMarketByPage(this.search).catch(() => {
        this.loading = false
      })
      this.policyList = res.results || []
      this.total = res.totalRecord
      this.loading = false
    },
```

## 3.prettier 格式化代码基本配置

```json
{
  "semi": false, // js逻辑不使用分号
  "singleQuote": true, // 使用单引号
  "printWidth": 120,
  "arrowParens": "avoid",
  "trailingComma": "none",
  "endOfLine": "lf",
  "overrides": [
    {
      "files": ".prettierrc",
      "options": {
        "parser": "json"
      }
    }
  ]
}
```

## 4.scss 规范

- 嵌套需要配合 BEM 使用

- - Element 平铺嵌套在 Block 中
  - Modifier 平铺嵌套在 Block 或 Element 中

- 顺序

- - 变量声明
  - Placeholder Class 声明
  - Mixins 声明
  - 自身属性(如果下面有其他选择器 则空一行)
  - Element
  - Modifier

多处使用的变量 / Mixins / 占位符类需要根据作用域范围放置在相应位置中(全局/模块/块/元素)中

#### 示例

```scss
$lightColor: '#fff';
$darkColor: '#000';

%h2 {
  font-size: 20px;
  font-weight: bold;
}

@mixin flex($direction: row) {
  display: flex;
  flex-direction: $direction;
}

.article {
  @include flex(row);

  &-title {
    @extend %h2;
  }
  &-content {
    font-size: 12px;
    line-height: 1.5;

    &-light {
      color: $lightColor;
    }
    &-dark {
      color: $darkColor;
    }
  }
}
```

## 5.关于经常使用到的表格页面

### 1.动态定位在页面右下的分页（tableHeight 的 mixins）

```js
export const tableHeight = topHeight => {
  return {
    data: function() {
      return {
        windowHeight: 0
      }
    },
    mounted: function() {
      this.$nextTick(() => {
        this.windowHeight = window.innerHeight
        window.addEventListener('resize', this.tableHeightCallback)
      })
    },
    computed: {
      tableHeight: function() {
        return this.windowHeight - topHeight
      }
    },
    destroyed: function() {
      window.removeEventListener('resize', this.tableHeightCallback)
    },
    methods: {
      tableHeightCallback: function() {
        this.windowHeight = window.innerHeight
      }
    }
  }
}
```

### 2.配合样式使用

```vue
<!--  template -->
<div class="list" v-loading="loading">
  <el-table :data="tableData" class="scroll-div" :height="tableHeight">
    <!-- ..... -->
    <div slot="empty" class="noData">
      <div class="noData-img"></div>
    </div>
  </el-table>
  <div class="pagination-container">
    <el-pagination
      background
      :current-page.sync="search.pageNum"
      :page-sizes="[10, 20, 30]"
      :page-size.sync="search.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="initData"
      @current-change="initData"
    >
    </el-pagination>
  </div>
</div>
```

```vue
<script>
import { tableHeight } from '@/mixins'
export default {
  name: 'FeedBack',
  mixins: [tableHeight(360)]
  // ...
}
</script>
<style lang="scss" scoped>
@import '~@/styles/mjCommon.scss';
.el-card {
  width: 100%;
  height: 100%;
}
</style>
-->
```

##### ps: pagination-container,scroll-div 为 mjCommon.scss 公共样式

另外推荐 visual studio code 必备插件

- Auto Close Tag
- Auto Rename Tag
- Code Runner
- one Dark pro
- vscode-element-helper
- ESLint
- GitLens
- Image preview
- Import Cost
- Path Intellisense
- Prettier
- Settings Sync
- Vetur
- vscode-icons
