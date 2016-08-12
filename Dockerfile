FROM daocloud.io/library/node:6.2.1

# 创建应用目录
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# 安装应用依赖
COPY package.json /usr/src/app/
RUN npm install -g cnpm --registry=https://registry.npm.taobao.org
RUN cnpm install

# 打包应用文件
COPY . /usr/src/app
EXPOSE  3000
CMD ["npm", "start"]