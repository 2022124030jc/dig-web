import VideoGallery from '@/app/components/video-gallary';
import photography from '@/app/config/media/photography.json';

export default function VideoPage() {
  return (
    <div className="space-y-6">
      <VideoGallery mediaJSON={photography.video} />
    </div>
  );
}
