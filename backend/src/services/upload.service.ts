/**
 * 文件上传服务（本地存储版本）
 * 处理图片、字体等资产的上传和处理
 */

import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';
import { nanoid } from 'nanoid';

// 本地存储路径
const UPLOAD_DIR = path.join(__dirname, '../../uploads');
const IMAGES_DIR = path.join(UPLOAD_DIR, 'images');
const THUMBNAILS_DIR = path.join(UPLOAD_DIR, 'thumbnails');
const FONTS_DIR = path.join(UPLOAD_DIR, 'fonts');

// 允许的文件类型
const ALLOWED_MIME_TYPES = {
  image: ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/webp'],
  font: ['font/ttf', 'font/otf', 'font/woff', 'font/woff2', 'application/x-font-ttf', 'application/x-font-otf'],
};

// 文件大小限制（字节）
const MAX_FILE_SIZE = {
  free: 10 * 1024 * 1024, // 10MB
  pro: 50 * 1024 * 1024,  // 50MB
};

export interface UploadResult {
  url: string;
  thumbnailUrl?: string;
  width?: number;
  height?: number;
  size: number;
  mimeType: string;
}

export class UploadService {
  /**
   * 初始化上传目录
   */
  static async initializeDirectories(): Promise<void> {
    const dirs = [UPLOAD_DIR, IMAGES_DIR, THUMBNAILS_DIR, FONTS_DIR];
    for (const dir of dirs) {
      try {
        await fs.access(dir);
      } catch {
        await fs.mkdir(dir, { recursive: true });
      }
    }
  }

  /**
   * 验证文件类型
   */
  private static validateFileType(mimeType: string, type: 'image' | 'font'): boolean {
    return ALLOWED_MIME_TYPES[type].includes(mimeType);
  }

  /**
   * 验证文件大小
   */
  private static validateFileSize(size: number, userTier: 'free' | 'pro'): boolean {
    return size <= MAX_FILE_SIZE[userTier];
  }

  /**
   * 生成唯一文件名
   */
  private static generateFileName(originalName: string): string {
    const ext = path.extname(originalName);
    const uniqueId = nanoid(12);
    const timestamp = Date.now();
    return `${timestamp}_${uniqueId}${ext}`;
  }

  /**
   * 处理图片（压缩和优化）
   */
  private static async processImage(
    filePath: string,
    options: {
      maxWidth?: number;
      maxHeight?: number;
      quality?: number;
    } = {}
  ): Promise<{ buffer: Buffer; width: number; height: number }> {
    const { maxWidth = 2000, maxHeight = 2000, quality = 85 } = options;

    const image = sharp(filePath);
    const metadata = await image.metadata();

    // 如果图片太大，进行缩放
    let processedImage = image;
    if (metadata.width! > maxWidth || metadata.height! > maxHeight) {
      processedImage = image.resize(maxWidth, maxHeight, {
        fit: 'inside',
        withoutEnlargement: true,
      });
    }

    // 转换为 WebP 格式（更小的文件大小）
    const buffer = await processedImage
      .webp({ quality })
      .toBuffer();

    const { width, height } = await sharp(buffer).metadata();

    return {
      buffer,
      width: width!,
      height: height!,
    };
  }

  /**
   * 生成缩略图
   */
  private static async generateThumbnail(
    filePath: string,
    size: number = 200
  ): Promise<Buffer> {
    return await sharp(filePath)
      .resize(size, size, {
        fit: 'cover',
        position: 'center',
      })
      .webp({ quality: 80 })
      .toBuffer();
  }

  /**
   * 保存文件到本地
   */
  private static async saveToLocal(
    buffer: Buffer,
    fileName: string,
    directory: string
  ): Promise<string> {
    const filePath = path.join(directory, fileName);
    await fs.writeFile(filePath, buffer);

    // 返回相对于服务器的 URL 路径
    const relativePath = path.relative(UPLOAD_DIR, filePath);
    return `/uploads/${relativePath.replace(/\\/g, '/')}`;
  }

  /**
   * 上传图片资产
   */
  static async uploadImage(
    filePath: string,
    originalName: string,
    userTier: 'free' | 'pro' = 'free'
  ): Promise<UploadResult> {
    try {
      // 确保目录存在
      await this.initializeDirectories();

      // 读取文件信息
      const stats = await fs.stat(filePath);

      // 验证文件大小
      if (!this.validateFileSize(stats.size, userTier)) {
        throw new Error(`文件大小超过 ${userTier} 用户限制`);
      }

      // 处理图片
      const { buffer, width, height } = await this.processImage(filePath);

      // 生成文件名
      const fileName = this.generateFileName(originalName).replace(path.extname(originalName), '.webp');

      // 保存主图
      const url = await this.saveToLocal(buffer, fileName, IMAGES_DIR);

      // 生成并保存缩略图
      const thumbnailBuffer = await this.generateThumbnail(filePath);
      const thumbnailFileName = `thumb_${fileName}`;
      const thumbnailUrl = await this.saveToLocal(thumbnailBuffer, thumbnailFileName, THUMBNAILS_DIR);

      // 删除临时文件
      await fs.unlink(filePath);

      return {
        url,
        thumbnailUrl,
        width,
        height,
        size: buffer.length,
        mimeType: 'image/webp',
      };
    } catch (error) {
      // 清理临时文件
      try {
        await fs.unlink(filePath);
      } catch {}
      throw error;
    }
  }

  /**
   * 上传字体文件
   */
  static async uploadFont(
    filePath: string,
    originalName: string,
    userTier: 'free' | 'pro' = 'free'
  ): Promise<UploadResult> {
    try {
      // 确保目录存在
      await this.initializeDirectories();

      // 读取文件
      const stats = await fs.stat(filePath);
      const buffer = await fs.readFile(filePath);

      // 验证文件大小
      if (!this.validateFileSize(stats.size, userTier)) {
        throw new Error(`文件大小超过 ${userTier} 用户限制`);
      }

      // 生成文件名
      const fileName = this.generateFileName(originalName);
      const mimeType = this.getMimeType(originalName);

      // 保存到本地
      const url = await this.saveToLocal(buffer, fileName, FONTS_DIR);

      // 删除临时文件
      await fs.unlink(filePath);

      return {
        url,
        size: buffer.length,
        mimeType,
      };
    } catch (error) {
      // 清理临时文件
      try {
        await fs.unlink(filePath);
      } catch {}
      throw error;
    }
  }

  /**
   * 根据文件扩展名获取 MIME 类型
   */
  private static getMimeType(fileName: string): string {
    const ext = path.extname(fileName).toLowerCase();
    const mimeTypes: Record<string, string> = {
      '.ttf': 'font/ttf',
      '.otf': 'font/otf',
      '.woff': 'font/woff',
      '.woff2': 'font/woff2',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.gif': 'image/gif',
      '.webp': 'image/webp',
    };
    return mimeTypes[ext] || 'application/octet-stream';
  }

  /**
   * 删除文件
   */
  static async deleteFile(url: string): Promise<void> {
    // 将 URL 转换为本地文件路径
    const relativePath = url.replace('/uploads/', '');
    const filePath = path.join(UPLOAD_DIR, relativePath);

    try {
      await fs.unlink(filePath);
    } catch (error) {
      console.error('删除文件失败:', error);
    }
  }

  /**
   * 获取文件信息
   */
  static async getFileInfo(url: string): Promise<{ size: number; exists: boolean }> {
    const relativePath = url.replace('/uploads/', '');
    const filePath = path.join(UPLOAD_DIR, relativePath);

    try {
      const stats = await fs.stat(filePath);
      return {
        size: stats.size,
        exists: true,
      };
    } catch {
      return {
        size: 0,
        exists: false,
      };
    }
  }

  /**
   * 清理过期的临时文件（超过 24 小时的���时文件）
   */
  static async cleanupTempFiles(): Promise<void> {
    const tempDir = path.join(__dirname, '../../temp');

    try {
      await fs.access(tempDir);
      const files = await fs.readdir(tempDir);
      const now = Date.now();
      const maxAge = 24 * 60 * 60 * 1000; // 24 小时

      for (const file of files) {
        const filePath = path.join(tempDir, file);
        const stats = await fs.stat(filePath);

        if (now - stats.mtimeMs > maxAge) {
          await fs.unlink(filePath);
          console.log(`已清理临时文件: ${file}`);
        }
      }
    } catch (error) {
      console.error('清理临时文件失败:', error);
    }
  }
}
