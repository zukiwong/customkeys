/**
 * 键帽选中指示器组件
 * 显示键帽被选中时的视觉效果
 */

import { motion } from 'motion/react';

interface KeycapSelectionProps {
  x: number;
  y: number;
  width: number;
  height: number;
}

export function KeycapSelection({ x, y, width, height }: KeycapSelectionProps) {
  return (
    <>
      {/* 外部光晕环 */}
      <motion.rect
        x={x - 3}
        y={y - 3}
        width={width + 6}
        height={height + 6}
        rx={10}
        fill="none"
        stroke="rgba(6, 182, 212, 0.9)"
        strokeWidth={2.5}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2, repeat: Infinity }}
        filter="url(#selectionGlow)"
        pointerEvents="none"
      />

      {/* 内部脉冲环 */}
      <motion.rect
        x={x - 1}
        y={y - 1}
        width={width + 2}
        height={height + 2}
        rx={9}
        fill="none"
        stroke="rgba(6, 182, 212, 0.5)"
        strokeWidth={1}
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
        pointerEvents="none"
      />
    </>
  );
}
