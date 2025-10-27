/**
 * 核心类型定义
 * 包含所有键盘设计相关的数据类型
 */

// ============= 键盘配置类型 =============

/** 键盘布局类型 */
export type KeyboardLayout = "61-key" | "87-key" | "104-key";

/** 键盘基础样式 */
export type BaseStyle =
  | "matte-black"           // 磨砂黑
  | "metal-gray"            // 金属灰
  | "acrylic-white"         // 亚克力白
  | "brushed-silver"        // 拉丝银
  | "transparent-acrylic";  // 透明亚克力

/** 开关高度类型 */
export type SwitchHeight = "low-profile" | "high-profile";

// ============= 键帽数据类型 =============

/** 键帽图案/纹理配置 */
export interface KeycapPattern {
  url: string;              // 图案URL
  scale: number;            // 缩放比例
  rotation: number;         // 旋转角度
  opacity: number;          // 不透明度
  position: {               // 位置偏移
    x: number;
    y: number;
  };
}

/** 文本变换类型 */
export type TextTransform = "none" | "uppercase" | "lowercase" | "capitalize";

/** 键帽完整数据 */
export interface KeycapData {
  id: string;               // 唯一标识符
  row: number;              // 行位置
  col: number;              // 列位置（可为小数，如 1.25）
  width: number;            // 宽度（单位：u，如 1, 1.5, 2）
  height?: number;          // 高度（单位：u，默认 1）
  mainColor: string;        // 主颜色（十六进制）
  textColor: string;        // 文本颜色（十六进制）
  text: string;             // 显示文本
  fontSize: number;         // 字体大小（px）
  fontFamily: string;       // 字体族
  fontWeight: string;       // 字体粗细
  textAlign: string;        // 文本对齐方式
  textTransform: TextTransform; // 文本变换
  pattern?: KeycapPattern;  // 可选的图案配置
}

// ============= 应用状态类型 =============

/** 应用阶段 */
export type AppPhase = "selection" | "design";

/** 视图配置 */
export interface ViewConfig {
  view3D: boolean;          // 是否显示 3D 视图
  showBase: boolean;        // 是否显示底座
  showLeftPanel: boolean;   // 是否显示左侧面板
  showRightPanel: boolean;  // 是否显示右侧面板
}

/** 键帽样式（用于复制粘贴） */
export interface KeycapStyle {
  mainColor: string;
  textColor: string;
  fontSize: number;
  fontFamily: string;
  fontWeight: string;
  textAlign: string;
  textTransform: TextTransform;
  pattern?: KeycapPattern;
}

// ============= 键盘类型分类 =============

/** 键盘按键类型 */
export type KeyType =
  | "letter"          // 字母键
  | "number"          // 数字键
  | "modifier"        // 修饰键（Shift、Ctrl 等）
  | "function"        // 功能键（F1-F12）
  | "arrow"           // 方向键
  | "special";        // 特殊键（其他）

// ============= 尺寸常量 =============

/** 键盘布局尺寸配置 */
export interface LayoutDimensions {
  width: number;      // SVG 画布宽度（px）
  height: number;     // SVG 画布高度（px）
  unitSize: number;   // 1u 的像素大小
  gap: number;        // 按键间隙（px）
}

// ============= 颜色相关类型 =============

/** RGB 颜色值 */
export interface RGBColor {
  r: number;  // 0-255
  g: number;  // 0-255
  b: number;  // 0-255
}

/** HSL 颜色值 */
export interface HSLColor {
  h: number;  // 0-360
  s: number;  // 0-100
  l: number;  // 0-100
}
