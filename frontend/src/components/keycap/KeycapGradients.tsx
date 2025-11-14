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
  // CSS 参考的精确颜色值
  // $light: lighten($base, 2%)
  // $mid: darken($base, 16%)
  // $dark: darken($base, 28%)
  // 侧面：darken($base, 23%), darken($base, 35%)
  const light = brightenColor(mainColor, 2);
  const mid = darkenColor(mainColor, 16);
  const dark = darkenColor(mainColor, 28);

  return (
    <defs>
      {/* 顶部表面渐变 - CSS: background-color: $base */}
      <linearGradient id={`topGradient-${keycapId}`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={light} />
        <stop offset="50%" stopColor={mainColor} />
        <stop offset="100%" stopColor={mid} />
      </linearGradient>

      {/* 径向高光 - 模拟键帽表面光泽 */}
      <radialGradient id={`radialHighlight-${keycapId}`} cx="35%" cy="30%">
        <stop offset="0%" stopColor="white" stopOpacity={0.4} />
        <stop offset="50%" stopColor="white" stopOpacity={0.15} />
        <stop offset="100%" stopColor="white" stopOpacity={0} />
      </radialGradient>

      {/* 左侧面渐变 - CSS ::before linear-gradient */}
      <linearGradient id={`leftSide-${keycapId}`} x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor={mainColor} />
        <stop offset="5%" stopColor={darkenColor(mainColor, 12)} />
        <stop offset="40%" stopColor="transparent" />
        <stop offset="60%" stopColor="transparent" />
        <stop offset="95%" stopColor={darkenColor(mainColor, 12)} />
        <stop offset="100%" stopColor={mainColor} />
      </linearGradient>

      {/* 顶侧面渐变 - 同左侧面 */}
      <linearGradient id={`topSide-${keycapId}`} x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor={mainColor} />
        <stop offset="5%" stopColor={darkenColor(mainColor, 12)} />
        <stop offset="40%" stopColor="transparent" />
        <stop offset="60%" stopColor="transparent" />
        <stop offset="95%" stopColor={darkenColor(mainColor, 12)} />
        <stop offset="100%" stopColor={mainColor} />
      </linearGradient>

      {/* 右侧面渐变 - CSS: darken($base, 23%) */}
      <linearGradient id={`rightSide-${keycapId}`} x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor={darkenColor(mainColor, 23)} />
        <stop offset="100%" stopColor={darkenColor(mainColor, 28)} />
      </linearGradient>

      {/* 底侧面渐变 - CSS: darken($base, 35%) */}
      <linearGradient id={`bottomSide-${keycapId}`} x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor={darkenColor(mainColor, 28)} />
        <stop offset="100%" stopColor={darkenColor(mainColor, 35)} />
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
