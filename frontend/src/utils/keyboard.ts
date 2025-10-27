/**
 * 键盘相关工具函数
 * 包含键盘布局尺寸计算、按键类型识别、键帽创建等
 */

import { KeyboardLayout, KeycapData, KeyType, LayoutDimensions } from '../core/models';
import {
  UNIT_SIZE,
  GAP,
  DEFAULT_MAIN_COLOR,
  DEFAULT_TEXT_COLOR,
  DEFAULT_FONT_SIZE,
  DEFAULT_FONT_FAMILY,
  DEFAULT_FONT_WEIGHT,
  DEFAULT_TEXT_ALIGN,
  KEY_TYPE_MAP,
  CANVAS_PADDING,
} from '../constants';

// ============= 布局尺寸计算 =============

/**
 * 根据键盘布局类型获取 SVG 画布尺寸
 * @param layout - 键盘布局类型
 * @returns 布局尺寸配置
 */
export function getLayoutDimensions(layout: KeyboardLayout): LayoutDimensions {
  switch (layout) {
    case '61-key':
      return {
        width: 15 * UNIT_SIZE + 15 * GAP + CANVAS_PADDING * 2,
        height: 5 * UNIT_SIZE + 5 * GAP + CANVAS_PADDING * 2,
        unitSize: UNIT_SIZE,
        gap: GAP,
      };

    case '87-key':
      return {
        width: 18.25 * UNIT_SIZE + 18.25 * GAP + CANVAS_PADDING * 2,
        height: 6 * UNIT_SIZE + 6 * GAP + CANVAS_PADDING * 2,
        unitSize: UNIT_SIZE,
        gap: GAP,
      };

    case '104-key':
      return {
        width: 22.5 * UNIT_SIZE + 22.5 * GAP + CANVAS_PADDING * 2,
        height: 6 * UNIT_SIZE + 6 * GAP + CANVAS_PADDING * 2,
        unitSize: UNIT_SIZE,
        gap: GAP,
      };
  }
}

// ============= 键帽创建 =============

/**
 * 创建键帽数据对象（带默认值）
 * @param id - 唯一标识符
 * @param row - 行位置
 * @param col - 列位置
 * @param width - 宽度（单位 u）
 * @param text - 显示文本
 * @param fontSize - 字体大小（可选）
 * @returns 键帽数据对象
 */
export function createKeycap(
  id: string,
  row: number,
  col: number,
  width: number,
  text: string,
  fontSize: number = DEFAULT_FONT_SIZE
): KeycapData {
  return {
    id,
    row,
    col,
    width,
    mainColor: DEFAULT_MAIN_COLOR,
    textColor: DEFAULT_TEXT_COLOR,
    text,
    fontSize,
    fontFamily: DEFAULT_FONT_FAMILY,
    fontWeight: DEFAULT_FONT_WEIGHT,
    textAlign: DEFAULT_TEXT_ALIGN,
    textTransform: 'none',
  };
}

// ============= 按键类型识别 =============

/**
 * 根据键帽文本识别按键类型
 * @param text - 键帽上的文本
 * @returns 按键类型
 */
export function getKeyType(text: string): KeyType {
  // 移除换行符和空格后转换为大写进行匹配
  const normalizedText = text.replace(/\n/g, ' ').trim().toUpperCase();

  // 直接查找映射表
  if (KEY_TYPE_MAP[normalizedText]) {
    return KEY_TYPE_MAP[normalizedText];
  }

  // 如果找不到，尝试匹配第一个单词
  const firstWord = normalizedText.split(' ')[0];
  if (KEY_TYPE_MAP[firstWord]) {
    return KEY_TYPE_MAP[firstWord];
  }

  // 默认返回特殊键
  return 'special';
}

/**
 * 根据键帽数据识别按键类型
 * @param keycap - 键帽数据
 * @returns 按键类型
 */
export function getKeycapType(keycap: KeycapData): KeyType {
  return getKeyType(keycap.text);
}

/**
 * 从键帽列表中筛选出指定类型的所有键帽
 * @param keycaps - 键帽列表
 * @param keyType - 要筛选的按键类型
 * @returns 符合类型的键帽列表
 */
export function filterKeycapsByType(keycaps: KeycapData[], keyType: KeyType): KeycapData[] {
  return keycaps.filter((keycap) => getKeycapType(keycap) === keyType);
}

// ============= 坐标计算 =============

/**
 * 计算键帽在 SVG 画布上的 X 坐标
 * @param col - 列位置
 * @returns X 坐标（像素）
 */
export function calculateKeycapX(col: number): number {
  return col * UNIT_SIZE + col * GAP + CANVAS_PADDING;
}

/**
 * 计算键帽在 SVG 画布上的 Y 坐标
 * @param row - 行位置
 * @param layout - 键盘布局类型
 * @returns Y 坐标（像素）
 */
export function calculateKeycapY(row: number, layout: KeyboardLayout): number {
  // 对于 87 键和 104 键布局，需要考虑 F 功能行（row -1）
  const rowOffset = layout === '87-key' || layout === '104-key' ? 1 : 0;
  const adjustedRow = row + rowOffset;
  return adjustedRow * UNIT_SIZE + adjustedRow * GAP + CANVAS_PADDING;
}

/**
 * 计算键帽的像素宽度
 * @param widthInUnits - 宽度（单位 u）
 * @returns 像素宽度
 */
export function calculateKeycapWidth(widthInUnits: number): number {
  return widthInUnits * UNIT_SIZE + (widthInUnits - 1) * GAP;
}

/**
 * 计算键帽的像素高度
 * @param heightInUnits - 高度（单位 u，默认 1）
 * @returns 像素高度
 */
export function calculateKeycapHeight(heightInUnits: number = 1): number {
  return heightInUnits * UNIT_SIZE + (heightInUnits - 1) * GAP;
}

// ============= 文本处理 =============

/**
 * 处理多行文本
 * @param text - 原始文本
 * @returns 文本行数组
 */
export function parseMultilineText(text: string): string[] {
  return text.split('\n');
}

/**
 * 判断文本是否为多行
 * @param text - 原始文本
 * @returns 如果是多行返回 true
 */
export function isMultilineText(text: string): boolean {
  return text.includes('\n');
}
