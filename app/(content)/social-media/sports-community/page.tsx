import PictureGallery from '@/app/components/piacture-gallary';
import socialMedia from '@/app/config/media/social-media.json';
import { PictureItem } from '@/app/utils/type';

export default function SportsCommunityPage() {
  return (
    <div className="space-y-6">
      <PictureGallery picturesData={socialMedia.sportsCommunity as PictureItem[]} />
    </div>
  );
}
