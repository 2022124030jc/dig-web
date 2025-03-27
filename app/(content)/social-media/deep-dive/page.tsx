import VideoGallery from '@/app/components/video-gallary';
import socialMedia from '@/app/config/media/social-media.json';
import { VideoItem } from '@/app/utils/type';

export default function DeepDivePage() {
  return (
    <div className="space-y-6">
      <VideoGallery mediaJSON={socialMedia.deepDive as VideoItem[]} />
    </div>
  );
}
