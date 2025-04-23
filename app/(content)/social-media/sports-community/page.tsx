import PictureGallery from '@/app/components/piacture-gallary';
import { PictureItem } from '@/app/utils/type';
import socialMedia from '@/config/social-media.json';

export default function SportsCommunityPage() {
  return (
    <div className="space-y-6">
      <PictureGallery picturesData={socialMedia.sportsCommunity as PictureItem[]} />
    </div>
  );
}
