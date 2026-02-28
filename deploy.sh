#!/bin/bash
# 正确的 Vercel 部署脚本

# 第一步：确保代码是最新的
npm run build

# 第二步：进入构建输出目录
cd build

# 第三步：使用 npx 部署（推荐方式）
# 注意：在实际环境中，您需要先登录一次
# npx vercel login

# 然后部署到生产环境
npx vercel --prod

# 如果是首次部署，Vercel 会询问一些设置问题：
# - Set up and deploy? 输入: y
# - Link to existing project? 输入: N (如果是新项目)
# - 项目名称: 输入: deepak-7-laws (或其他喜欢的名字)
# - 是否为私有项目?: 选择: Public (对应 --public 标志)

# 部署成功后，您将获得一个形如:
# https://deepak-7-laws.vercel.app
# 的 URL