import PictureGallery from '@/app/components/piacture-gallary';
import photography from '@/app/config/media/photography.json';
import { PictureItem } from '@/app/utils/type';
export default function KVPage() {
  return (
    <div className="space-y-6">
      <PictureGallery picturesData={photography.kv as PictureItem[]} />
    </div>
  );
}
