# 使用官方的 Nginx 镜像作为基础镜像
FROM 121.36.61.64:8888/common/nginx:alpine

# 复制构建好的静态文件到 Nginx 服务器的默认目录
COPY dist/ /usr/share/nginx/html

# 暴露 Nginx 默认端口 80
EXPOSE 80

# 启动 Nginx
CMD ["nginx", "-g", "daemon off;"]
