/**
 * 键帽 3D 侧面组件
 * 渲染键帽的四个侧面，创建 3D 效果
 */

import { darkenColor } from '../../utils';
import { KEYCAP_DEPTH } from '../../constants';

interface Keycap3DSidesProps {
  x: number;
  y: number;
  width: number;
  height: number;
  keycapId: string;
  mainColor: string;
}

export function Keycap3DSides({ x, y, width, height, keycapId, mainColor }: Keycap3DSidesProps) {
  return (
    <>
      {/* 左侧面 - 较亮（面向光源） */}
      <path
        d={`
          M ${x} ${y}
          L ${x - KEYCAP_DEPTH * 0.5} ${y - KEYCAP_DEPTH * 0.5}
          L ${x - KEYCAP_DEPTH * 0.5} ${y + height - KEYCAP_DEPTH * 0.5}
          L ${x} ${y + height}
          Z
        `}
        fill={`url(#leftSide-${keycapId})`}
        opacity={0.9}
      />

      {/* 顶侧面 - 较亮（面向光源） */}
      <path
        d={`
          M ${x} ${y}
          L ${x - KEYCAP_DEPTH * 0.5} ${y - KEYCAP_DEPTH * 0.5}
          L ${x + width - KEYCAP_DEPTH * 0.5} ${y - KEYCAP_DEPTH * 0.5}
          L ${x + width} ${y}
          Z
        `}
        fill={`url(#topSide-${keycapId})`}
        opacity={0.9}
      />

      {/* 右侧面 - 较暗（背离光源） */}
      <path
        d={`
          M ${x + width} ${y}
          L ${x + width + KEYCAP_DEPTH * 0.5} ${y - KEYCAP_DEPTH * 0.5}
          L ${x + width + KEYCAP_DEPTH * 0.5} ${y + height - KEYCAP_DEPTH * 0.5}
          L ${x + width} ${y + height}
          Z
        `}
        fill={`url(#rightSide-${keycapId})`}
        opacity={0.95}
      />

      {/* 底侧面 - 较暗（背离光源） */}
      <path
        d={`
          M ${x} ${y + height}
          L ${x - KEYCAP_DEPTH * 0.5} ${y + height + KEYCAP_DEPTH * 0.5}
          L ${x + width - KEYCAP_DEPTH * 0.5} ${y + height + KEYCAP_DEPTH * 0.5}
          L ${x + width} ${y + height}
          Z
        `}
        fill={`url(#bottomSide-${keycapId})`}
        opacity={0.95}
      />

      {/* 角落连接器增强 3D 效果 */}
      {/* 左上角（最亮） */}
      <polygon
        points={`
          ${x},${y}
          ${x - KEYCAP_DEPTH * 0.5},${y - KEYCAP_DEPTH * 0.5}
          ${x + width - KEYCAP_DEPTH * 0.5},${y - KEYCAP_DEPTH * 0.5}
          ${x + width + KEYCAP_DEPTH * 0.5},${y - KEYCAP_DEPTH * 0.5}
          ${x + width},${y}
        `}
        fill={darkenColor(mainColor, 0.75)}
        opacity={0.3}
      />

      {/* 右下角（最暗） */}
      <polygon
        points={`
          ${x + width},${y + height}
          ${x + width + KEYCAP_DEPTH * 0.5},${y + height - KEYCAP_DEPTH * 0.5}
          ${x + width - KEYCAP_DEPTH * 0.5},${y + height + KEYCAP_DEPTH * 0.5}
          ${x},${y + height}
        `}
        fill="rgba(0, 0, 0, 0.4)"
      />
    </>
  );
}
