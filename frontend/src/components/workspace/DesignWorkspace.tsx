/**
 * 设计工作区主组件
 * 使用 Zustand store 管理状态，协调所有子组件
 */

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useKeyboardStore } from '../../core/store';
import { getDefaultKeycaps } from '../../utils/keyboardLayouts';
import { KeyboardCanvas } from './KeyboardCanvas';
import { PropertyPanel } from '../panels/PropertyPanel';
import { AssetLibrary } from '../AssetLibrary';
import { TopToolbar } from '../layout/TopToolbar';
import { Button } from '../ui/button';
import { PanelLeftClose, PanelRightClose } from 'lucide-react';

export function DesignWorkspace() {
  // 从 store 获取状态和方法
  const layout = useKeyboardStore((state) => state.layout);
  const viewConfig = useKeyboardStore((state) => state.viewConfig);
  const initializeKeycaps = useKeyboardStore((state) => state.initializeKeycaps);
  const setPhase = useKeyboardStore((state) => state.setPhase);
  const toggleLeftPanel = useKeyboardStore((state) => state.toggleLeftPanel);
  const toggleRightPanel = useKeyboardStore((state) => state.toggleRightPanel);

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
        <AnimatePresence>
          {viewConfig.showLeftPanel && (
            <motion.div
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-80 bg-gray-900/50 backdrop-blur-md border-r border-gray-800 flex flex-col"
              style={{ flexShrink: 0 }}
            >
              {/* 左侧面板头部 */}
              <div className="flex items-center justify-between p-4 border-b border-gray-800">
                <h3 className="text-sm font-medium text-gray-300">Assets</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleLeftPanel}
                  className="text-gray-400 hover:text-white h-8 w-8 p-0"
                >
                  <PanelLeftClose className="w-4 h-4" />
                </Button>
              </div>
              {/* 左侧面板内容 - 使用普通 div 包裹 overflow */}
              <div className="flex-1 overflow-y-auto">
                <AssetLibrary />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 中央画布区域 */}
        <div className="flex-1 flex items-center justify-center overflow-auto p-8 relative">
          <KeyboardCanvas />
        </div>

        {/* 右侧属性面板 */}
        <AnimatePresence>
          {viewConfig.showRightPanel && (
            <motion.div
              initial={{ x: 400 }}
              animate={{ x: 0 }}
              exit={{ x: 400 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-96 bg-gray-900/50 backdrop-blur-md border-l border-gray-800 flex flex-col"
              style={{ flexShrink: 0 }}
            >
              {/* 右侧面板头部 */}
              <div className="flex items-center justify-between p-4 border-b border-gray-800">
                <h3 className="text-sm font-medium text-gray-300">Properties</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleRightPanel}
                  className="text-gray-400 hover:text-white h-8 w-8 p-0"
                >
                  <PanelRightClose className="w-4 h-4" />
                </Button>
              </div>
              {/* 右侧面板内容 - 使用普通 div 包裹 overflow */}
              <div className="flex-1 overflow-y-auto">
                <PropertyPanel />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
