/**
 * 真实感键帽组件 - 参考真实机械键盘
 * 目标：让 SVG 看起来像真实的塑料键帽
 */

import { motion } from 'motion/react';
import { KeycapData, KeyboardLayout } from '../../core/models';
import { calculateKeycapX, calculateKeycapY, calculateKeycapWidth, calculateKeycapHeight } from '../../utils';
import { brightenColor, darkenColor } from '../../utils/color';
import { KEYCAP_DEPTH } from '../../constants';

interface KeycapProps {
  keycap: KeycapData;
  isSelected: boolean;
  onClick: (event: React.MouseEvent) => void;
  view3D?: boolean;
  layout: KeyboardLayout;
}

export function KeycapRealistic({ keycap, isSelected, onClick, layout }: KeycapProps) {
  const x = calculateKeycapX(keycap.col);
  const y = calculateKeycapY(keycap.row, layout);
  const width = calculateKeycapWidth(keycap.width);
  const height = calculateKeycapHeight(keycap.height);

  const mainColor = keycap.mainColor;

  // SASS 兼容颜色
  const light = brightenColor(mainColor, 2);      // +2%
  const mid = darkenColor(mainColor, 16);         // -16%
  const dark = darkenColor(mainColor, 28);        // -28%
  const sideDark = darkenColor(mainColor, 23);    // -23%
  const bottomDark = darkenColor(mainColor, 35);  // -35%

  const cornerRadius = 8;
  const borderWidth = 3;

  return (
    <motion.g
      onClick={onClick}
      style={{ cursor: 'pointer' }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* ========== 第1层：3D 底部侧面（darken 35%）========== */}
      <rect
        x={x + 2}
        y={y + height + 2}
        width={width - 4}
        height={KEYCAP_DEPTH}
        rx={cornerRadius - 2}
        fill={bottomDark}
        opacity={0.95}
      />

      {/* ========== 第3层：3D 左右侧面（darken 23%）========== */}
      {/* 左侧面 */}
      <rect
        x={x}
        y={y + 2}
        width={4}
        height={height + KEYCAP_DEPTH - 2}
        fill={sideDark}
        opacity={0.9}
      />

      {/* 右侧面 */}
      <rect
        x={x + width - 4}
        y={y + 2}
        width={4}
        height={height + KEYCAP_DEPTH - 2}
        fill={sideDark}
        opacity={0.9}
      />

      {/* ========== 第4层：主体边框（darken 16%）========== */}
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

      {/* ========== 第5层：顶部亮边（lighten 2%）========== */}
      <line
        x1={x + cornerRadius}
        y1={y + borderWidth}
        x2={x + width - cornerRadius}
        y2={y + borderWidth}
        stroke={light}
        strokeWidth={2}
        strokeLinecap="round"
        opacity={0.6}
      />

      {/* ========== 第6层：底部暗边（darken 28%）========== */}
      <line
        x1={x + cornerRadius}
        y1={y + height - borderWidth}
        x2={x + width - cornerRadius}
        y2={y + height - borderWidth}
        stroke={dark}
        strokeWidth={4}
        strokeLinecap="round"
        opacity={0.8}
      />

      {/* ========== 第7层：中心高光（模拟塑料反光）========== */}
      <defs>
        <radialGradient id={`highlight-${keycap.id}`} cx="30%" cy="25%">
          <stop offset="0%" stopColor="white" stopOpacity={0.3} />
          <stop offset="40%" stopColor="white" stopOpacity={0.1} />
          <stop offset="100%" stopColor="white" stopOpacity={0} />
        </radialGradient>
      </defs>
      <ellipse
        cx={x + width * 0.35}
        cy={y + height * 0.3}
        rx={width * 0.4}
        ry={height * 0.35}
        fill={`url(#highlight-${keycap.id})`}
      />

      {/* ========== 第8层：文字 ========== */}
      <text
        x={x + width / 2}
        y={y + height / 2}
        textAnchor="middle"
        dominantBaseline="central"
        fill={keycap.textColor}
        fontSize={keycap.fontSize}
        fontFamily={keycap.fontFamily}
        fontWeight={keycap.fontWeight}
        style={{
          textTransform: keycap.textTransform as any,
          textShadow: '0 1px 2px rgba(0,0,0,0.2)'
        }}
      >
        {keycap.text}
      </text>

      {/* ========== 第9层：选中效果 ========== */}
      {isSelected && (
        <rect
          x={x - 3}
          y={y - 3}
          width={width + 6}
          height={height + 6}
          rx={cornerRadius + 3}
          fill="none"
          stroke="#06B6D4"
          strokeWidth={3}
          filter="drop-shadow(0 0 12px rgba(6, 182, 212, 0.8))"
        />
      )}
    </motion.g>
  );
}
