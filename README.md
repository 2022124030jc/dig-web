## 技术栈

- **前端框架**：Next.js 15.1.7
- **UI 库**：React 19.0.0
- **样式**：TailwindCSS
- **动画**：Framer Motion
- **图标**：Lucide React
- **开发工具**：TypeScript, ESLint
- **构建工具**：Turbopack

## 项目结构

config 中为媒体资源，与页面结构对应

```
dig/
├── app/                 # 应用主目录
│   ├── components/      # 可复用组件
│   ├── (content)/       # 内容页面
│   ├── utils/           # 工具函数
│   ├── fonts.ts         # 字体配置
│   ├── globals.css      # 全局样式
│   ├── layout.tsx       # 主布局组件
│   └── page.tsx         # 首页组件
├── config/              # 配置文件
│   ├── aboutus.json     # 关于我们数据
│   ├── account.json     # 账户数据
│   ├── client.json      # 客户数据
│   ├── creation.json    # 创作数据
│   ├── photography.json # 摄影数据
│   ├── social-media.json# 社交媒体数据
│   └── visual-design.json# 视觉设计数据
├── public/              # 静态资源文件
├── scripts/             # 脚本文件
└── ...                  # 配置文件等
```

## 安装和使用

### 前提条件

- Node.js 18.0.0 或更高版本
- pnpm (推荐) 或 npm

### 安装步骤

1. 克隆仓库

   ```bash
   git clone https://your-repository-url/dig.git
   cd dig
   ```

2. 安装依赖

   ```bash
   pnpm install
   ```

3. 开发环境运行

   ```bash
   pnpm dev
   ```

   应用将在 [http://localhost:3000](http://localhost:3000) 运行

4. 构建生产版本

   ```bash
   pnpm build
   ```

5. 启动生产服务器
   ```bash
   pnpm start
   ```
