# 在本地部署到 Vercel 的完整步骤

## 第一步：安装 Vercel CLI
```bash
npm i -g vercel
```

## 第二步：登录 Vercel 账户
```bash
vercel login
```
这会打开浏览器让您登录 Vercel 账户

## 第三步：部署项目
在项目根目录下运行以下命令：
```bash
vercel --name deepak_7_laws --public
```

## 或者使用 npx（无需全局安装）
```bash
cd /Users/johnson/Desktop/网龙-AI教育/客户项目demo/Deepak/Mindfulness Growth App
npx vercel --name deepak_7_laws --public
```

## 注意事项：
- 项目已经配置了 vercel.json 文件，适合直接部署
- 项目构建成功，输出目录为 build/
- --public 标志表示项目为公开访问
- 部署完成后，您会获得一个类似 https://deepak_7_laws.vercel.app 的 URL

## 如果遇到问题：
1. 确认项目名称 deepak_7_laws 是否已被占用
2. 可以尝试使用不同的项目名称
3. 或者使用 GitHub 集成方式部署：
   - 将代码推送至 GitHub 仓库
   - 在 Vercel 仪表板中导入仓库
   - Vercel 会自动检测构建设置并部署