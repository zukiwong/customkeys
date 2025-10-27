/**
 * 本地存储服务
 * 使用 localStorage 保存设计数据
 */

import { KeycapData, KeyboardLayout, BaseStyle, SwitchHeight } from '../models';

const STORAGE_KEYS = {
  DESIGNS: 'customkeys_designs',
  ASSETS: 'customkeys_assets',
  CURRENT_DESIGN: 'customkeys_current_design',
};

// 设计元数据接口
export interface DesignMetadata {
  id: string;
  name: string;
  thumbnail: string; // base64 编码的缩略图
  layout: KeyboardLayout;
  baseStyle: BaseStyle;
  createdAt: string;
  updatedAt: string;
}

// 完整设计数据接口
export interface DesignData extends DesignMetadata {
  switchHeight: SwitchHeight;
  keycaps: KeycapData[];
}

// 资产接口
export interface Asset {
  id: string;
  type: 'image' | 'font';
  name: string;
  url: string;
  thumbnailUrl?: string;
  uploadedAt: string;
}

export class StorageService {
  /**
   * 获取所有设计列表
   */
  static getDesigns(): DesignMetadata[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.DESIGNS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('加载设计列表失败:', error);
      return [];
    }
  }

  /**
   * 获取单个设计详情
   */
  static getDesign(id: string): DesignData | null {
    try {
      const key = `${STORAGE_KEYS.DESIGNS}_${id}`;
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('加载设计失败:', error);
      return null;
    }
  }

  /**
   * 保存设计
   */
  static saveDesign(design: DesignData, thumbnail?: string): void {
    try {
      // 保存完整设计数据
      const key = `${STORAGE_KEYS.DESIGNS}_${design.id}`;
      localStorage.setItem(key, JSON.stringify(design));

      // 更新设计列表
      const designs = this.getDesigns();
      const existingIndex = designs.findIndex((d) => d.id === design.id);

      const metadata: DesignMetadata = {
        id: design.id,
        name: design.name,
        thumbnail: thumbnail || design.thumbnail,
        layout: design.layout,
        baseStyle: design.baseStyle,
        createdAt: design.createdAt,
        updatedAt: new Date().toISOString(),
      };

      if (existingIndex >= 0) {
        designs[existingIndex] = metadata;
      } else {
        designs.unshift(metadata);
      }

      localStorage.setItem(STORAGE_KEYS.DESIGNS, JSON.stringify(designs));
    } catch (error) {
      console.error('保存设计失败:', error);
      throw new Error('保存失败，可能是存储空间不足');
    }
  }

  /**
   * 删除设计
   */
  static deleteDesign(id: string): void {
    try {
      // 删除详情数据
      const key = `${STORAGE_KEYS.DESIGNS}_${id}`;
      localStorage.removeItem(key);

      // 更新列表
      const designs = this.getDesigns();
      const filtered = designs.filter((d) => d.id !== id);
      localStorage.setItem(STORAGE_KEYS.DESIGNS, JSON.stringify(filtered));
    } catch (error) {
      console.error('删除设计失败:', error);
    }
  }

  /**
   * 复制设计
   */
  static duplicateDesign(id: string): DesignData | null {
    try {
      const original = this.getDesign(id);
      if (!original) return null;

      const newDesign: DesignData = {
        ...original,
        id: `design_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        name: `${original.name} (副本)`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      this.saveDesign(newDesign, original.thumbnail);
      return newDesign;
    } catch (error) {
      console.error('复制设计失败:', error);
      return null;
    }
  }

  /**
   * 导出设计为 JSON
   */
  static exportAsJSON(design: DesignData): string {
    const exportData = {
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      design: design,
    };
    return JSON.stringify(exportData, null, 2);
  }

  /**
   * 从 JSON 导入设计
   */
  static importFromJSON(jsonString: string): DesignData {
    try {
      const data = JSON.parse(jsonString);

      // 验证数据格式
      if (!data.design || !data.design.keycaps) {
        throw new Error('无效的设计文件格式');
      }

      // 生成新 ID
      const imported: DesignData = {
        ...data.design,
        id: `design_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        name: `${data.design.name} (导入)`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      this.saveDesign(imported);
      return imported;
    } catch (error) {
      console.error('导入失败:', error);
      throw new Error('导入失败，请检查文件格式');
    }
  }

  /**
   * 保存当前设计 ID
   */
  static setCurrentDesign(id: string): void {
    localStorage.setItem(STORAGE_KEYS.CURRENT_DESIGN, id);
  }

  /**
   * 获取当前设计 ID
   */
  static getCurrentDesignId(): string | null {
    return localStorage.getItem(STORAGE_KEYS.CURRENT_DESIGN);
  }

  /**
   * 获取所有资产
   */
  static getAssets(): Asset[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ASSETS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('加载资产失败:', error);
      return [];
    }
  }

  /**
   * 添加资产
   */
  static addAsset(asset: Asset): void {
    try {
      const assets = this.getAssets();
      assets.unshift(asset);
      localStorage.setItem(STORAGE_KEYS.ASSETS, JSON.stringify(assets));
    } catch (error) {
      console.error('添加资产失败:', error);
      throw new Error('添加资产失败');
    }
  }

  /**
   * 删除资产
   */
  static deleteAsset(id: string): void {
    try {
      const assets = this.getAssets();
      const filtered = assets.filter((a) => a.id !== id);
      localStorage.setItem(STORAGE_KEYS.ASSETS, JSON.stringify(filtered));
    } catch (error) {
      console.error('删除资产失败:', error);
    }
  }

  /**
   * 获取存储使用情况
   */
  static getStorageInfo(): { used: number; total: number; percentage: number } {
    let used = 0;
    for (const key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        used += localStorage[key].length + key.length;
      }
    }

    // localStorage 通常限制 5-10MB
    const total = 5 * 1024 * 1024; // 假设 5MB
    const percentage = (used / total) * 100;

    return { used, total, percentage };
  }

  /**
   * 清空所有数据（慎用）
   */
  static clearAll(): void {
    if (confirm('确定要清空所有数据吗？此操作不可恢复！')) {
      Object.values(STORAGE_KEYS).forEach((key) => {
        localStorage.removeItem(key);
      });

      // 清空所有设计详情
      const designs = this.getDesigns();
      designs.forEach((design) => {
        localStorage.removeItem(`${STORAGE_KEYS.DESIGNS}_${design.id}`);
      });

      alert('所有数据已清空');
    }
  }
}
