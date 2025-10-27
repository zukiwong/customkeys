/**
 * SVG 渲染相关工具函数
 * 包含渐变生成、3D 效果计算等
 */

import { darkenColor, brightenColor } from './color';
import { KEYCAP_DEPTH, LIGHT_ANGLE, SHADOW_OFFSET_X, SHADOW_OFFSET_Y } from '../constants';

// ============= 渐变 ID 生成 =============

/**
 * 生成顶部表面渐变 ID
 */
export function getTopGradientId(keycapId: string): string {
  return `topGradient-${keycapId}`;
}

/**
 * 生成径向高光渐变 ID
 */
export function getRadialHighlightId(keycapId: string): string {
  return `radialHighlight-${keycapId}`;
}

/**
 * 生成左侧面渐变 ID
 */
export function getLeftSideGradientId(keycapId: string): string {
  return `leftSide-${keycapId}`;
}

/**
 * 生成顶侧面渐变 ID
 */
export function getTopSideGradientId(keycapId: string): string {
  return `topSide-${keycapId}`;
}

/**
 * 生成右侧面渐变 ID
 */
export function getRightSideGradientId(keycapId: string): string {
  return `rightSide-${keycapId}`;
}

/**
 * 生成底侧面渐变 ID
 */
export function getBottomSideGradientId(keycapId: string): string {
  return `bottomSide-${keycapId}`;
}

/**
 * 生成边缘渐变 ID
 */
export function getEdgeGradientId(keycapId: string): string {
  return `edgeGradient-${keycapId}`;
}

/**
 * 生成底部深色渐变 ID
 */
export function getBottomDarkGradientId(keycapId: string): string {
  return `bottomDarkGradient-${keycapId}`;
}

// ============= 3D 光源和阴影配置 =============

/**
 * 获取 3D 渲染配置
 */
export function get3DRenderConfig() {
  return {
    lightAngle: LIGHT_ANGLE,
    shadowOffsetX: SHADOW_OFFSET_X,
    shadowOffsetY: SHADOW_OFFSET_Y,
    keycapDepth: KEYCAP_DEPTH,
  };
}

// ============= 渐变定义生成器 =============

interface GradientStop {
  offset: string;
  color: string;
  opacity?: number;
}

/**
 * 生成线性渐变定义
 */
export function createLinearGradientDef(
  id: string,
  x1: string,
  y1: string,
  x2: string,
  y2: string,
  stops: GradientStop[]
): string {
  const stopElements = stops
    .map(
      (stop) =>
        `<stop offset="${stop.offset}" style="stop-color: ${stop.color}${
          stop.opacity !== undefined ? `; stop-opacity: ${stop.opacity}` : ''
        }" />`
    )
    .join('\n');

  return `
    <linearGradient id="${id}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}">
      ${stopElements}
    </linearGradient>
  `;
}

/**
 * 生成径向渐变定义
 */
export function createRadialGradientDef(
  id: string,
  cx: string,
  cy: string,
  stops: GradientStop[]
): string {
  const stopElements = stops
    .map(
      (stop) =>
        `<stop offset="${stop.offset}" ${
          stop.opacity !== undefined ? `stop-opacity="${stop.opacity}"` : ''
        } style="stop-color: ${stop.color}" />`
    )
    .join('\n');

  return `
    <radialGradient id="${id}" cx="${cx}" cy="${cy}">
      ${stopElements}
    </radialGradient>
  `;
}

// ============= 键帽 3D 侧面颜色计算 =============

/**
 * 计算键帽各个侧面的颜色
 * 根据光源方向计算不同侧面的明暗程度
 */
export function calculateSideFaceColors(mainColor: string) {
  return {
    // 顶面 - 最亮（直接受光）
    topFace: {
      start: brightenColor(mainColor, 0.15),
      middle: mainColor,
      end: darkenColor(mainColor, 0.9),
    },

    // 左侧面 - 较亮（部分受光）
    leftFace: {
      start: darkenColor(mainColor, 0.7),
      end: darkenColor(mainColor, 0.8),
    },

    // 顶侧面 - 较亮（部分受光）
    topSide: {
      start: darkenColor(mainColor, 0.7),
      end: darkenColor(mainColor, 0.8),
    },

    // 右侧面 - 较暗（背光）
    rightFace: {
      start: darkenColor(mainColor, 0.5),
      end: darkenColor(mainColor, 0.6),
    },

    // 底侧面 - 较暗（背光）
    bottomSide: {
      start: darkenColor(mainColor, 0.5),
      end: darkenColor(mainColor, 0.6),
    },

    // 边缘 - 最暗（背光+遮挡）
    edge: {
      start: darkenColor(mainColor, 0.4),
      end: darkenColor(mainColor, 0.5),
    },

    // 底部 - 极暗（完全背光）
    bottom: {
      start: darkenColor(mainColor, 0.3),
      end: darkenColor(mainColor, 0.4),
    },
  };
}

// ============= 阴影生成 =============

/**
 * 生成键帽主阴影的 filter 属性
 */
export function getMainShadowFilter(): string {
  return 'drop-shadow(0px 2px 3px rgba(0,0,0,0.3))';
}

/**
 * 生成键帽次级阴影的 filter 属性
 */
export function getSecondaryShadowFilter(): string {
  return 'drop-shadow(0px 4px 8px rgba(0,0,0,0.15))';
}

/**
 * 生成键帽接触阴影样式
 */
export function getContactShadowStyle(): React.CSSProperties {
  return {
    filter: 'blur(2px)',
    opacity: 0.2,
  };
}

// ============= SVG 路径辅助函数 =============

/**
 * 生成矩形路径
 */
export function createRectPath(x: number, y: number, width: number, height: number): string {
  return `M ${x} ${y} L ${x + width} ${y} L ${x + width} ${y + height} L ${x} ${y + height} Z`;
}

/**
 * 生成圆角矩形路径
 */
export function createRoundedRectPath(
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
): string {
  return `
    M ${x + radius} ${y}
    L ${x + width - radius} ${y}
    Q ${x + width} ${y} ${x + width} ${y + radius}
    L ${x + width} ${y + height - radius}
    Q ${x + width} ${y + height} ${x + width - radius} ${y + height}
    L ${x + radius} ${y + height}
    Q ${x} ${y + height} ${x} ${y + height - radius}
    L ${x} ${y + radius}
    Q ${x} ${y} ${x + radius} ${y}
    Z
  `;
}

// ============= 选中效果 =============

/**
 * 获取选中状态的边框样式
 */
export function getSelectedBorderStyle() {
  return {
    stroke: '#3b82f6',       // 蓝色边框
    strokeWidth: 2,
    filter: 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.6))', // 蓝色光晕
  };
}

/**
 * 获取悬停状态的样式
 */
export function getHoverStyle() {
  return {
    filter: 'brightness(1.05)',
    cursor: 'pointer',
  };
}
