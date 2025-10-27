/**
 * 颜色轮盘选择器组件
 * 双轮设计：外圆选择色相，中心方形选择饱和度和明度
 */

import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { hexToRgb, rgbToHsl, hslToRgb, rgbToHex } from '../../utils';

interface ColorWheelKnobProps {
  color: string;
  onChange: (color: string) => void;
}

export function ColorWheelKnob({ color, onChange }: ColorWheelKnobProps) {
  const [isDragging, setIsDragging] = useState<'wheel' | 'center' | false>(false);
  const [hue, setHue] = useState(0);
  const [saturation, setSaturation] = useState(0);
  const [lightness, setLightness] = useState(50);
  const wheelRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);

  // 将十六进制颜色转换为 HSL
  useEffect(() => {
    const rgb = hexToRgb(color);
    if (rgb) {
      const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
      setHue(hsl.h);
      setSaturation(hsl.s);
      setLightness(hsl.l);
    }
  }, [color]);

  // 处理色轮拖拽（选择色相）
  const handleWheelDrag = (e: React.MouseEvent | MouseEvent) => {
    if (!wheelRef.current) return;
    const rect = wheelRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
    const newHue = ((angle * 180) / Math.PI + 360 + 90) % 360;
    setHue(newHue);
    updateColor(newHue, saturation, lightness);
  };

  // 处理中心区域拖拽（选择饱和度和明度）
  const handleCenterDrag = (e: React.MouseEvent | MouseEvent) => {
    if (!centerRef.current) return;
    const rect = centerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
    const newSaturation = x * 100;
    const newLightness = (1 - y) * 100;
    setSaturation(newSaturation);
    setLightness(newLightness);
    updateColor(hue, newSaturation, newLightness);
  };

  // 更新颜色
  const updateColor = (h: number, s: number, l: number) => {
    const rgb = hslToRgb(h, s, l);
    const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
    onChange(hex);
  };

  // 监听鼠标移动和释放
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging === 'wheel') {
        handleWheelDrag(e);
      } else if (isDragging === 'center') {
        handleCenterDrag(e);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, hue, saturation, lightness]);

  return (
    <div className="flex justify-center">
      <div className="relative w-48 h-48">
        {/* 外部色轮 */}
        <motion.div
          ref={wheelRef}
          className="absolute inset-0 rounded-full cursor-pointer"
          style={{
            background: `conic-gradient(
              hsl(0, 100%, 50%),
              hsl(60, 100%, 50%),
              hsl(120, 100%, 50%),
              hsl(180, 100%, 50%),
              hsl(240, 100%, 50%),
              hsl(300, 100%, 50%),
              hsl(360, 100%, 50%)
            )`,
            boxShadow:
              '0 4px 20px rgba(6, 182, 212, 0.2), inset 0 2px 4px rgba(255,255,255,0.1), 0 0 40px rgba(6, 182, 212, 0.1)',
          }}
          onMouseDown={(e) => {
            setIsDragging('wheel');
            handleWheelDrag(e);
          }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        />

        {/* 色相指示器 */}
        <motion.div
          className="absolute w-3 h-3 rounded-full bg-white shadow-lg border-2 border-gray-900"
          style={{
            left: `calc(50% + ${Math.cos(((hue - 90) * Math.PI) / 180) * 88}px - 6px)`,
            top: `calc(50% + ${Math.sin(((hue - 90) * Math.PI) / 180) * 88}px - 6px)`,
          }}
          animate={{
            scale: isDragging === 'wheel' ? 1.2 : 1,
          }}
        />

        {/* 中心饱和度/明度区域 */}
        <motion.div
          ref={centerRef}
          className="absolute inset-0 m-auto w-28 h-28 rounded-full cursor-crosshair"
          style={{
            background: `radial-gradient(circle, hsl(${hue}, 100%, 50%) 0%, hsl(${hue}, 50%, 50%) 50%, hsl(${hue}, 0%, 50%) 100%)`,
            boxShadow: '0 2px 12px rgba(0,0,0,0.4), inset 0 1px 3px rgba(255,255,255,0.2)',
          }}
          onMouseDown={(e) => {
            setIsDragging('center');
            handleCenterDrag(e);
          }}
          whileHover={{ scale: 1.05 }}
        >
          {/* 当前颜色指示器 */}
          <motion.div
            className="absolute w-4 h-4 rounded-full border-2 border-white shadow-lg"
            style={{
              backgroundColor: color,
              left: `calc(${(saturation / 100) * 100}% - 8px)`,
              top: `calc(${(1 - lightness / 100) * 100}% - 8px)`,
            }}
            animate={{
              scale: isDragging === 'center' ? 1.3 : 1,
            }}
          />
        </motion.div>

        {/* 中心颜色预览 */}
        <div className="absolute inset-0 m-auto w-16 h-16 rounded-full pointer-events-none flex items-center justify-center">
          <div
            className="w-12 h-12 rounded-full shadow-inner"
            style={{
              backgroundColor: color,
              boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.3), 0 2px 8px rgba(0,0,0,0.2)',
            }}
          />
        </div>
      </div>
    </div>
  );
}
