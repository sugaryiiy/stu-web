REGISTRY ?= 121.36.61.64:8888
IMAGE ?= stu-web
TAG ?= latest
IMAGE_REF := $(REGISTRY)/$(IMAGE):$(TAG)

.PHONY: build push

build:
	docker build -t $(IMAGE_REF) .

push: build
	docker push $(IMAGE_REF)
