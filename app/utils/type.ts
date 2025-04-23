export type ItemSpan = '1/2' | '1/3' | '1/4' | '2/3' | '3/4' | '1/1';

// 视频数据接口
export interface VideoItem {
  description: string;
  sources: string[];
  subtitle: string;
  thumb: string;
  title: string;
  span?: number;
  width?: ItemSpan;
}
// 图片数据接口
export interface PictureItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  imgUrl: string;
  author: string;
  span?: number;
  width?: ItemSpan;
}

export interface Service {
  title: string;
  videoSrc: string;
  fallbackImage?: string; // 添加备用图片
}
