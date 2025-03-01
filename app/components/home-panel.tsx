'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ReactPlayer from 'react-player/lazy';
import { Service } from '../page';
import { navItems } from './sidebar-nav';

interface ServicePanelProps {
  service: Service;
  index: number;
  isLast: boolean;
  category: string; // 对应的导航分类
}

const HomePanel = ({ service, index, isLast, category }: ServicePanelProps) => {
  const { title, videoSrc } = service;
  const [isHovered, setIsHovered] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const router = useRouter();

  // 获取当前分类对应的路由项目
  const getCategoryItems = () => {
    const categoryData = navItems.find((item) => item.label === category);
    return categoryData ? categoryData.items.filter((item) => item.href) : [];
  };

  const navigationItems = getCategoryItems();

  return (
    <motion.div
      className="relative overflow-hidden bg-black rounded-[30px]"
      layout
      style={{
        flex: isHovered ? 1.3 : 1,
        transition: 'flex 0.4s ease-in-out',
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* 右侧分隔线 */}
      {!isLast && !isHovered && (
        <div className="absolute right-0 inset-y-0 w-[1px] bg-white/20 z-10"></div>
      )}

      {/* 悬停状态 - 显示视频和导航 */}
      {isHovered ? (
        <div className="h-full w-full relative">
          {/* 视频背景 */}
          <div className="absolute inset-0 w-full h-full video-wrapper">
            <ReactPlayer
              url={videoSrc}
              playing={true}
              loop
              muted
              width="100%"
              height="100%"
              className="react-player"
              playsinline
              onReady={() => setIsVideoReady(true)}
              config={{
                file: {
                  attributes: {
                    style: { objectFit: 'cover', width: '100%', height: '100%' },
                  },
                },
                youtube: {
                  playerVars: { modestbranding: 1 },
                },
              }}
            />
          </div>

          {/* 加载中蒙层 */}
          {!isVideoReady && (
            <div className="absolute inset-0 bg-black z-10 flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          {/* 点状列表导航 */}
          <div className="absolute top-[50%] -translate-y-1/2 left-8 z-20 flex flex-col gap-3">
            {navigationItems.map((item) => (
              <motion.div
                key={item.href}
                className="flex items-center gap-3 group cursor-pointer"
                onClick={() => router.push(item.href)}
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-[8px] h-[8px] bg-white rounded-full flex-shrink-0" />
                <div className="text-white text-base md:text-lg font-medium group-hover:font-bold transition-all">
                  {item.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ) : (
        /* 默认状态 - 显示标题 */
        <div className="h-full w-full flex items-center justify-center">
          <motion.h2
            className="text-white text-xl md:text-2xl lg:text-2xl font-black font-['Inter']"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            {title}
          </motion.h2>
        </div>
      )}
    </motion.div>
  );
};

export default HomePanel;
