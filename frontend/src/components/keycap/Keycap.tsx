/**
 * 键帽主组件
 * 组合所有子组件渲染完整的 3D 键帽
 */

import { motion } from 'motion/react';
import { KeycapData, KeyboardLayout } from '../../core/models';
import { calculateKeycapX, calculateKeycapY, calculateKeycapWidth, calculateKeycapHeight } from '../../utils';
import { KeycapGradients } from './KeycapGradients';
import { KeycapShadow } from './KeycapShadow';
import { Keycap3DSides } from './Keycap3DSides';
import { KeycapTopSurface } from './KeycapTopSurface';
import { KeycapText } from './KeycapText';
import { KeycapSelection } from './KeycapSelection';

interface KeycapProps {
  keycap: KeycapData;
  isSelected: boolean;
  onClick: (event: React.MouseEvent) => void;
  view3D?: boolean;
  layout: KeyboardLayout;
}

export function Keycap({ keycap, isSelected, onClick, view3D = false, layout }: KeycapProps) {
  // 计算位置和尺寸
  const x = calculateKeycapX(keycap.col);
  const y = calculateKeycapY(keycap.row, layout);
  const width = calculateKeycapWidth(keycap.width);
  const height = calculateKeycapHeight(keycap.height);

  // 文本变换，默认为 "none"
  const textTransform = keycap.textTransform || 'none';

  return (
    <motion.g
      onClick={onClick}
      style={{ cursor: 'pointer' }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* 渐变定义 */}
      <KeycapGradients keycapId={keycap.id} mainColor={keycap.mainColor} />

      {/* 阴影层 */}
      <KeycapShadow x={x} y={y} width={width} height={height} />

      {/* 3D 侧面 */}
      <Keycap3DSides
        x={x}
        y={y}
        width={width}
        height={height}
        keycapId={keycap.id}
        mainColor={keycap.mainColor}
      />

      {/* 顶部表面 */}
      <KeycapTopSurface
        x={x}
        y={y}
        width={width}
        height={height}
        keycapId={keycap.id}
        isSelected={isSelected}
      />

      {/* 文字层 */}
      <KeycapText
        x={x}
        y={y}
        width={width}
        height={height}
        text={keycap.text}
        textColor={keycap.textColor}
        fontSize={keycap.fontSize}
        fontFamily={keycap.fontFamily}
        fontWeight={keycap.fontWeight}
        textTransform={textTransform}
      />

      {/* 选中指示器 */}
      {isSelected && <KeycapSelection x={x} y={y} width={width} height={height} />}
    </motion.g>
  );
}
