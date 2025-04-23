import VideoGallery from '@/app/components/video-gallary';
import { VideoItem } from '@/app/utils/type';
import socialMedia from '@/config/social-media.json';

export default function DeepDivePage() {
  return (
    <div className="space-y-6">
      <VideoGallery mediaJSON={socialMedia.deepDive as VideoItem[]} />
    </div>
  );
}
