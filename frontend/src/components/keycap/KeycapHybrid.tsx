/**
 * 混合键帽组件 - PNG 底图 + SVG 图层叠加
 * 结合真实感（PNG）和灵活性（SVG 图层）
 */

import { motion } from 'motion/react';
import { KeycapData, KeyboardLayout } from '../../core/models';
import { calculateKeycapX, calculateKeycapY, calculateKeycapWidth, calculateKeycapHeight } from '../../utils';
import { useEffect, useRef } from 'react';

interface KeycapHybridProps {
  keycap: KeycapData;
  isSelected: boolean;
  onClick: (event: React.MouseEvent) => void;
  layout: KeyboardLayout;
}

/**
 * 根据颜色计算 CSS 滤镜值
 * 将 hex 颜色转换为 hue-rotate, saturate, brightness
 */
function colorToFilter(color: string): { hue: number; saturate: number; brightness: number } {
  // 将 hex 转换为 HSL
  const hex = color.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16) / 255;
  const g = parseInt(hex.substr(2, 2), 16) / 255;
  const b = parseInt(hex.substr(4, 2), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }

  // 转换为 CSS 滤镜值
  // 基准颜色是灰白色 #e9e8e6，色相约 40 度
  const baseHue = 40;
  const targetHue = h * 360;
  const hueRotate = targetHue - baseHue;

  // 饱和度和亮度基于 HSL 的 s 和 l
  const saturate = 1 + s * 0.5; // 1-1.5 范围
  const brightness = 0.5 + l; // 0.5-1.5 范围

  return { hue: hueRotate, saturate, brightness };
}

export function KeycapHybrid({ keycap, isSelected, onClick, layout }: KeycapHybridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 计算位置和尺寸
  const x = calculateKeycapX(keycap.col);
  const y = calculateKeycapY(keycap.row, layout);
  const width = calculateKeycapWidth(keycap.width);
  const height = calculateKeycapHeight(keycap.height);

  // 计算 CSS 滤镜值
  const filterValues = colorToFilter(keycap.mainColor);

  // 生成键帽 PNG（使用 Canvas 临时绘制）
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 设置 canvas 尺寸
    canvas.width = width * 2; // 2x 分辨率提高清晰度
    canvas.height = height * 2;
    ctx.scale(2, 2);

    // 清空画布
    ctx.clearRect(0, 0, width, height);

    // 绘制键帽基础形状
    const cornerRadius = 8;
    const depth = 18;

    // 1. 绘制底部阴影（柔和）
    ctx.save();
    ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
    ctx.shadowBlur = 8;
    ctx.shadowOffsetY = 4;
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.beginPath();
    ctx.ellipse(width / 2, height + depth + 2, width / 3, 4, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // 2. 绘制 3D 底部侧面（深色）
    ctx.fillStyle = '#b8b8b8'; // 深灰色
    ctx.beginPath();
    ctx.roundRect(2, height + 2, width - 4, depth, cornerRadius - 2);
    ctx.fill();

    // 3. 绘制 3D 左右侧面（中等深色）
    ctx.fillStyle = '#c8c8c8';
    // 左侧
    ctx.fillRect(0, 2, 3, height + depth - 2);
    // 右侧
    ctx.fillRect(width - 3, 2, 3, height + depth - 2);

    // 4. 绘制主体（浅灰色 - 基准色，会被 CSS 滤镜调整）
    ctx.fillStyle = '#e9e8e6'; // 与 CSS 参考的基准色一致
    ctx.strokeStyle = '#d8d8d8';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.roundRect(0, 0, width, height, cornerRadius);
    ctx.fill();
    ctx.stroke();

    // 5. 顶部高光边缘
    const gradient1 = ctx.createLinearGradient(0, 0, 0, 10);
    gradient1.addColorStop(0, 'rgba(255, 255, 255, 0.6)');
    gradient1.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = gradient1;
    ctx.fillRect(cornerRadius, 2, width - cornerRadius * 2, 8);

    // 6. 底部暗边缘
    const gradient2 = ctx.createLinearGradient(0, height - 10, 0, height);
    gradient2.addColorStop(0, 'rgba(0, 0, 0, 0)');
    gradient2.addColorStop(1, 'rgba(0, 0, 0, 0.15)');
    ctx.fillStyle = gradient2;
    ctx.fillRect(cornerRadius, height - 8, width - cornerRadius * 2, 8);

    // 7. 中心高光（模拟塑料反光）
    const highlightGradient = ctx.createRadialGradient(
      width * 0.35, height * 0.3, 0,
      width * 0.35, height * 0.3, width * 0.4
    );
    highlightGradient.addColorStop(0, 'rgba(255, 255, 255, 0.3)');
    highlightGradient.addColorStop(0.4, 'rgba(255, 255, 255, 0.1)');
    highlightGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = highlightGradient;
    ctx.fillRect(0, 0, width, height);

  }, [width, height]);

  const textTransform = keycap.textTransform || 'none';

  return (
    <motion.g
      onClick={onClick}
      style={{ cursor: 'pointer' }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* 隐藏的 canvas，用于生成键帽图像 */}
      <defs>
        <foreignObject x={x} y={y} width={width} height={height + 20}>
          <canvas
            ref={canvasRef}
            style={{ display: 'none' }}
          />
        </foreignObject>
      </defs>

      {/* 键帽底图（PNG from Canvas），使用 CSS 滤镜调色 */}
      <foreignObject x={x} y={y} width={width} height={height + 20}>
        <div
          style={{
            width: '100%',
            height: '100%',
            position: 'relative',
          }}
        >
          {/* Canvas 渲染的键帽 */}
          <canvas
            ref={canvasRef}
            style={{
              width: '100%',
              height: '100%',
              filter: `hue-rotate(${filterValues.hue}deg) saturate(${filterValues.saturate}) brightness(${filterValues.brightness})`,
            }}
          />

          {/* 自定义图案层 */}
          {keycap.customImage && (
            <img
              src={keycap.customImage}
              alt="custom pattern"
              style={{
                position: 'absolute',
                top: '20%',
                left: '20%',
                width: '60%',
                height: '60%',
                objectFit: 'contain',
                mixBlendMode: 'multiply',
                opacity: 0.8,
              }}
            />
          )}
        </div>
      </foreignObject>

      {/* 文字层 */}
      <text
        x={x + width / 2}
        y={y + height / 2}
        textAnchor="middle"
        dominantBaseline="middle"
        fill={keycap.textColor}
        fontSize={keycap.fontSize}
        fontFamily={keycap.fontFamily}
        fontWeight={keycap.fontWeight}
        style={{
          textTransform: textTransform as any,
          textShadow: '0 1px 2px rgba(0,0,0,0.3)',
          userSelect: 'none',
        }}
      >
        {keycap.text}
      </text>

      {/* 选中效果 */}
      {isSelected && (
        <rect
          x={x - 3}
          y={y - 3}
          width={width + 6}
          height={height + 6}
          rx={10}
          fill="none"
          stroke="#3b82f6"
          strokeWidth={3}
          opacity={0.8}
        />
      )}
    </motion.g>
  );
}
