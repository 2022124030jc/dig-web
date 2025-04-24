import VideoGallery from '@/app/components/video-gallary';
import cgiVideoData from '@/config/creation.json';
import { ItemSpan, VideoItem } from '@/app/utils/type'; // 假设类型定义在 types 文件中

export default function CGIPage() {
  // 动态转换 width 值
  const validMediaJSON: VideoItem[] = cgiVideoData.cgi.map((video) => ({
    ...video,
    width: ['1/2', '1/3', '1/4', '2/3', '3/4', '1/1'].includes(video.width || '')
      ? (video.width as ItemSpan)
      : '1/3', // 默认值
  }));

  return (
    <div className="space-y-6">
      <VideoGallery mediaJSON={validMediaJSON} />
    </div>
  );
}
