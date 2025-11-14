/**
 * 键盘画布组件
 * 使用 Zustand store 管理状态
 */

import React from 'react';
import { motion } from 'motion/react';
import { useKeyboardStore } from '../../core/store';
import { KeycapRealistic } from '../keycap';
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

  // 基础样式映射 - 参考 CSS keyboard.css
  // CSS: border: 13px solid #777; border-top-color: #666; border-bottom-color: #888;
  const baseStyles = {
    'matte-black': `
      bg-[radial-gradient(circle_at_center,_#111,_#222)]
      border-[13px] border-[#777] border-t-[#666] border-b-[#888]
      rounded-[4px]
      shadow-[inset_0_1rem_1rem_rgba(0,0,0,0.5),_0_2rem_3rem_-0.5rem_rgba(0,0,0,0.55)]
      outline outline-[3px] outline-[rgba(0,0,0,0.2)] outline-offset-[-1px]
    `,
    'metal-gray': `
      bg-[radial-gradient(circle_at_center,_#444,_#666)]
      border-[13px] border-[#888] border-t-[#777] border-b-[#999]
      rounded-[4px]
      shadow-[inset_0_1rem_1rem_rgba(0,0,0,0.4),_0_2rem_3rem_-0.5rem_rgba(0,0,0,0.45)]
      outline outline-[3px] outline-[rgba(0,0,0,0.15)] outline-offset-[-1px]
    `,
    'acrylic-white': `
      bg-[radial-gradient(circle_at_center,_#f0f0f0,_#e0e0e0)]
      border-[13px] border-[#ccc] border-t-[#bbb] border-b-[#ddd]
      rounded-[4px]
      shadow-[inset_0_1rem_1rem_rgba(0,0,0,0.15),_0_2rem_3rem_-0.5rem_rgba(0,0,0,0.25)]
      outline outline-[3px] outline-[rgba(0,0,0,0.1)] outline-offset-[-1px]
    `,
    'brushed-silver': `
      bg-[radial-gradient(circle_at_center,_#999,_#777)]
      border-[13px] border-[#aaa] border-t-[#999] border-b-[#bbb]
      rounded-[4px]
      shadow-[inset_0_1rem_1rem_rgba(0,0,0,0.3),_0_2rem_3rem_-0.5rem_rgba(0,0,0,0.35)]
      outline outline-[3px] outline-[rgba(0,0,0,0.12)] outline-offset-[-1px]
    `,
    'transparent-acrylic': `
      bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.2),_rgba(255,255,255,0.1))]
      backdrop-blur-sm
      border-[13px] border-[rgba(255,255,255,0.3)] border-t-[rgba(255,255,255,0.25)] border-b-[rgba(255,255,255,0.35)]
      rounded-[4px]
      shadow-[inset_0_1rem_1rem_rgba(0,0,0,0.2),_0_2rem_3rem_-0.5rem_rgba(0,0,0,0.3)]
      outline outline-[3px] outline-[rgba(255,255,255,0.2)] outline-offset-[-1px]
    `,
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
    <div className="w-full h-full flex items-center justify-center overflow-hidden relative" onClick={handleCanvasClick}>
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
                <KeycapRealistic
                  key={keycap.id}
                  keycap={keycap}
                  isSelected={selectedKeycapIds.includes(keycap.id)}
                  onClick={(e) => handleKeycapClick(keycap.id, e)}
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
