/**
 * 键盘设计全局状态管理
 * 使用 Zustand 管理所有应用状态
 */

import { create } from 'zustand';
import {
  KeyboardLayout,
  BaseStyle,
  SwitchHeight,
  AppPhase,
  KeycapData,
  KeycapStyle,
  ViewConfig,
} from '../models';

// ============= Store 状态接口 =============

interface KeyboardState {
  // ----------- 应用配置 -----------
  phase: AppPhase;
  layout: KeyboardLayout;
  baseStyle: BaseStyle;
  switchHeight: SwitchHeight;

  // ----------- 键帽数据 -----------
  keycaps: KeycapData[];
  selectedKeycapIds: string[];
  copiedStyle: KeycapStyle | null;

  // ----------- 视图配置 -----------
  viewConfig: ViewConfig;

  // ----------- 应用配置方法 -----------
  setPhase: (phase: AppPhase) => void;
  setLayout: (layout: KeyboardLayout) => void;
  setBaseStyle: (style: BaseStyle) => void;
  setSwitchHeight: (height: SwitchHeight) => void;

  // ----------- 键帽操作方法 -----------
  initializeKeycaps: (keycaps: KeycapData[]) => void;
  updateKeycap: (id: string, updates: Partial<KeycapData>) => void;
  updateMultipleKeycaps: (ids: string[], updates: Partial<KeycapData>) => void;
  setSelectedKeycapIds: (ids: string[]) => void;
  toggleKeycapSelection: (id: string, multiSelect?: boolean) => void;
  clearSelection: () => void;

  // ----------- 样式操作方法 -----------
  copyStyle: (keycapId: string) => void;
  pasteStyle: (targetIds: string[]) => void;

  // ----------- 视图配置方法 -----------
  toggleView3D: () => void;
  toggleShowBase: () => void;
  toggleLeftPanel: () => void;
  toggleRightPanel: () => void;
  setViewConfig: (config: Partial<ViewConfig>) => void;

  // ----------- 辅助方法 -----------
  getSelectedKeycaps: () => KeycapData[];
  getKeycapById: (id: string) => KeycapData | undefined;
}

// ============= 创建 Store =============

export const useKeyboardStore = create<KeyboardState>((set, get) => ({
  // 初始状态
  phase: 'selection',
  layout: '61-key',
  baseStyle: 'matte-black',
  switchHeight: 'high-profile',
  keycaps: [],
  selectedKeycapIds: [],
  copiedStyle: null,
  viewConfig: {
    view3D: false,
    showBase: true,
    showLeftPanel: true,
    showRightPanel: true,
  },

  // ----------- 应用配置方法实现 -----------

  setPhase: (phase) => set({ phase }),

  setLayout: (layout) => set({ layout }),

  setBaseStyle: (style) => set({ baseStyle: style }),

  setSwitchHeight: (height) => set({ switchHeight: height }),

  // ----------- 键帽操作方法实现 -----------

  initializeKeycaps: (keycaps) => set({ keycaps, selectedKeycapIds: [] }),

  updateKeycap: (id, updates) =>
    set((state) => ({
      keycaps: state.keycaps.map((keycap) =>
        keycap.id === id ? { ...keycap, ...updates } : keycap
      ),
    })),

  updateMultipleKeycaps: (ids, updates) =>
    set((state) => ({
      keycaps: state.keycaps.map((keycap) =>
        ids.includes(keycap.id) ? { ...keycap, ...updates } : keycap
      ),
    })),

  setSelectedKeycapIds: (ids) => set({ selectedKeycapIds: ids }),

  toggleKeycapSelection: (id, multiSelect = false) =>
    set((state) => {
      if (multiSelect) {
        // 多选模式：切换该键帽的选中状态
        const isSelected = state.selectedKeycapIds.includes(id);
        return {
          selectedKeycapIds: isSelected
            ? state.selectedKeycapIds.filter((selectedId) => selectedId !== id)
            : [...state.selectedKeycapIds, id],
        };
      } else {
        // 单选模式：只选中该键帽
        return { selectedKeycapIds: [id] };
      }
    }),

  clearSelection: () => set({ selectedKeycapIds: [] }),

  // ----------- 样式操作方法实现 -----------

  copyStyle: (keycapId) => {
    const keycap = get().keycaps.find((k) => k.id === keycapId);
    if (!keycap) return;

    const style: KeycapStyle = {
      mainColor: keycap.mainColor,
      textColor: keycap.textColor,
      fontSize: keycap.fontSize,
      fontFamily: keycap.fontFamily,
      fontWeight: keycap.fontWeight,
      textAlign: keycap.textAlign,
      textTransform: keycap.textTransform,
      pattern: keycap.pattern,
    };

    set({ copiedStyle: style });
  },

  pasteStyle: (targetIds) => {
    const { copiedStyle } = get();
    if (!copiedStyle) return;

    get().updateMultipleKeycaps(targetIds, copiedStyle);
  },

  // ----------- 视图配置方法实现 -----------

  toggleView3D: () =>
    set((state) => ({
      viewConfig: { ...state.viewConfig, view3D: !state.viewConfig.view3D },
    })),

  toggleShowBase: () =>
    set((state) => ({
      viewConfig: { ...state.viewConfig, showBase: !state.viewConfig.showBase },
    })),

  toggleLeftPanel: () =>
    set((state) => ({
      viewConfig: {
        ...state.viewConfig,
        showLeftPanel: !state.viewConfig.showLeftPanel,
      },
    })),

  toggleRightPanel: () =>
    set((state) => ({
      viewConfig: {
        ...state.viewConfig,
        showRightPanel: !state.viewConfig.showRightPanel,
      },
    })),

  setViewConfig: (config) =>
    set((state) => ({
      viewConfig: { ...state.viewConfig, ...config },
    })),

  // ----------- 辅助方法实现 -----------

  getSelectedKeycaps: () => {
    const { keycaps, selectedKeycapIds } = get();
    return keycaps.filter((keycap) => selectedKeycapIds.includes(keycap.id));
  },

  getKeycapById: (id) => {
    return get().keycaps.find((keycap) => keycap.id === id);
  },
}));
