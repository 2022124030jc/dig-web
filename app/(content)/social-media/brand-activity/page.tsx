import PictureGallery from '@/app/components/piacture-gallary';
import socialMedia from '@/app/config/media/social-media.json';
import { PictureItem } from '@/app/utils/type';

export default function BrandActivityPage() {
  return (
    <div className="space-y-6">
      <PictureGallery picturesData={socialMedia.brandActivity as PictureItem[]} />
    </div>
  );
}
