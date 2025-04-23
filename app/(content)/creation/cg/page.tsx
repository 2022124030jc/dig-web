import VideoGallery from '@/app/components/video-gallary';
import { VideoItem } from '@/app/utils/type';
import creation from '@/config/creation.json';

export default function CGPage() {
  return (
    <div className="space-y-6">
      <VideoGallery mediaJSON={creation.cg as VideoItem[]} />
    </div>
  );
}
