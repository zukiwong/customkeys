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
      {/* 主阴影 - 延伸到右下方（光源相反方向） */}
      <ellipse
        cx={x + width / 2 + SHADOW_OFFSET_X}
        cy={y + height + KEYCAP_DEPTH + SHADOW_OFFSET_Y}
        rx={width / 2.2}
        ry={7}
        fill="rgba(0, 0, 0, 0.35)"
        filter="blur(8px)"
      />

      {/* 次级柔和阴影增加深度 */}
      <ellipse
        cx={x + width / 2 + SHADOW_OFFSET_X - 1}
        cy={y + height + KEYCAP_DEPTH + SHADOW_OFFSET_Y - 1}
        rx={width / 2.8}
        ry={5}
        fill="rgba(0, 0, 0, 0.2)"
        filter="blur(5px)"
      />
    </>
  );
}
