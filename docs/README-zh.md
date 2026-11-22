# 个人网站使用说明

网站使用 Eleventy 将 Markdown 和共享模板生成静态 HTML。构建只需要 Node.js 和 npm，不再需要 Ruby、Bundler、Jekyll 或 Sass 编译器。

## 本地预览

安装 Node.js 22 或更新版本；如果使用 nvm，可以运行 `nvm use` 读取仓库的 `.nvmrc`。首次克隆后，在仓库根目录安装依赖：

```bash
npm ci
```

以后每次修改网站，只需一条命令：

```bash
npm run dev
```

打开 **http://localhost:4000**。保存 Markdown、模板、站点数据、CSS 或静态资源后，预览会自动更新。按 `Ctrl+C` 停止。更新 `package-lock.json` 后需重新运行 `npm ci`。

构建及检查命令：

```bash
npm run build
npm run check
```

第一条清空并重新生成 `dist/`，避免已删除页面残留在部署结果中；第二条在当前本地工作区中构建并检查 HTML、共享布局、站内链接、锚点、重定向和资源路径。`tests/` 仅保留在本地，不提交到 Git，因此新克隆的仓库使用 `npm run build`；`npm run check` 需要本地测试文件。依赖、构建产物、测试报告和 `Summary/` 也不提交到 Git。

## 文件与修改位置

| 文件或目录 | 用途 |
| --- | --- |
| `_pages/about.md` | 首页正文，对应 `/` |
| `_pages/research.md` | Research 正文，对应 `/research/` |
| `_data/site.json` | 姓名、头像、邮箱及网站元数据 |
| `_data/navigation.json` | 所有页面共用的导航 |
| `_includes/base.njk` | 所有内容页共用的 HTML 和布局 |
| `_includes/navigation.njk`、`_includes/profile.njk` | 导航与作者侧栏 |
| `assets/css/site.css` | 桌面与手机端共用样式 |
| `images/`、`files/` | 图片、图标、简历 PDF |
| `eleventy.config.js` | 页面生成、资源复制和旧网址重定向 |
| `tests/site.test.js` | 仅本地保留的回归检查，不提交到 Git |

新增页面时，在 `_pages/` 下创建 Markdown 文件即可，例如：

```markdown
---
title: "Example"
permalink: /example/
---

# Example
```

共享布局会自动生效；如需导航入口，在 `_data/navigation.json` 中添加链接。站内资源使用 `/images/example.png` 这类以 `/` 开头的路径，避免子页查找资源时使用错误目录。

首页的 `redirect_from` 字段继续生成 `/about/` 和 `/about.html`，自动跳转至首页，并保留查询参数和锚点。首页和 Research 原有 Markdown 文件、图片及简历 PDF 在本次迁移中保持原样。首页里未使用的 Liquid 引用统计 URL 赋值仍可被解析，不影响渲染。

## 部署到 GitHub Pages

在仓库 **Settings → Pages → Build and deployment** 中，将 **Source** 设为 **GitHub Actions**。这是启用[自定义构建工作流](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)所需的一次性设置。

请勿保留 **Deploy from a branch**：它会启动 GitHub 自带的旧 Jekyll 工作流，即使两套工作流都成功，也可能将 README 页面覆盖到 Eleventy 网站上。新部署任务会检查发布来源，设置不正确时停止并显示设置链接。切换来源后，在仓库 Actions 页面选择 **Build and deploy website → Run workflow**，重新发布完整网站。

`.github/workflows/pages.yml` 在推送到 `main` 时，依次执行依赖安装、`npm run build`、上传 `dist/`、部署。Pull request 只构建，不发布。本地测试不上传，也不在 GitHub Actions 中执行。网站地址继续使用 **https://naonaozhong.github.io**。本地预览无需提交或推送。

旧的 Ruby 构建配置、Sass vendor、jQuery 插件和定时 Scholar 工作流已经移除。`google_scholar_crawler/` 作为独立的可选 Python 工具保留，不参与网站安装、构建和部署。

## 来源

原网站基于 [AcadHomepage](https://github.com/RayeRen/acad-homepage.github.io)，参考了 [Minimal Mistakes](https://github.com/mmistakes/minimal-mistakes) 与 [Academic Pages](https://github.com/academicpages/academicpages.github.io)。许可证见仓库根目录 `LICENSE`。
