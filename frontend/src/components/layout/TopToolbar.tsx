/**
 * 顶部工具栏组件
 * 使用 Zustand store 管理状态
 */

import { Button } from "../ui/button";
import { ArrowLeft, Eye, EyeOff, Download, Box, Share2, PanelLeftClose, PanelLeftOpen, PanelRightClose, PanelRightOpen } from "lucide-react";
import { Separator } from "../ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useKeyboardStore } from "../../core/store";

interface TopToolbarProps {
  onBackToSelection: () => void;
}

export function TopToolbar({ onBackToSelection }: TopToolbarProps) {
  // 从 store 获取状态
  const layout = useKeyboardStore((state) => state.layout);
  const viewConfig = useKeyboardStore((state) => state.viewConfig);

  // 从 store 获取方法
  const toggleView3D = useKeyboardStore((state) => state.toggleView3D);
  const toggleShowBase = useKeyboardStore((state) => state.toggleShowBase);
  const toggleLeftPanel = useKeyboardStore((state) => state.toggleLeftPanel);
  const toggleRightPanel = useKeyboardStore((state) => state.toggleRightPanel);

  return (
    <div className="h-16 border-b border-gray-800/50 bg-gray-900/30 backdrop-blur-sm flex items-center justify-between px-6 relative">
      {/* 扫描线动画 */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

      {/* 左侧 */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBackToSelection}
          className="text-gray-400 hover:text-white"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Separator orientation="vertical" className="h-6 bg-gray-800" />
        <div className="text-sm">
          <span className="text-gray-500">Layout:</span>
          <span className="ml-2 text-white">{layout}</span>
        </div>
      </div>

      {/* 中心 - 标题 */}
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <h2 className="text-lg bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
          CustomKeys
        </h2>
      </div>

      {/* 右侧 */}
      <div className="flex items-center gap-2">
        {!viewConfig.showLeftPanel && (
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleLeftPanel}
            className="text-gray-400 hover:text-white"
          >
            <PanelLeftOpen className="w-4 h-4" />
          </Button>
        )}

        {!viewConfig.showRightPanel && (
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleRightPanel}
            className="text-gray-400 hover:text-white"
          >
            <PanelRightOpen className="w-4 h-4" />
          </Button>
        )}

        {(!viewConfig.showLeftPanel || !viewConfig.showRightPanel) && (
          <Separator orientation="vertical" className="h-6 bg-gray-800" />
        )}

        <Button
          variant="ghost"
          size="sm"
          onClick={toggleView3D}
          className={`${viewConfig.view3D ? 'text-cyan-400' : 'text-gray-400'} hover:text-white`}
        >
          <Box className="w-4 h-4 mr-2" />
          3D View
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={toggleShowBase}
          className="text-gray-400 hover:text-white"
        >
          {viewConfig.showBase ? <Eye className="w-4 h-4 mr-2" /> : <EyeOff className="w-4 h-4 mr-2" />}
          Base
        </Button>

        <Separator orientation="vertical" className="h-6 bg-gray-800" />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-gray-900 border-gray-800">
            <DropdownMenuItem className="text-gray-300 hover:text-white">
              Export as PNG
            </DropdownMenuItem>
            <DropdownMenuItem className="text-gray-300 hover:text-white">
              Export as SVG
            </DropdownMenuItem>
            <DropdownMenuItem className="text-gray-300 hover:text-white">
              Export as JSON
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
          <Share2 className="w-4 h-4 mr-2" />
          Share
        </Button>
      </div>
    </div>
  );
}
