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

#执行npm
#echo "依赖安装开始"
#date --date='0 days ago' "+%Y-%m-%d %H:%M:%S"

#npm i

#date --date='0 days ago' "+%Y-%m-%d %H:%M:%S"
#echo "依赖安装完成"

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