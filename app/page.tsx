import { LayoutGroup } from 'framer-motion';
import * as motion from 'framer-motion/client';
import HomePanel from './components/home-panel';

export interface Service {
  title: string;
  videoSrc: string;
  overlayText: string;
  link: string;
}

const services: Service[] = [
  {
    title: 'Creative & Motion',
    videoSrc: 'https://res.cloudinary.com/demo/video/upload/v1689798874/samples/sea-turtle.mp4',
    overlayText: 'CGI<br/>CG<br/>AIGC',
    link: '/creation',
  },
  {
    title: 'Photograph',
    videoSrc: 'https://res.cloudinary.com/demo/video/upload/v1689798897/samples/elephants.mp4',
    overlayText: 'CGI<br/>CG<br/>AIGC',
    link: '/photography',
  },
  {
    title: 'Visual Design',
    videoSrc:
      'https://res.cloudinary.com/demo/video/upload/v1689798871/samples/cld-sample-video.mp4',
    overlayText: 'UI/UX<br/>Graphic<br/>Brand',
    link: '/visual-design',
  },
  {
    title: 'Social Media',
    videoSrc: 'https://res.cloudinary.com/demo/video/upload/v1689798885/samples/sea-turtle.mp4',
    overlayText: 'Strategy<br/>Content<br/>Influence',
    link: '/social-media',
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
          />
        ))}
      </motion.div>
    </LayoutGroup>
  );
}
