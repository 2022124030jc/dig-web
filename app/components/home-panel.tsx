'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Service } from '../page';

interface ServicePanelProps {
  service: Service;
  index: number;
  isLast: boolean;
}
const getGradientPositionByIndex = (index: number) => {
  // 计算高亮位置的百分比，index越小，百分比越小（越靠上）
  // 假设最大index为5，那么位置范围从20%到80%
  const maxIndex = 3; // 假设的最大index值
  const minPosition = 20; // 最上方位置（百分比）
  const maxPosition = 100; // 最下方位置（百分比）

  // 计算当前index的相对位置
  // 如果index为0，位置为20%；如果index为maxIndex，位置为80%
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

const HomePanel = ({ service, index, isLast }: ServicePanelProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { title, videoSrc, overlayText, link } = service;
  const [isHovered, setIsHovered] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const playPromiseRef = useRef<Promise<void> | null>(null);
  const router = useRouter();
  // 组件挂载时预加载视频
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // 设置预加载策略为auto，告诉浏览器需要预加载整个视频
    video.preload = 'auto';

    // 监听视频可以播放事件
    const handleCanPlay = () => {
      console.log(`视频 ${index} 已准备好播放`);
      setIsVideoReady(true);
    };

    // 确保视频开始加载
    video.load();

    // 添加事件监听器
    video.addEventListener('canplay', handleCanPlay);

    // 如果视频已经可以播放，直接设置状态
    if (video.readyState >= 3) {
      setIsVideoReady(true);
    }

    // 清理函数
    return () => {
      video.removeEventListener('canplay', handleCanPlay);
    };
  }, [index, videoSrc]);

  // 安全地播放视频
  const safePlay = async () => {
    if (!videoRef.current || !isVideoReady) return;

    try {
      videoRef.current.currentTime = 0; // 从开始播放
      playPromiseRef.current = videoRef.current.play();
      await playPromiseRef.current;
      // 播放成功
    } catch (err) {
      // 忽略 AbortError，因为这是由快速的hover in/out引起的预期行为
      if (err instanceof Error && err.name !== 'AbortError') {
        console.error('视频播放错误:', err);
      }
    } finally {
      playPromiseRef.current = null;
    }
  };

  // 安全地暂停视频
  const safePause = () => {
    if (!videoRef.current) return;

    if (playPromiseRef.current !== null) {
      // 有一个正在进行的播放操作，我们需要等待它完成
      playPromiseRef.current
        .then(() => {
          videoRef.current?.pause();
        })
        .catch(() => {
          // 忽略播放错误，仍尝试暂停
          videoRef.current?.pause();
        });
    } else {
      // 没有进行中的播放操作，可以直接暂停
      videoRef.current.pause();
    }
  };

  return (
    <motion.div
      className="relative overflow-hidden rounded-[30px]"
      layout
      style={{ flex: 1 }}
      whileHover={{
        flex: 1.5,
      }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      onHoverStart={(e) => {
        safePlay();
        setIsHovered(true);
      }}
      onHoverEnd={() => {
        safePause();
        setIsHovered(false);
      }}
    >
      {/* 预加载但隐藏的视频元素 */}
      <video
        ref={videoRef}
        src={videoSrc}
        loop
        muted
        playsInline
        preload="auto"
        className="hidden" // 隐藏但预加载
      />

      {/* 静态渐变边框线 */}
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

      {/* 内容区域 - 根据悬停状态切换 */}
      <AnimatePresence mode="wait">
        {isHovered ? (
          <motion.div
            key="hovered-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="h-full w-full flex-col justify-center items-center inline-flex relative z-10"
          >
            {/* 实际显示的视频 - 使用相同的src但单独管理 */}
            {isVideoReady ? (
              <video
                key={`display-video-${index}`}
                src={videoSrc}
                onClick={() => router.push(link)}
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              >
                <source src={videoSrc} type="video/mp4" />
                <track kind="captions" src={videoSrc} />
              </video>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-black">
                <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}

            {/* 文字内容 */}
            <div className="text-white text-[28px] font-bold font-['Inter'] relative z-20 pl-[30px]">
              CGI
              <br />
              CG
              <br />
              AIGC
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="default-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative z-10 flex items-center justify-center h-full px-4 py-8 md:py-0"
          >
            <motion.h2
              className="text-white text-xl md:text-2xl lg:text-[34px] font-black font-['Inter']"
              whileHover={{
                scale: 1.1,
                textShadow: '0 0 10px rgba(255,255,255,0.5)',
                color: '#ffffff',
              }}
              animate={{
                color: '#ffffff',
              }}
            >
              {title}
            </motion.h2>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default HomePanel;
