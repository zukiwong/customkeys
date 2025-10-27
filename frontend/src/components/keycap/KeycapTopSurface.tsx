/**
 * 键帽顶部表面组件
 * 渲染键帽的顶面及其光照效果
 */

interface KeycapTopSurfaceProps {
  x: number;
  y: number;
  width: number;
  height: number;
  keycapId: string;
  isSelected: boolean;
}

export function KeycapTopSurface({
  x,
  y,
  width,
  height,
  keycapId,
  isSelected,
}: KeycapTopSurfaceProps) {
  return (
    <>
      {/* 主键帽顶面，带圆角 */}
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={8}
        ry={8}
        fill={`url(#topGradient-${keycapId})`}
        stroke={isSelected ? '#06B6D4' : 'rgba(0, 0, 0, 0.08)'}
        strokeWidth={isSelected ? 2.5 : 0.8}
        filter={isSelected ? 'drop-shadow(0 0 10px rgba(6, 182, 212, 0.7))' : 'none'}
      />

      {/* 弧形表面高光 - 模拟圆形顶面的光线反射 */}
      <ellipse
        cx={x + width * 0.35}
        cy={y + height * 0.35}
        rx={width * 0.35}
        ry={height * 0.3}
        fill={`url(#radialHighlight-${keycapId})`}
        pointerEvents="none"
      />

      {/* 边缘高光 - 顶部和左侧（面向光源）的亮边 */}
      <rect
        x={x + 1}
        y={y + 1}
        width={width - 2}
        height={height - 2}
        rx={7}
        ry={7}
        fill="none"
        stroke={`url(#edgeRim-${keycapId})`}
        strokeWidth={1.2}
        pointerEvents="none"
      />

      {/* 左上高光线（最亮边缘） */}
      <path
        d={`M ${x + 4} ${y + 2} L ${x + width * 0.6} ${y + 2}`}
        stroke="rgba(255, 255, 255, 0.5)"
        strokeWidth={1}
        strokeLinecap="round"
        fill="none"
        pointerEvents="none"
      />
      <path
        d={`M ${x + 2} ${y + 4} L ${x + 2} ${y + height * 0.5}`}
        stroke="rgba(255, 255, 255, 0.4)"
        strokeWidth={0.8}
        strokeLinecap="round"
        fill="none"
        pointerEvents="none"
      />

      {/* 右下阴影线（最暗边缘） */}
      <path
        d={`M ${x + width - 4} ${y + height - 2} L ${x + width * 0.4} ${y + height - 2}`}
        stroke="rgba(0, 0, 0, 0.2)"
        strokeWidth={0.8}
        strokeLinecap="round"
        fill="none"
        pointerEvents="none"
      />
      <path
        d={`M ${x + width - 2} ${y + height - 4} L ${x + width - 2} ${y + height * 0.5}`}
        stroke="rgba(0, 0, 0, 0.15)"
        strokeWidth={0.6}
        strokeLinecap="round"
        fill="none"
        pointerEvents="none"
      />

      {/* 内部阴影增强深度感知 */}
      <rect
        x={x + 2}
        y={y + 2}
        width={width - 4}
        height={height - 4}
        rx={6}
        ry={6}
        fill="none"
        stroke="rgba(0, 0, 0, 0.06)"
        strokeWidth={0.5}
        pointerEvents="none"
      />

      {/* 底部环境遮蔽（接触阴影模拟） */}
      <rect
        x={x + 3}
        y={y + height - 3}
        width={width - 6}
        height={2}
        rx={1}
        fill="rgba(0, 0, 0, 0.15)"
        pointerEvents="none"
      />
    </>
  );
}
