# 如何部署 Mindfulness Growth App 到 Vercel

## 第一步：注册 Vercel 账户
1. 访问 https://vercel.com 并点击 "Sign Up"
2. 使用 GitHub、GitLab 或电子邮件注册账户

## 第二步：安装 Vercel CLI（可选）
```bash
npm i -g vercel
```

## 第三步：登录 Vercel
```bash
npx vercel login
```

## 第四步：部署项目
在项目根目录下运行：
```bash
npx vercel --name deepak_7_laws --public
```

或者如果您已全局安装 Vercel CLI：
```bash
vercel --name deepak_7_laws --public
```

## 注意事项
- 项目已配置好 `vercel.json` 文件，适合静态部署
- 构建命令已在 package.json 中定义为 `vite build`
- 输出目录设置为 `build`
- 项目会在 `deepak_7_laws.vercel.app` 域名下可用

## 替代方案
如果 CLI 部署遇到问题，您也可以：
1. 将代码推送到 GitHub/GitLab 仓库
2. 在 Vercel 控制台导入该仓库进行部署