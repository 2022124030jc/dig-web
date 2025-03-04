'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Service } from '../page';
import { navItems } from './sidebar-nav';

interface ServicePanelProps {
  service: Service;
  index: number;
  isLast: boolean;
  category: string; // 对应的导航分类
}

const getGradientPositionByIndex = (index: number) => {
  const maxIndex = 3; // 假设的最大index值
  const minPosition = 20; // 最上方位置（百分比）
  const maxPosition = 100; // 最下方位置（百分比）

  const position = minPosition + (index / maxIndex) * (maxPosition - minPosition);

  // 创建三段式渐变：透明 -> 白色 -> 透明
  return `linear-gradient(
    to bottom,
    transparent 0%,
    transparent ${Math.max(0, position - 30)}%,
    rgba(255, 255, 255, 0.8) ${position}%,
    transparent ${Math.min(100, position + 30)}%,
    transparent 100%
  )`;
};

const HomePanel = ({ service, index, isLast, category }: ServicePanelProps) => {
  const { title, videoSrc } = service;
  const [isHovered, setIsHovered] = useState(false);
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
      <AnimatePresence>
        {!isLast && !isHovered && (
          <div className="absolute right-0 inset-y-0 w-[1px] z-10">
            <div
              className="absolute inset-0 w-full"
              style={{
                background: getGradientPositionByIndex(index),
              }}
            ></div>
          </div>
        )}
      </AnimatePresence>

      {/* 视频背景（调整层级） */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.4s ease-in-out',
          zIndex: 10, // 固定层级
        }}
      >
        <video
          src={videoSrc}
          ref={(el) => {
            if (el) {
              if (isHovered) {
                el.play().catch((e) => console.log('视频播放失败:', e));
              } else {
                el.pause();
              }
            }
          }}
          muted // 添加静音属性以绕过浏览器自动播放限制
          loop
          playsInline // 确保在移动设备上正常播放
          preload="metadata"
          width="100%"
          height="100%"
          style={{ objectFit: 'cover', width: '100%', height: '100%' }}
        />
      </div>

      {/* 内容容器（包含标题和导航） */}
      <div className="relative z-30 h-full w-full">
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            opacity: isHovered ? 0 : 1,
            transition: 'opacity 0.2s',
            pointerEvents: 'none', // 防止遮挡点击事件
          }}
        >
          <motion.h2
            className="text-white text-xl md:text-2xl lg:text-2xl font-black font-['Inter']"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            {title}
          </motion.h2>
        </div>
        {/* 悬停导航 */}
        <div
          className="absolute inset-0 font-['Inter']"
          style={{
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.2s',
            pointerEvents: isHovered ? 'auto' : 'none',
          }}
        >
          <div className="h-full w-full relative">
            {/* 点状列表导航 */}
            <div className="absolute top-[50%] -translate-y-1/2 left-8 z-40 flex flex-col gap-3">
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
        </div>
      </div>
    </motion.div>
  );
};

export default HomePanel;
