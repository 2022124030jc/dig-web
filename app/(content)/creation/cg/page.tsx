import VideoGallery from '@/app/components/video-gallary';
import creation from '@/app/config/media/creation.json';

export default function CGPage() {
  return (
    <div className="space-y-6">
      <VideoGallery mediaJSON={creation.cg} />
    </div>
  );
}
