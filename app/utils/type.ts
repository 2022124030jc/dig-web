// 定义更灵活的 span 类型
export type ItemSpan = '1/2' | '1/3' | '1/4' | '2/3' | '3/4' | '1/1';

// 视频数据接口
export interface VideoItem {
  description: string;
  sources: string[];
  subtitle: string;
  thumb: string;
  title: string;
  span?: number; // 保留原有的 span 属性以保持兼容性
  width?: ItemSpan; // 新增 width 属性，用于指定宽度比例
}
// 图片数据接口
export interface PictureItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  imgUrl: string;
  author: string;
  span?: number; // 保留原有的 span 属性以保持兼容性
  width?: ItemSpan; // 新增 width 属性，用于指定宽度比例
}
