/**
 * 属性面板组件
 * 使用 Zustand store 管理状态
 */

import React, { useState, useRef } from 'react';
import { ScrollArea } from '../ui/scroll-area';
import { ColorWheelKnob } from '../common';
import { Separator } from '../ui/separator';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Slider } from '../ui/slider';
import { Button } from '../ui/button';
import { Palette, Type, Sparkles, Upload } from 'lucide-react';
import { toast } from 'sonner';
import { useKeyboardStore } from '../../core/store';
import { getKeycapType } from '../../utils';
import { AVAILABLE_FONTS, FONT_WEIGHTS } from '../../constants';

export function PropertyPanel() {
  // 从 store 获取状态
  const keycaps = useKeyboardStore((state) => state.keycaps);
  const selectedKeycapIds = useKeyboardStore((state) => state.selectedKeycapIds);

  // 从 store 获取方法
  const updateKeycap = useKeyboardStore((state) => state.updateKeycap);
  const updateMultipleKeycaps = useKeyboardStore((state) => state.updateMultipleKeycaps);

  const [customFonts, setCustomFonts] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 获取选中的键帽
  const selectedKeycap =
    selectedKeycapIds.length === 1 ? keycaps.find((k) => k.id === selectedKeycapIds[0]) : null;

  const allFonts = [...AVAILABLE_FONTS, ...customFonts];

  // 字体上传处理
  const handleFontUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.name.match(/\.(ttf|otf|woff|woff2)$/)) {
      const fontName = file.name.replace(/\.(ttf|otf|woff|woff2)$/, '');
      setCustomFonts((prev) => [...prev, fontName]);
      toast.success(`字体 "${fontName}" 已上传`);
    }
  };

  // 应用到相似按键
  const applyToSimilarKeys = (type: string) => {
    const targetIds = keycaps.filter((k) => getKeycapType(k) === type).map((k) => k.id);

    if (selectedKeycap && targetIds.length > 0) {
      const updates = {
        mainColor: selectedKeycap.mainColor,
        textColor: selectedKeycap.textColor,
        fontSize: selectedKeycap.fontSize,
        fontFamily: selectedKeycap.fontFamily,
        fontWeight: selectedKeycap.fontWeight,
      };
      updateMultipleKeycaps(targetIds, updates);
      toast.success(`已应用样式到 ${targetIds.length} 个 ${type} 键`);
    }
  };

  if (selectedKeycapIds.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500">
        <Palette className="w-12 h-12 mx-auto mb-3 opacity-50" />
        <p className="text-sm">Select a keycap to edit properties</p>
      </div>
    );
  }

  if (selectedKeycapIds.length > 1) {
    return (
      <div className="p-6">
        <div className="text-center text-gray-400 mb-4">
          <Type className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p className="text-sm">{selectedKeycapIds.length} keycaps selected</p>
        </div>

        {/* 批量编辑区域 */}
        <div className="space-y-4">
          <Separator />

          {/* 主颜色 */}
          <div>
            <Label className="text-gray-400">Main Color (Batch)</Label>
            <ColorWheelKnob
              color={selectedKeycap?.mainColor || '#E8E8E8'}
              onChange={(color) => updateMultipleKeycaps(selectedKeycapIds, { mainColor: color })}
            />
          </div>

          {/* 文本颜色 */}
          <div>
            <Label className="text-gray-400">Text Color (Batch)</Label>
            <ColorWheelKnob
              color={selectedKeycap?.textColor || '#2C2C2C'}
              onChange={(color) => updateMultipleKeycaps(selectedKeycapIds, { textColor: color })}
            />
          </div>
        </div>
      </div>
    );
  }

  if (!selectedKeycap) return null;

  return (
    <ScrollArea className="h-full">
      <div className="p-6 space-y-6">
        {/* 标题 */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-1">Properties</h3>
          <p className="text-sm text-gray-500">Edit keycap appearance</p>
        </div>

        <Separator />

        {/* 主颜色 */}
        <div>
          <Label className="text-gray-400 flex items-center gap-2">
            <Palette className="w-4 h-4" />
            Main Color
          </Label>
          <ColorWheelKnob
            color={selectedKeycap.mainColor}
            onChange={(color) => updateKeycap(selectedKeycap.id, { mainColor: color })}
          />
        </div>

        {/* 文本颜色 */}
        <div>
          <Label className="text-gray-400 flex items-center gap-2">
            <Type className="w-4 h-4" />
            Text Color
          </Label>
          <ColorWheelKnob
            color={selectedKeycap.textColor}
            onChange={(color) => updateKeycap(selectedKeycap.id, { textColor: color })}
          />
        </div>

        <Separator />

        {/* 文本内容 */}
        <div>
          <Label htmlFor="text" className="text-gray-400">
            Text
          </Label>
          <Input
            id="text"
            value={selectedKeycap.text}
            onChange={(e) => updateKeycap(selectedKeycap.id, { text: e.target.value })}
            className="bg-gray-800 border-gray-700 text-white"
          />
        </div>

        {/* 字体大小 */}
        <div>
          <Label className="text-gray-400 mb-2 block">Font Size: {selectedKeycap.fontSize}px</Label>
          <Slider
            value={[selectedKeycap.fontSize]}
            onValueChange={([value]) => updateKeycap(selectedKeycap.id, { fontSize: value })}
            min={8}
            max={32}
            step={1}
            className="py-2"
          />
        </div>

        {/* 字体族 */}
        <div>
          <Label htmlFor="fontFamily" className="text-gray-400">
            Font Family
          </Label>
          <Select
            value={selectedKeycap.fontFamily}
            onValueChange={(value) => updateKeycap(selectedKeycap.id, { fontFamily: value })}
          >
            <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              {allFonts.map((font) => (
                <SelectItem key={font} value={font} className="text-white">
                  {font}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* 上传自定义字体 */}
          <input
            ref={fileInputRef}
            type="file"
            accept=".ttf,.otf,.woff,.woff2"
            onChange={handleFontUpload}
            className="hidden"
          />
          <Button
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            className="mt-2 w-full"
          >
            <Upload className="w-4 h-4 mr-2" />
            Upload Font
          </Button>
        </div>

        {/* 字体粗细 */}
        <div>
          <Label htmlFor="fontWeight" className="text-gray-400">
            Font Weight
          </Label>
          <Select
            value={selectedKeycap.fontWeight}
            onValueChange={(value) => updateKeycap(selectedKeycap.id, { fontWeight: value })}
          >
            <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              {FONT_WEIGHTS.map((weight) => (
                <SelectItem key={weight.value} value={weight.value} className="text-white">
                  {weight.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Separator />

        {/* 快速应用 */}
        <div>
          <Label className="text-gray-400 mb-2 flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Quick Apply
          </Label>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => applyToSimilarKeys('letter')}
              className="text-xs"
            >
              All Letters
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => applyToSimilarKeys('number')}
              className="text-xs"
            >
              All Numbers
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => applyToSimilarKeys('modifier')}
              className="text-xs"
            >
              All Modifiers
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => applyToSimilarKeys('function')}
              className="text-xs"
            >
              All Functions
            </Button>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
