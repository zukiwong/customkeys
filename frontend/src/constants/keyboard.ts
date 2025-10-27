/**
 * 键盘相关常量定义
 */

import { KeyType } from '../core/models';

// ============= 尺寸常量 =============

/** 1u 的像素大小 */
export const UNIT_SIZE = 54;

/** 按键之间的间隙（像素） */
export const GAP = 4;

/** 键帽的 3D 深度（像素） */
export const KEYCAP_DEPTH = 12;

/** 画布边距 */
export const CANVAS_PADDING = 20;

// ============= 光源和阴影常量 =============

/** 光源角度（度） */
export const LIGHT_ANGLE = -135;

/** 阴影 X 偏移 */
export const SHADOW_OFFSET_X = 4;

/** 阴影 Y 偏移 */
export const SHADOW_OFFSET_Y = 4;

// ============= 默认样式常量 =============

/** 默认键帽主颜色 */
export const DEFAULT_MAIN_COLOR = '#E8E8E8';

/** 默认文本颜色 */
export const DEFAULT_TEXT_COLOR = '#2C2C2C';

/** 默认字体大小 */
export const DEFAULT_FONT_SIZE = 14;

/** 默认字体族 */
export const DEFAULT_FONT_FAMILY = 'Inter';

/** 默认字体粗细 */
export const DEFAULT_FONT_WEIGHT = '500';

/** 默认文本对齐 */
export const DEFAULT_TEXT_ALIGN = 'center';

// ============= 键盘按键类型映射 =============

/**
 * 按键文本到类型的映射
 * 用于识别按键类型并应用批量样式
 */
export const KEY_TYPE_MAP: Record<string, KeyType> = {
  // 字母键
  'A': 'letter', 'B': 'letter', 'C': 'letter', 'D': 'letter', 'E': 'letter',
  'F': 'letter', 'G': 'letter', 'H': 'letter', 'I': 'letter', 'J': 'letter',
  'K': 'letter', 'L': 'letter', 'M': 'letter', 'N': 'letter', 'O': 'letter',
  'P': 'letter', 'Q': 'letter', 'R': 'letter', 'S': 'letter', 'T': 'letter',
  'U': 'letter', 'V': 'letter', 'W': 'letter', 'X': 'letter', 'Y': 'letter',
  'Z': 'letter',

  // 数字键
  '1': 'number', '2': 'number', '3': 'number', '4': 'number', '5': 'number',
  '6': 'number', '7': 'number', '8': 'number', '9': 'number', '0': 'number',

  // 功能键
  'F1': 'function', 'F2': 'function', 'F3': 'function', 'F4': 'function',
  'F5': 'function', 'F6': 'function', 'F7': 'function', 'F8': 'function',
  'F9': 'function', 'F10': 'function', 'F11': 'function', 'F12': 'function',

  // 方向键
  '↑': 'arrow', '↓': 'arrow', '←': 'arrow', '→': 'arrow',

  // 修饰键
  'Shift': 'modifier', 'Ctrl': 'modifier', 'Alt': 'modifier', 'Win': 'modifier',
  'Caps': 'modifier', 'Tab': 'modifier', 'Enter': 'modifier', 'Backspace': 'modifier',
  'Space': 'modifier',

  // 其他特殊键
  'Esc': 'special', '`': 'special', '-': 'special', '=': 'special',
  '[': 'special', ']': 'special', '\\': 'special', ';': 'special',
  "'": 'special', ',': 'special', '.': 'special', '/': 'special',
  'Delete': 'special', 'Insert': 'special', 'Home': 'special', 'End': 'special',
  'PgUp': 'special', 'PgDn': 'special', 'PrtSc': 'special', 'ScrLk': 'special',
  'Pause': 'special', 'NumLock': 'special',
};

// ============= 可用字体列表 =============

/** 预设字体选项 */
export const AVAILABLE_FONTS = [
  'Inter',
  'Roboto',
  'Arial',
  'Helvetica',
  'Georgia',
  'Times New Roman',
  'Courier New',
  'Verdana',
  'Comic Sans MS',
  'Impact',
  'Lucida Console',
  'Tahoma',
  'Trebuchet MS',
  'Monospace',
  'Cursive',
  'Fantasy',
  'System-ui',
  'Serif',
  'Sans-serif',
  'Monospace',
];

// ============= 字体粗细选项 =============

export const FONT_WEIGHTS = [
  { value: '100', label: 'Thin' },
  { value: '200', label: 'Extra Light' },
  { value: '300', label: 'Light' },
  { value: '400', label: 'Regular' },
  { value: '500', label: 'Medium' },
  { value: '600', label: 'Semi Bold' },
  { value: '700', label: 'Bold' },
  { value: '800', label: 'Extra Bold' },
  { value: '900', label: 'Black' },
];
