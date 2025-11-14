/**
 * 键帽阴影组件
 * 渲染键帽的投影效果
 */

import { KEYCAP_DEPTH, SHADOW_OFFSET_X, SHADOW_OFFSET_Y } from '../../constants';

interface KeycapShadowProps {
  x: number;
  y: number;
  width: number;
  height: number;
}

export function KeycapShadow({ x, y, width, height }: KeycapShadowProps) {
  return (
    <>
      {/* 外层大范围柔和阴影 */}
      <ellipse
        cx={x + width / 2 + SHADOW_OFFSET_X}
        cy={y + height + KEYCAP_DEPTH + SHADOW_OFFSET_Y + 2}
        rx={width / 1.8}
        ry={10}
        fill="rgba(0, 0, 0, 0.25)"
        filter="blur(12px)"
      />

      {/* 主阴影 - 延伸到右下方（光源相反方向） */}
      <ellipse
        cx={x + width / 2 + SHADOW_OFFSET_X}
        cy={y + height + KEYCAP_DEPTH + SHADOW_OFFSET_Y}
        rx={width / 2}
        ry={8}
        fill="rgba(0, 0, 0, 0.45)"
        filter="blur(8px)"
      />

      {/* 次级深色阴影增加深度 */}
      <ellipse
        cx={x + width / 2 + SHADOW_OFFSET_X - 1}
        cy={y + height + KEYCAP_DEPTH + SHADOW_OFFSET_Y - 1}
        rx={width / 2.5}
        ry={6}
        fill="rgba(0, 0, 0, 0.3)"
        filter="blur(5px)"
      />

      {/* 内层锐利阴影 - 增强接地感 */}
      <ellipse
        cx={x + width / 2 + SHADOW_OFFSET_X - 2}
        cy={y + height + KEYCAP_DEPTH + SHADOW_OFFSET_Y - 2}
        rx={width / 3}
        ry={4}
        fill="rgba(0, 0, 0, 0.5)"
        filter="blur(3px)"
      />
    </>
  );
}
