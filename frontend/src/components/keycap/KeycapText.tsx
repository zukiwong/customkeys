/**
 * 键帽文本组件
 * 渲染键帽上的文字，支持单行和多行
 */

import { TextTransform } from '../../core/models';
import { parseMultilineText, isMultilineText } from '../../utils';

interface KeycapTextProps {
  x: number;
  y: number;
  width: number;
  height: number;
  text: string;
  textColor: string;
  fontSize: number;
  fontFamily: string;
  fontWeight: string;
  textTransform: TextTransform;
}

export function KeycapText({
  x,
  y,
  width,
  height,
  text,
  textColor,
  fontSize,
  fontFamily,
  fontWeight,
  textTransform,
}: KeycapTextProps) {
  const isMultiLine = isMultilineText(text);
  const lines = isMultiLine ? parseMultilineText(text) : [text];

  // 文字样式
  const textStyle: React.CSSProperties = {
    textTransform: textTransform,
    filter: 'drop-shadow(0 0.5px 0.5px rgba(0,0,0,0.1))',
  };

  if (isMultiLine) {
    return (
      <text
        x={x + width / 2}
        y={y + height / 2 - (lines.length - 1) * 6}
        textAnchor="middle"
        dominantBaseline="central"
        fill={textColor}
        fontSize={fontSize}
        fontFamily={fontFamily}
        fontWeight={fontWeight}
        pointerEvents="none"
        style={textStyle}
      >
        {lines.map((line, i) => (
          <tspan key={i} x={x + width / 2} dy={i === 0 ? 0 : '1.2em'}>
            {line}
          </tspan>
        ))}
      </text>
    );
  }

  return (
    <text
      x={x + width / 2}
      y={y + height / 2}
      textAnchor="middle"
      dominantBaseline="central"
      fill={textColor}
      fontSize={fontSize}
      fontFamily={fontFamily}
      fontWeight={fontWeight}
      pointerEvents="none"
      style={textStyle}
    >
      {text}
    </text>
  );
}
