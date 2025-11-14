/**
 * 键帽组件 - 直接按照 CSS 参考实现
 * 参考：/privatedocs/keyboard/keyboard.css
 */

import { motion } from 'motion/react';
import { KeycapData, KeyboardLayout } from '../../core/models';
import { calculateKeycapX, calculateKeycapY, calculateKeycapWidth, calculateKeycapHeight } from '../../utils';
import { brightenColor, darkenColor } from '../../utils/color';

interface KeycapProps {
  keycap: KeycapData;
  isSelected: boolean;
  onClick: (event: React.MouseEvent) => void;
  view3D?: boolean;
  layout: KeyboardLayout;
}

export function KeycapCSS({ keycap, isSelected, onClick, view3D = false, layout }: KeycapProps) {
  const x = calculateKeycapX(keycap.col);
  const y = calculateKeycapY(keycap.row, layout);
  const width = calculateKeycapWidth(keycap.width);
  const height = calculateKeycapHeight(keycap.height);

  const mainColor = keycap.mainColor;

  // 按照 CSS 的精确颜色计算
  const light = brightenColor(mainColor, 0.02);  // lighten 2%
  const mid = darkenColor(mainColor, 0.84);      // darken 16%
  const dark = darkenColor(mainColor, 0.72);     // darken 28%
  const sideColor = darkenColor(mainColor, 0.77); // darken 23%
  const bottomColor = darkenColor(mainColor, 0.65); // darken 35%

  const borderWidth = 3;
  const borderTopWidth = 2;
  const borderBottomWidth = 6;
  const cornerRadius = 8;

  return (
    <motion.g
      onClick={onClick}
      style={{ cursor: 'pointer' }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* 底部大阴影（模拟 box-shadow: 0 0.125em 0 -0.063em rgba(0,0,0,0.5)） */}
      <rect
        x={x + borderWidth}
        y={y + height + borderBottomWidth + 1}
        width={width - borderWidth * 2}
        height={4}
        rx={cornerRadius}
        fill="rgba(0, 0, 0, 0.5)"
        filter="blur(3px)"
      />

      {/* ::before 伪元素 - 3D 侧面层 */}
      <g opacity={0.95}>
        {/* 左侧边 */}
        <rect
          x={x - 1}
          y={y}
          width={1}
          height={height + borderBottomWidth}
          fill={sideColor}
        />

        {/* 右侧边 */}
        <rect
          x={x + width}
          y={y}
          width={1}
          height={height + borderBottomWidth}
          fill={sideColor}
        />

        {/* 底部侧边 */}
        <rect
          x={x - 1}
          y={y + height + borderBottomWidth - 1}
          width={width + 2}
          height={1}
          fill={bottomColor}
        />

        {/* 侧面底部阴影 (box-shadow: 0 4px 4px -3px rgba(0,0,0,0.15)) */}
        <rect
          x={x}
          y={y + height + borderBottomWidth + 1}
          width={width}
          height={3}
          fill="rgba(0, 0, 0, 0.15)"
          filter="blur(2px)"
        />

        {/* 侧面渐变背景 (linear-gradient) */}
        <defs>
          <linearGradient id={`sideGrad-${keycap.id}`} x1="0%" x2="100%">
            <stop offset="0%" stopColor={mainColor} />
            <stop offset="5%" stopColor={darkenColor(mainColor, 0.88)} />
            <stop offset="40%" stopColor="transparent" />
            <stop offset="60%" stopColor="transparent" />
            <stop offset="95%" stopColor={darkenColor(mainColor, 0.88)} />
            <stop offset="100%" stopColor={mainColor} />
          </linearGradient>
        </defs>
        <rect
          x={x}
          y={y}
          width={width}
          height={borderBottomWidth}
          fill={`url(#sideGrad-${keycap.id})`}
          transform={`translate(0, ${height})`}
        />
      </g>

      {/* 主键帽体 - 带边框 */}
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={cornerRadius}
        fill={mainColor}
        stroke={mid}
        strokeWidth={borderWidth}
      />

      {/* 顶部亮边框 (border-top-color: $light) */}
      <line
        x1={x + cornerRadius}
        y1={y}
        x2={x + width - cornerRadius}
        y2={y}
        stroke={light}
        strokeWidth={borderTopWidth}
        strokeLinecap="round"
      />

      {/* 底部暗边框 (border-bottom-color: $dark) */}
      <line
        x1={x + cornerRadius}
        y1={y + height}
        x2={x + width - cornerRadius}
        y2={y + height}
        stroke={dark}
        strokeWidth={borderBottomWidth}
        strokeLinecap="round"
      />

      {/* 顶部负阴影 (box-shadow: 0 -0.125em 0 -0.063em $dark) */}
      <line
        x1={x + cornerRadius}
        y1={y + 2}
        x2={x + width - cornerRadius}
        y2={y + 2}
        stroke={dark}
        strokeWidth={0.5}
        opacity={0.3}
      />

      {/* 文字 */}
      <text
        x={x + width / 2}
        y={y + height / 2}
        textAnchor="middle"
        dominantBaseline="central"
        fill={keycap.textColor}
        fontSize={keycap.fontSize}
        fontFamily={keycap.fontFamily}
        fontWeight={keycap.fontWeight}
        style={{ textTransform: keycap.textTransform as any }}
      >
        {keycap.text}
      </text>

      {/* 选中指示器 */}
      {isSelected && (
        <rect
          x={x - 2}
          y={y - 2}
          width={width + 4}
          height={height + 4}
          rx={cornerRadius + 2}
          fill="none"
          stroke="#06B6D4"
          strokeWidth={2.5}
          filter="drop-shadow(0 0 10px rgba(6, 182, 212, 0.7))"
        />
      )}
    </motion.g>
  );
}
