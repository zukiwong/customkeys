# CustomKeys - 自定义键盘设计工具

一个现代化的 Web 端键盘设计工具，支持 3D 预览、颜色编辑、图片/字体上传。

##  项目结构

```
customkeys/
├── frontend/                  # 前端项目（React + TypeScript + Vite）
│   ├── src/
│   │   ├── core/             # 核心业务层（models, store, services）
│   │   ├── utils/            # 工具函数库
│   │   ├── constants/        # 常量配置
│   │   ├── components/       # UI 组件
│   │   └── App.tsx           # 应用入口
│   ├── vercel.json           # Vercel 部署配置
│   ├── package.json
│   └── vite.config.ts
│
├── backend/                   # 后端项目（暂不需要）
│   └── src/
│
├── docs/                      # 文档
│   ├── ARCHITECTURE.md        # 完整技术架构
│   ├── DEPLOYMENT_PLAN.md     # Vercel 部署方案
│   ├── REFACTOR_COMPLETE.md   # 重构完成总结
│   └── SUMMARY.md             # 项目总结
│
└── README.md                  # 本文件
```


##  核心功能

### 已实现
- ✅ 键盘设计工具（3D 渲染）
- ✅ 三种键盘布局（61/87/104 键）
- ✅ 五种基础样式
- ✅ 颜色选择器
- ✅ 属性编辑面板
- ✅ 多选和批量编辑
- ✅ 样式复制粘贴
- ✅ 本地存储（localStorage）

### 待完成
-  文件上传（图片/字体）
-  导出功能（PNG/SVG/JSON）
-  设计管理界面

##  技术栈

### 前端
- **框架**: React 18 + TypeScript
- **构建**: Vite 6.3
- **状态管理**: Zustand
- **UI 组件**: shadcn/ui + Radix UI
- **样式**: Tailwind CSS v4
- **动画**: Framer Motion

### 部署
- **托管**: Vercel
- **存储**: Vercel Blob (1GB 免费)
- **数据**: localStorage


##  架构亮点

### 1. 清晰的分层架构
```
core/       - 核心业务逻辑（models, store, services）
utils/      - 工具函数库（46+ 个函数）
constants/  - 常量配置
components/ - UI 组件（模块化）
```

### 2. 状态管理
- 使用 Zustand 集中管理所有状态
- 零 Props drilling
- 类型安全

### 3. 组件模块化
- Keycap 组件：413 行 → 7 个子组件
- 单一职责原则
- 易于测试和维护

### 4. 工具函数库
- **颜色工具**: 17 个函数（RGB/HSL/Hex 转换等）
- **键盘工具**: 12 个函数（布局计算、类型识别等）
- **SVG 工具**: 15+ 个函数（渐变、3D 效果等）


## 🔜 Roadmap

### Phase 1: 文件上传（2-3 小时）
- 集成 Vercel Blob
- 图片上传功能
- 字体上传功能

### Phase 2: 导出功能（2-3 小时）
- PNG 导出
- SVG 导出
- JSON 导出/导入

### Phase 3: 设计管理（1-2 小时）
- 设计列表界面
- 加载历史设计
- 设计缩略图


##  开发指南

### 目录说明

**frontend/src/**
```
core/
├── models/         # TypeScript 类型定义
├── store/          # Zustand 状态管理
└── services/       # 业务服务（storage, upload, export）

utils/
├── color.ts        # 颜色处理工具
├── keyboard.ts     # 键盘工具
└── svg.ts          # SVG 渲染工具

constants/
└── keyboard.ts     # 键盘相关常量

components/
├── keycap/         # 键帽组件（7 个子组件）
├── common/         # 通用组件（颜色选择器等）
├── workspace/      # 工作区组件
├── layout/         # 布局组件
├── panels/         # 面板组件
└── ui/             # shadcn UI 组件库
```

### 使用 Store

```typescript
import { useKeyboardStore } from './core/store';

function MyComponent() {
  // 获取状态
  const keycaps = useKeyboardStore(state => state.keycaps);

  // 获取方法
  const updateKeycap = useKeyboardStore(state => state.updateKeycap);

  // 使用
  updateKeycap('key-1', { mainColor: '#FF0000' });
}
```

### 使用工具函数

```typescript
import { darkenColor, getKeyType } from './utils';

const darker = darkenColor('#FF5733', 0.8);
const type = getKeyType('A'); // 'letter'
```

##  贡献

欢迎提交 Issue 和 Pull Request！

##  License

MIT

---

**项目状态**: ✅ 前端重构完成，可部署上线

**下一步**: 添加文件上传和导出功能，然后部署到 Vercel
