/**
 * 颜色处理工具函数
 * 包含 RGB、HSL、Hex 之间的转换，以及颜色加深/变亮等操作
 */

import { RGBColor, HSLColor } from '../core/models';

// ============= 颜色格式转换 =============

/**
 * 十六进制颜色转 RGB
 * @param hex - 十六进制颜色字符串 (如 "#FF5733" 或 "FF5733")
 * @returns RGB 颜色对象，如果格式无效则返回 null
 */
export function hexToRgb(hex: string): RGBColor | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

/**
 * RGB 转十六进制颜色
 * @param r - 红色分量 (0-255)
 * @param g - 绿色分量 (0-255)
 * @param b - 蓝色分量 (0-255)
 * @returns 十六进制颜色字符串 (如 "#FF5733")
 */
export function rgbToHex(r: number, g: number, b: number): string {
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
}

/**
 * RGB 转 HSL
 * @param r - 红色分量 (0-255)
 * @param g - 绿色分量 (0-255)
 * @param b - 蓝色分量 (0-255)
 * @returns HSL 颜色对象
 */
export function rgbToHsl(r: number, g: number, b: number): HSLColor {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return {
    h: h * 360,
    s: s * 100,
    l: l * 100
  };
}

/**
 * HSL 转 RGB
 * @param h - 色相 (0-360)
 * @param s - 饱和度 (0-100)
 * @param l - 亮度 (0-100)
 * @returns RGB 颜色对象
 */
export function hslToRgb(h: number, s: number, l: number): RGBColor {
  h /= 360;
  s /= 100;
  l /= 100;

  let r: number, g: number, b: number;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

/**
 * 十六进制颜色转 HSL
 * @param hex - 十六进制颜色字符串
 * @returns HSL 颜色对象，如果格式无效则返回默认值
 */
export function hexToHsl(hex: string): HSLColor {
  const rgb = hexToRgb(hex);
  if (!rgb) return { h: 0, s: 0, l: 50 };
  return rgbToHsl(rgb.r, rgb.g, rgb.b);
}

/**
 * HSL 转十六进制颜色
 * @param h - 色相 (0-360)
 * @param s - 饱和度 (0-100)
 * @param l - 亮度 (0-100)
 * @returns 十六进制颜色字符串
 */
export function hslToHex(h: number, s: number, l: number): string {
  const rgb = hslToRgb(h, s, l);
  return rgbToHex(rgb.r, rgb.g, rgb.b);
}

// ============= 颜色调整 =============

/**
 * 加深颜色（SASS darken 兼容）
 * @param color - 十六进制颜色字符串
 * @param amount - 加深百分比 (0-100)，例如 16 表示降低 16% 亮度
 * @returns RGB 颜色字符串 (如 "rgb(100, 50, 25)")
 */
export function darkenColor(color: string, amount: number): string {
  if (color.startsWith('#')) {
    const hsl = hexToHsl(color);
    // 降低亮度（SASS darken 逻辑）
    const newL = Math.max(0, hsl.l - amount);
    return hslToHex(hsl.h, hsl.s, newL);
  }
  return color;
}

/**
 * 提亮颜色（SASS lighten 兼容）
 * @param color - 十六进制颜色字符串
 * @param amount - 提亮百分比 (0-100)，例如 2 表示提高 2% 亮度
 * @returns RGB 颜色字符串 (如 "rgb(200, 150, 125)")
 */
export function brightenColor(color: string, amount: number): string {
  if (color.startsWith('#')) {
    const hsl = hexToHsl(color);
    // 提高亮度（SASS lighten 逻辑）
    const newL = Math.min(100, hsl.l + amount);
    return hslToHex(hsl.h, hsl.s, newL);
  }
  return color;
}

/**
 * 调整颜色亮度（基于 HSL）
 * @param color - 十六进制颜色字符串
 * @param amount - 亮度调整量 (-100 到 100)
 * @returns 十六进制颜色字符串
 */
export function adjustLightness(color: string, amount: number): string {
  const hsl = hexToHsl(color);
  const newL = Math.max(0, Math.min(100, hsl.l + amount));
  return hslToHex(hsl.h, hsl.s, newL);
}

/**
 * 调整颜色饱和度（基于 HSL）
 * @param color - 十六进制颜色字符串
 * @param amount - 饱和度调整量 (-100 到 100)
 * @returns 十六进制颜色字符串
 */
export function adjustSaturation(color: string, amount: number): string {
  const hsl = hexToHsl(color);
  const newS = Math.max(0, Math.min(100, hsl.s + amount));
  return hslToHex(hsl.h, newS, hsl.l);
}

// ============= 颜色工具 =============

/**
 * 判断颜色是否为深色
 * @param color - 十六进制颜色字符串
 * @returns 如果是深色返回 true
 */
export function isDarkColor(color: string): boolean {
  const rgb = hexToRgb(color);
  if (!rgb) return false;

  // 使用相对亮度公式
  const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
  return luminance < 0.5;
}

/**
 * 获取对比文本颜色（黑色或白色）
 * @param backgroundColor - 背景颜色（十六进制）
 * @returns "#000000" 或 "#FFFFFF"
 */
export function getContrastTextColor(backgroundColor: string): string {
  return isDarkColor(backgroundColor) ? '#FFFFFF' : '#000000';
}

/**
 * 混合两个颜色
 * @param color1 - 第一个颜色（十六进制）
 * @param color2 - 第二个颜色（十六进制）
 * @param ratio - 混合比例 (0-1)，0 为 color1，1 为 color2
 * @returns 混合后的十六进制颜色
 */
export function mixColors(color1: string, color2: string, ratio: number): string {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);

  if (!rgb1 || !rgb2) return color1;

  const r = Math.round(rgb1.r * (1 - ratio) + rgb2.r * ratio);
  const g = Math.round(rgb1.g * (1 - ratio) + rgb2.g * ratio);
  const b = Math.round(rgb1.b * (1 - ratio) + rgb2.b * ratio);

  return rgbToHex(r, g, b);
}
