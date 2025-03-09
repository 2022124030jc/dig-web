import VideoGallery from '@/app/components/video-gallary';
import creation from '@/app/config/media/creation.json';
import { VideoItem } from '@/app/utils/type';

export default function MotionPage() {
  return (
    <div className="space-y-6">
      <VideoGallery mediaJSON={creation.motion as VideoItem[]} />
    </div>
  );
}
