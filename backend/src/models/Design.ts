/**
 * 设计数据模型（MongoDB Schema）
 */

import mongoose, { Schema, Document } from 'mongoose';

// 键帽图案接口
interface IKeycapPattern {
  url: string;
  scale: number;
  rotation: number;
  opacity: number;
  position: {
    x: number;
    y: number;
  };
}

// 键帽数据接口
interface IKeycap {
  id: string;
  row: number;
  col: number;
  width: number;
  height?: number;
  mainColor: string;
  textColor: string;
  text: string;
  fontSize: number;
  fontFamily: string;
  fontWeight: string;
  textAlign: string;
  textTransform: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
  pattern?: IKeycapPattern;
}

// 设计文档接口
export interface IDesign extends Document {
  userId: mongoose.Types.ObjectId;
  name: string;
  description: string;
  thumbnail: string;

  // 键盘配置
  layout: '61-key' | '87-key' | '104-key';
  baseStyle: 'matte-black' | 'metal-gray' | 'acrylic-white' | 'brushed-silver' | 'transparent-acrylic';
  switchHeight: 'low-profile' | 'high-profile';

  // 键帽数据
  keycaps: IKeycap[];

  // 元数据
  tags: string[];
  isPublic: boolean;
  likes: number;
  views: number;

  createdAt: Date;
  updatedAt: Date;
}

// 键帽 Schema
const KeycapSchema = new Schema({
  id: { type: String, required: true },
  row: { type: Number, required: true },
  col: { type: Number, required: true },
  width: { type: Number, required: true },
  height: { type: Number, default: 1 },
  mainColor: { type: String, required: true },
  textColor: { type: String, required: true },
  text: { type: String, required: true },
  fontSize: { type: Number, required: true },
  fontFamily: { type: String, required: true },
  fontWeight: { type: String, required: true },
  textAlign: { type: String, required: true },
  textTransform: {
    type: String,
    enum: ['none', 'uppercase', 'lowercase', 'capitalize'],
    default: 'none',
  },
  pattern: {
    url: String,
    scale: Number,
    rotation: Number,
    opacity: Number,
    position: {
      x: Number,
      y: Number,
    },
  },
}, { _id: false });

// 设计 Schema
const DesignSchema = new Schema<IDesign>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    thumbnail: {
      type: String,
      default: '',
    },

    // 键盘配置
    layout: {
      type: String,
      enum: ['61-key', '87-key', '104-key'],
      required: true,
    },
    baseStyle: {
      type: String,
      enum: ['matte-black', 'metal-gray', 'acrylic-white', 'brushed-silver', 'transparent-acrylic'],
      required: true,
    },
    switchHeight: {
      type: String,
      enum: ['low-profile', 'high-profile'],
      required: true,
    },

    // 键帽数据
    keycaps: {
      type: [KeycapSchema],
      required: true,
    },

    // 元数据
    tags: {
      type: [String],
      default: [],
      index: true,
    },
    isPublic: {
      type: Boolean,
      default: false,
      index: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true, // 自动添加 createdAt 和 updatedAt
  }
);

// 索引优化
DesignSchema.index({ userId: 1, createdAt: -1 });
DesignSchema.index({ isPublic: 1, likes: -1 });
DesignSchema.index({ isPublic: 1, createdAt: -1 });
DesignSchema.index({ tags: 1 });

// 虚拟字段：作者信息
DesignSchema.virtual('author', {
  ref: 'User',
  localField: 'userId',
  foreignField: '_id',
  justOne: true,
});

// 导出模型
export const Design = mongoose.model<IDesign>('Design', DesignSchema);
