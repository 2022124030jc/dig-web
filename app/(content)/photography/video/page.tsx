import VideoGallery from '@/app/components/video-gallary';
import photography from '@/app/config/media/photography.json';
import { VideoItem } from '@/app/utils/type';

export default function VideoPage() {
  return (
    <div className="space-y-6">
      <VideoGallery mediaJSON={photography.video as VideoItem[]} />
    </div>
  );
}
