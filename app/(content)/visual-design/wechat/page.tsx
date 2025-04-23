import PictureGallery from '@/app/components/piacture-gallary';
import { PictureItem } from '@/app/utils/type';
import visualDesign from '@/config/visual-design.json';
export default function KVPage() {
  return (
    <div className="space-y-6">
      <PictureGallery picturesData={visualDesign.weChatPublic as PictureItem[]} />
    </div>
  );
}
