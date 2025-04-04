import VideoGallery from '@/app/components/video-gallary';
import { VideoItem } from '@/app/utils/type';
import photography from '@/config/photography.json';

export default function VideoPage() {
  return (
    <div className="space-y-6">
      <VideoGallery mediaJSON={photography.video as VideoItem[]} />
    </div>
  );
}
