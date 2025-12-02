# Vue 前端管理系统

使用 Vite + Vue 3 构建的轻量级运营管理面板示例，包含导航侧边栏、指标卡片、渠道表现、待办任务与订单表格等模块。

## 开发

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build
npm run preview
```

## 后端数据对接

页面启动后会在挂载时通过 `GET /api/dashboard` 拉取仪表盘数据，期望的返回示例：

```json
{
  "cards": [
    { "title": "GMV（今日）", "value": "¥ 1,248,000", "trend": 12.4, "progress": 72 }
  ],
  "channels": [
    { "name": "抖音直播", "desc": "直播带货 + 短视频投放", "value": "¥ 618,000", "trend": 16.8 }
  ],
  "tasks": [
    { "title": "更新首页焦点图", "desc": "配合 12.12 节奏替换素材", "status": "紧急" }
  ],
  "orders": [
    { "id": "#2024120081", "channel": "抖音直播", "amount": 3280, "status": "已完成" }
  ]
}
```

如需自定义接口地址，可在 `src/App.vue` 中调整 `fetch('/api/dashboard')` 的路径。

## AJAX 组件

- `src/components/AjaxProvider.vue` 封装了通用的请求逻辑，挂载后可自动触发接口调用，并通过事件或插槽暴露 `loading`、`error`、`data` 与 `refresh` 方法。
- 在 `App.vue` 中通过 `<AjaxProvider url="/api/dashboard" @success="applyResponse" />` 使用，用于同步后台数据，并在请求失败时可点击“重试”按钮再次发起请求。
