import VideoGallery from '@/app/components/video-gallary';
import { VideoItem } from '@/app/utils/type';
import socialMedia from '@/config/social-media.json';

export default function InterviewPage() {
  return (
    <div className="space-y-6">
      <VideoGallery mediaJSON={socialMedia.interview as VideoItem[]} />
    </div>
  );
}
