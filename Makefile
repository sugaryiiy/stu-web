# 镜像名称和版本
IMAGE_NAME := stu-web
TAG := $(shell date +'%Y%m%d%H%M%S')  # 使用时间戳作为标签
HARBOR_REGISTRY := 121.36.61.64:8888
HARBOR_REPO := $(HARBOR_REGISTRY)/stu/$(IMAGE_NAME)

# 默认目标
all: build push

# 构建 Docker 镜像
build:
	npm run build
	docker build -t $(HARBOR_REPO):$(TAG) --build-arg BUILD_TYPE=build .

# 推送 Docker 镜像到 Harbor
push:
	docker push $(HARBOR_REPO):$(TAG)
	@echo $(HARBOR_REPO):$(TAG)
# 清理本地镜像
clean:
	docker rmi $(HARBOR_REPO):$(TAG)
