/**
 * 键盘画布组件
 * 使用 Zustand store 管理状态
 */

import React from 'react';
import { motion } from 'motion/react';
import { useKeyboardStore } from '../../core/store';
import { Keycap } from '../keycap';
import { getLayoutDimensions } from '../../utils';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '../ui/context-menu';
import { Copy, Clipboard } from 'lucide-react';

export function KeyboardCanvas() {
  // 从 store 获取状态
  const keycaps = useKeyboardStore((state) => state.keycaps);
  const selectedKeycapIds = useKeyboardStore((state) => state.selectedKeycapIds);
  const layout = useKeyboardStore((state) => state.layout);
  const baseStyle = useKeyboardStore((state) => state.baseStyle);
  const viewConfig = useKeyboardStore((state) => state.viewConfig);

  // 从 store 获取方法
  const toggleKeycapSelection = useKeyboardStore((state) => state.toggleKeycapSelection);
  const clearSelection = useKeyboardStore((state) => state.clearSelection);
  const copyStyle = useKeyboardStore((state) => state.copyStyle);
  const pasteStyle = useKeyboardStore((state) => state.pasteStyle);

  const dimensions = getLayoutDimensions(layout);

  // 基础样式映射
  const baseStyles = {
    'matte-black': 'bg-gradient-to-br from-gray-900 to-gray-950 shadow-2xl shadow-black/40',
    'metal-gray': 'bg-gradient-to-br from-gray-600 to-gray-700 shadow-2xl shadow-gray-800/50',
    'acrylic-white': 'bg-gradient-to-br from-gray-100 to-white shadow-2xl shadow-gray-400/30',
    'brushed-silver': 'bg-gradient-to-br from-gray-400 to-gray-500 shadow-2xl shadow-gray-600/40',
    'transparent-acrylic':
      'bg-gradient-to-br from-white/30 via-white/20 to-white/10 backdrop-blur-sm shadow-2xl shadow-gray-400/20 border border-white/30',
  };

  // 键帽点击处理
  const handleKeycapClick = (id: string, event: React.MouseEvent) => {
    const multiSelect = event.shiftKey;
    toggleKeycapSelection(id, multiSelect);
  };

  // 画布点击处理（取消选中）
  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget || (e.target as HTMLElement).tagName === 'svg') {
      clearSelection();
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center p-4 overflow-hidden relative" onClick={handleCanvasClick}>
      {/* 粒子效果 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
              opacity: 0,
            }}
            animate={{
              y: [null, Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080)],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* 键盘容器 */}
      <ContextMenu>
        <ContextMenuTrigger>
          <div
            className="relative"
            style={{
              perspective: '1200px',
            }}
          >
            <motion.div
              animate={{
                transform: viewConfig.view3D
                  ? 'rotateX(30deg) rotateY(0deg) rotateZ(0deg)'
                  : 'rotateX(0deg)'
              }}
              transition={{
                duration: 0.5,
                type: 'spring',
                stiffness: 100
              }}
              style={{
                transformStyle: 'preserve-3d'
              }}
            >
            {/* 键盘底座 */}
            {viewConfig.showBase && (
              <div
                className={`absolute inset-0 rounded-2xl ${baseStyles[baseStyle]}`}
                style={{
                  width: dimensions.width,
                  height: dimensions.height,
                  transform: 'translateZ(-10px)',
                }}
              />
            )}

            {/* SVG 画布 */}
            <svg
              width={dimensions.width}
              height={dimensions.height}
              className="relative z-10"
              style={{ display: 'block' }}
            >
              {keycaps.map((keycap) => (
                <Keycap
                  key={keycap.id}
                  keycap={keycap}
                  isSelected={selectedKeycapIds.includes(keycap.id)}
                  onClick={(e) => handleKeycapClick(keycap.id, e)}
                  view3D={viewConfig.view3D}
                  layout={layout}
                />
              ))}
            </svg>
            </motion.div>
          </div>
        </ContextMenuTrigger>

        {/* 右键菜单 */}
        <ContextMenuContent className="bg-gray-900 border-gray-800">
          <ContextMenuItem
            onClick={() => selectedKeycapIds.length > 0 && copyStyle(selectedKeycapIds[0])}
            disabled={selectedKeycapIds.length === 0}
            className="text-gray-300 hover:text-white"
          >
            <Copy className="w-4 h-4 mr-2" />
            Copy Style
          </ContextMenuItem>
          <ContextMenuItem
            onClick={() => pasteStyle(selectedKeycapIds)}
            disabled={selectedKeycapIds.length === 0}
            className="text-gray-300 hover:text-white"
          >
            <Clipboard className="w-4 h-4 mr-2" />
            Paste Style
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  );
}
