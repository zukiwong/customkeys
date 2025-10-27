/**
 * 键帽渐变定义组件
 * 为键帽的不同表面生成 SVG 渐变
 */

import { darkenColor, brightenColor } from '../../utils';

interface KeycapGradientsProps {
  keycapId: string;
  mainColor: string;
}

export function KeycapGradients({ keycapId, mainColor }: KeycapGradientsProps) {
  return (
    <defs>
      {/* 顶部表面渐变 - 从左上（亮）到右下（暗） */}
      <linearGradient id={`topGradient-${keycapId}`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: brightenColor(mainColor, 0.15) }} />
        <stop offset="50%" stopColor={mainColor} />
        <stop offset="100%" style={{ stopColor: darkenColor(mainColor, 0.9) }} />
      </linearGradient>

      {/* 径向高光 - 模拟弧形表面捕捉光线 */}
      <radialGradient id={`radialHighlight-${keycapId}`} cx="35%" cy="35%">
        <stop offset="0%" stopColor="white" stopOpacity={0.35} />
        <stop offset="40%" stopColor="white" stopOpacity={0.15} />
        <stop offset="80%" stopColor="white" stopOpacity={0} />
      </radialGradient>

      {/* 左侧面渐变 - 较亮（面向光源） */}
      <linearGradient id={`leftSide-${keycapId}`} x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor={darkenColor(mainColor, 0.7)} />
        <stop offset="100%" stopColor={darkenColor(mainColor, 0.8)} />
      </linearGradient>

      {/* 顶侧面渐变 - 较亮（面向光源） */}
      <linearGradient id={`topSide-${keycapId}`} x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor={darkenColor(mainColor, 0.7)} />
        <stop offset="100%" stopColor={darkenColor(mainColor, 0.8)} />
      </linearGradient>

      {/* 右侧面渐变 - 较暗（背离光源） */}
      <linearGradient id={`rightSide-${keycapId}`} x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor={darkenColor(mainColor, 0.55)} />
        <stop offset="100%" stopColor={darkenColor(mainColor, 0.65)} />
      </linearGradient>

      {/* 底侧面渐变 - 较暗（背离光源） */}
      <linearGradient id={`bottomSide-${keycapId}`} x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor={darkenColor(mainColor, 0.55)} />
        <stop offset="100%" stopColor={darkenColor(mainColor, 0.65)} />
      </linearGradient>

      {/* 边缘高光 - 受光侧边的微妙亮边 */}
      <linearGradient id={`edgeRim-${keycapId}`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="white" stopOpacity={0.4} />
        <stop offset="100%" stopColor="white" stopOpacity={0} />
      </linearGradient>

      {/* 选中光晕滤镜 */}
      <filter id="selectionGlow">
        <feGaussianBlur stdDeviation="4" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
  );
}
