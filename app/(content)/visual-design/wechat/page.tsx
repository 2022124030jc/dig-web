import PictureGallery from '@/app/components/piacture-gallary';
import visualDesign from '@/app/config/media/visual-design.json';
import { PictureItem } from '@/app/utils/type';
export default function KVPage() {
  return (
    <div className="space-y-6">
      <PictureGallery picturesData={visualDesign.weChatPublic as PictureItem[]} />
    </div>
  );
}
