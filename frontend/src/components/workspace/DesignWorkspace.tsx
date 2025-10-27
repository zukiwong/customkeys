/**
 * 设计工作区主组件
 * 使用 Zustand store 管理状态，协调所有子组件
 */

import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { useKeyboardStore } from '../../core/store';
import { getDefaultKeycaps } from '../../utils/keyboardLayouts';
import { KeyboardCanvas } from './KeyboardCanvas';
import { PropertyPanel } from '../PropertyPanel';
import { AssetLibrary } from '../AssetLibrary';
import { TopToolbar } from '../layout';

export function DesignWorkspace() {
  // 从 store 获取状态和方法
  const layout = useKeyboardStore((state) => state.layout);
  const baseStyle = useKeyboardStore((state) => state.baseStyle);
  const switchHeight = useKeyboardStore((state) => state.switchHeight);
  const viewConfig = useKeyboardStore((state) => state.viewConfig);
  const initializeKeycaps = useKeyboardStore((state) => state.initializeKeycaps);
  const setPhase = useKeyboardStore((state) => state.setPhase);

  // 组件挂载时初始化键帽数据
  useEffect(() => {
    const defaultKeycaps = getDefaultKeycaps(layout);
    initializeKeycaps(defaultKeycaps);
  }, [layout, initializeKeycaps]);

  // 返回到选择阶段
  const handleBackToSelection = () => {
    setPhase('selection');
  };

  return (
    <div className="h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white flex flex-col overflow-hidden min-h-screen">
      {/* 顶部工具栏 */}
      <TopToolbar onBackToSelection={handleBackToSelection} />

      {/* 主工作区 */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* 左侧资产库面板 */}
        <motion.div
          initial={{ x: viewConfig.showLeftPanel ? 0 : -320 }}
          animate={{ x: viewConfig.showLeftPanel ? 0 : -320 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="w-80 bg-gray-900/50 backdrop-blur-md border-r border-gray-800 overflow-y-auto"
          style={{ flexShrink: 0 }}
        >
          <AssetLibrary />
        </motion.div>

        {/* 中央画布区域 */}
        <div className="flex-1 flex items-center justify-center overflow-auto p-8 relative">
          <KeyboardCanvas />
        </div>

        {/* 右侧属性面板 */}
        <motion.div
          initial={{ x: viewConfig.showRightPanel ? 0 : 400 }}
          animate={{ x: viewConfig.showRightPanel ? 0 : 400 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="w-96 bg-gray-900/50 backdrop-blur-md border-l border-gray-800 overflow-y-auto"
          style={{ flexShrink: 0 }}
        >
          <PropertyPanel />
        </motion.div>
      </div>
    </div>
  );
}
