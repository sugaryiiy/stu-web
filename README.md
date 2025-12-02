# Vue 前端管理系统

使用 Vite + Vue 3 构建的轻量级运营管理面板示例，包含导航侧边栏、指标卡片、渠道表现、待办任务、订单表格等模块，并内置美化的输入框、下拉框与表格组件方便复用。

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

如需自定义接口地址，可在 `src/views/Overview/OverviewPage.vue` 中调整 `request({ url: '/api/dashboard' })` 的路径。

## 页面结构

- `src/views/Overview/OverviewPage.vue`：总览页（含接口数据拉取、指标卡片、渠道、待办、订单表格）。
- `src/views/Orders/OrdersPage.vue`：订单中心，带搜索/筛选（下拉框、文本框）与自定义表格展示近期订单。
- `src/views/Users/UsersPage.vue`：用户管理占位页，预留导出与新增按钮。
- `src/views/Settings/SettingsPage.vue`：系统设置占位页，预留保存按钮。
- `src/App.vue`：挂载侧边栏、顶部栏，并按导航切换上述页面组件。

### UI 组件

- `src/components/ui/UiTextField.vue`：带标签、前缀与提示文案的文本框。
- `src/components/ui/UiSelect.vue`：支持占位、点击外部收起的下拉框。
- `src/components/ui/UiTable.vue`：带标题、子标题与可插槽渲染单元格的通用表格。

## 请求封装

- `src/request/request.js` 提供了统一的请求方法，默认使用 `GET` 并对 JSON 请求体和接口异常进行封装。
- 总览页通过 `request({ url: '/api/dashboard' })` 拉取仪表盘数据，若请求失败会在页面顶部显示错误提示并提供“重试”按钮。
