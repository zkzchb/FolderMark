# 子路径部署

FolderMark 默认部署在站点根路径 `/`。如需把同一份静态站点部署到反向代理或静态服务器的子路径，可以在构建时设置：

```bash
FOLDERMARK_BASE_PATH=/Citation/ npm run build
```

`FOLDERMARK_BASE_PATH` 必须表示 URL 路径。前导和尾随 `/` 会自动规范化，因此 `/Citation`、`Citation/` 与 `/Citation/` 的效果一致。

构建完成后，`dist/` 可以直接发布到对应子路径。FolderMark 会同时处理：

- Vite 生成的 JS/CSS 静态资源路径；
- SPA 路由对部署前缀的剥离；
- `/_content/` 内容 JSON 请求；
- `/_files/` 本地附件；
- 目录索引中的内部链接；
- 重复 ID 生成的跳转链接；
- Markdown 正文中的站内绝对路径链接和图片。

例如 Caddy：

```caddy
handle_path /Citation/* {
    root * /srv/pds-web/Citation
    try_files {path} /index.html
    file_server
}
```

对应构建：

```bash
FOLDERMARK_MARKDOWN_ROOT=/opt/pds-web/sources/Citation \
FOLDERMARK_BASE_PATH=/Citation/ \
npm run build
```

默认不设置 `FOLDERMARK_BASE_PATH` 时仍使用 `/`，因此现有 Cloudflare Workers 根路径部署不受影响。
