/**
 * 应用主入口
 * 使用 Zustand store 管理全局状态
 */

import { useKeyboardStore } from './core/store';
import { SelectionPhase } from './components/workspace';
import { DesignWorkspace } from './components/workspace';
import { Toaster } from './components/ui/sonner';

export default function App() {
  // 从 store 获取当前阶段
  const phase = useKeyboardStore((state) => state.phase);
  const layout = useKeyboardStore((state) => state.layout);
  const baseStyle = useKeyboardStore((state) => state.baseStyle);
  const switchHeight = useKeyboardStore((state) => state.switchHeight);

  // 获取更新方法
  const setLayout = useKeyboardStore((state) => state.setLayout);
  const setBaseStyle = useKeyboardStore((state) => state.setBaseStyle);
  const setSwitchHeight = useKeyboardStore((state) => state.setSwitchHeight);
  const setPhase = useKeyboardStore((state) => state.setPhase);

  const handleStartDesign = () => {
    setPhase('design');
  };

  if (phase === 'selection') {
    return (
      <>
        <SelectionPhase
          layout={layout}
          baseStyle={baseStyle}
          switchHeight={switchHeight}
          onLayoutChange={setLayout}
          onBaseStyleChange={setBaseStyle}
          onSwitchHeightChange={setSwitchHeight}
          onStart={handleStartDesign}
        />
        <Toaster />
      </>
    );
  }

  return (
    <>
      <DesignWorkspace />
      <Toaster />
    </>
  );
}

// 导出类型以保持向后兼容
export type { KeyboardLayout, BaseStyle, SwitchHeight, KeycapData } from './core/models';
