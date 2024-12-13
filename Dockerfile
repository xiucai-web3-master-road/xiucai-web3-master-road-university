# 使用官方 Node.js 镜像，指定版本（例如 22-alpine 版）
FROM node:22-alpine

# 设置构建环境变量，优化构建
ENV NODE_ENV=development
ENV NPM_CONFIG_LOGLEVEL=warn

# 更新软件包列表并安装 Git
RUN apk update && apk add --no-cache git

# 删除现有的 yarn 和 yarnpkg，再重新安装
RUN rm -rf /usr/local/bin/yarn /usr/local/bin/yarnpkg && \
    npm install --registry=https://registry.npmmirror.com -g yarn --force

# 配置yarn registry
RUN yarn config set registry https://registry.npmmirror.com

# 进入工作目录
WORKDIR /app

# 默认命令
CMD ["yarn", "create", "wagmi"]

