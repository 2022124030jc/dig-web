import PictureGallery from '@/app/components/piacture-gallary';
import { PictureItem } from '@/app/utils/type';
import photography from '@/config/photography.json';
export default function KVPage() {
  return (
    <div className="space-y-6">
      <PictureGallery picturesData={photography.kv as PictureItem[]} />
    </div>
  );
}
