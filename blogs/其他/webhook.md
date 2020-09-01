---
title: centos使用宝塔webhook配合github自动拉取构建项目
date: 2020-1-12
categories:
  - 其他
tags:
  - webhook
---

# 1. centos设置

## 1. 安装添加webhook

![](https://kumufengchun.oss-cn-hangzhou.aliyuncs.com/20200901%20%281%29.png)

![](https://kumufengchun.oss-cn-hangzhou.aliyuncs.com/20200901%20%284%29.png)

## 2. 设置github仓库webhook

![](https://kumufengchun.oss-cn-hangzhou.aliyuncs.com/20200901%20%283%29.png)

![](https://kumufengchun.oss-cn-hangzhou.aliyuncs.com/20200901%20%282%29.png)



ps: 

- url 填写刚刚服务器新建webhook对应的webhook请求地址
- 其中Content type 设置应该选择 application/json格式
- Sercret填写刚刚服务器新建webhook对应的密钥

到此基本工作完成，开始编写shell脚本！！！

## 3. shell 脚本编写

### 1.利用github仓库名称作为webhook的key，达到根据key动态拉取不同项目的效果

```shell
#!/bin/bash
echo ""
export NPM="/www/server/nvm/versions/node/v12.4.0/bin/"
PATH=$PATH:$NPM
export $PATH
#输出当前时间
date --date='0 days ago' "+%Y-%m-%d %H:%M:%S"
echo "-------开始-------"
#判断宝塔WebHook参数是否存在
if [ ! -n "$1" ];
then
echo "param参数错误"
echo "End"
exit
fi
#服务器 git 项目路径
gitPath="/www/wwwroot/$1"
#项目 git 网址
gitHttp="https://github.com/lwp2333/$1.git"


echo "路径：$gitPath"

#判断项目路径是否存在
if [ -d "$gitPath" ]; then
cd $gitPath
#判断是否存在git目录
if [ ! -d ".git" ]; then
echo "在该目录下克隆 git"
git clone $gitHttp gittemp
mv gittemp/.git .
rm -rf gittemp
fi
#拉取最新的项目文件
git reset --hard origin/master
#git clean -f
git pull origin master
echo "拉取完成"
```

ps: 

- 判断key是否存在，根据key生成动态的gitPath（服务器存储项目目录），gitHttp（远程github仓库地址）
- 进入服务器项目地址，并拉取最新远程仓库代码

### 2. 安装项目依赖，打包构建项目

```shell
#执行npm
echo "依赖安装开始"
date --date='0 days ago' "+%Y-%m-%d %H:%M:%S"

npm i

date --date='0 days ago' "+%Y-%m-%d %H:%M:%S"
echo "依赖安装完成"

#执行编译
echo "开始打包"
date --date='0 days ago' "+%Y-%m-%d %H:%M:%S"

npm run build

date --date='0 days ago' "+%Y-%m-%d %H:%M:%S"
echo "打包完成"

#设置目录权限
chown -R www:www $gitPath
echo "-------结束--------"
exit
else
echo "该项目路径不存在"
echo "End"
exit
fi
```

ps: 

由于尝试很多遍shell脚本中无法使用npm 命令，通过以下软链接的办法解决

```shell
export NPM="/www/server/nvm/versions/node/v12.4.0/bin/"
PATH=$PATH:$NPM
export $PATH
```



最后生成的打包的项目在dist目录，指定配置一下网站目录即可😘