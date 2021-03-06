module.exports = {
  title: ' ',
  description: '能被Js改写的终将被Js改写！',
  dest: 'public',
  head: [
    [
      'link',
      {
        rel: 'icon',
        href: '/favicon.ico'
      }
    ],
    [
      'meta',
      {
        name: 'viewport',
        content: 'width=device-width,initial-scale=1,user-scalable=no'
      }
    ],
    [
      "meta",
      {
        name: "keywords",
        content: "枯木逢春, lwp.fun, blog.lwp.fun, lwp2333",
      },
    ]
  ],
  theme: 'reco',
  themeConfig: {
    // keyPage: {
    //   keys: ['50b1a8b63b0d5ab55d46c95dcc17577d'], // 1.3.0 版本后需要设置为密文
    //   color: '#42b983', // 登录页动画球的颜色
    //   lineColor: '#42b983' // 登录页动画线的颜色
    // },
    nav: [
      {
        text: '主页',
        link: '/',
        icon: 'reco-home'
      },
      {
        text: '时间轴',
        link: '/timeline/',
        icon: 'reco-date'
      },
      {
        text: '小册',
        icon: 'reco-suggestion',
        items: [
          {
            text: 'h5项目基本架构',
            link: '/docs/H5/'
          }
        ]
      },
      {
        text: '关于我',
        icon: 'reco-message',
        items: [
          {
            text: 'GitHub',
            link: 'https://github.com/lwp2333',
            icon: 'reco-github'
          }
        ]
      }
    ],
    sidebar: {
      '/docs/H5/': ['', 'layouts', 'loading', 'axios', 'utils']
    },
    type: 'blog',
    blogConfig: {
      category: {
        location: 2,
        text: '分类'
      },
      tag: {
        location: 3,
        text: '标签'
      }
    },
    friendLink: [
      // {
      //   title: '',
      //   desc: '',
      //   email: '',
      //   link: ''
      // }
    ],
    logo: '/logo.png',
    search: true,
    searchMaxSuggestions: 10,
    lastUpdated: 'Last Updated',
    author: '枯木逢春',
    authorAvatar: '/avatar.png',
    record: '备案号：赣ICP备18004347号-1',
    recordLink: 'https://beian.miit.gov.cn/',
    startYear: '2019'
  },
  markdown: {
    lineNumbers: true
  }
}
