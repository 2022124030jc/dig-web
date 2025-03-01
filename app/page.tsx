import { LayoutGroup } from 'framer-motion';
import * as motion from 'framer-motion/client';
import HomePanel from './components/home-panel';

export interface Service {
  title: string;
  videoSrc: string;
  fallbackImage?: string; // 添加备用图片
}

const services: Service[] = [
  {
    title: 'Creative & Motion',
    videoSrc: 'https://res.cloudinary.com/demo/video/upload/v1689798874/samples/sea-turtle.mp4',
  },
  {
    title: 'Photography',
    videoSrc: 'https://res.cloudinary.com/demo/video/upload/v1689798897/samples/elephants.mp4',
  },
  {
    title: 'Visual Design',
    videoSrc:
      'https://res.cloudinary.com/demo/video/upload/v1689798871/samples/cld-sample-video.mp4',
  },
  {
    title: 'Social Media',
    videoSrc: 'https://res.cloudinary.com/demo/video/upload/v1689798885/samples/sea-turtle.mp4',
  },
];

export default function Home() {
  return (
    <LayoutGroup>
      <motion.div className="w-full h-full flex flex-col md:flex-row">
        {services.map((service, index) => (
          <HomePanel
            key={service.title}
            service={service}
            index={index}
            isLast={index === services.length - 1}
            category={service.title}
          />
        ))}
      </motion.div>
    </LayoutGroup>
  );
}
