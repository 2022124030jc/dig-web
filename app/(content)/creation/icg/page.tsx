import VideoGallery from '@/app/components/video-gallary';
import cgiVideoData from '@/app/config/media/creation.json';

export default function CGIPage() {
  return (
    <div className="space-y-6">
      <VideoGallery mediaJSON={cgiVideoData.cgi} />
    </div>
  );
}
