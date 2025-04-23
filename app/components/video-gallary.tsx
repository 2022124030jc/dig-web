'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Play } from 'lucide-react';
import React, { useState } from 'react';
import { getItemClassName } from '../utils/layout-utils';
import { VideoItem } from '../utils/type';

const VideoGallery: React.FC<{ mediaJSON: VideoItem[] }> = ({ mediaJSON }) => {
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);

  // 打开视频播放模态框
  const openVideoModal = (video: VideoItem) => {
    setActiveVideo(video);
  };

  // 关闭视频播放模态框
  const closeVideoModal = () => {
    setActiveVideo(null);
  };

  // 判断资源是否为视频
  const isVideo = (url: string) => {
    return url.endsWith('.mp4') || url.endsWith('.mov') || url.endsWith('.m4v');
  };

  // 模态框动画变体
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 25,
        stiffness: 300,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      y: 20,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {mediaJSON.map((video, index) => (
          <div key={index} className={getItemClassName(video, 'video-item flex flex-col')}>
            <div
              className="relative h-[400px] cursor-pointer rounded-2xl overflow-hidden"
              onClick={() => openVideoModal(video)}
            >
              <div className="w-full h-full relative">
                {/* 动态渲染图片或视频 */}
                {isVideo(video.thumb) ? (
                  <video
                    src={video.thumb}
                    className="w-full h-full object-cover rounded-lg"
                    muted
                    autoPlay
                    loop
                  />
                ) : (
                  <img
                    src={video.thumb}
                    alt={video.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                )}
                <div className="absolute inset-0 hover:bg-black hover:bg-opacity-20 transition-all duration-300">
                  <div className="absolute bottom-3 right-3 w-12 h-12 rounded-full bg-white bg-opacity-80 flex items-center justify-center shadow-md">
                    <Play className="h-6 w-6 text-primary fill-current text-black" />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-2 px-1">
              <p className="text-lg font-medium text-white opacity-60 truncate">{video.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 视频播放模态框 - 使用 AnimatePresence 实现动画 */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            className="fixed inset-0 bg-gray-500 bg-opacity-90 z-50 flex items-center justify-center p-2 overflow-y-auto"
            onClick={closeVideoModal}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={backdropVariants}
          >
            <motion.div
              className="relative w-full max-w-5xl my-4"
              onClick={(e) => e.stopPropagation()}
              variants={modalVariants}
            >
              <button
                className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors flex items-center gap-2 text-base font-medium p-2 rounded-full"
                onClick={closeVideoModal}
              >
                <span>关闭</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-x"
                >
                  <path d="M18 6 6 18"></path>
                  <path d="m6 6 12 12"></path>
                </svg>
              </button>
              <div className="bg-black rounded-xl overflow-hidden flex flex-row shadow-2xl h-[70vh]">
                {/* 左侧视频容器 */}
                <div className="relative w-2/3 h-full">
                  <video
                    controls
                    autoPlay
                    className="w-full h-full object-contain"
                    src={activeVideo.sources[0]}
                  >
                    您的浏览器不支持视频播放
                  </video>
                </div>
                {/* 右侧信息面板 */}
                <div className="w-1/3 p-6 bg-white flex flex-col">
                  <h3 className="text-xl font-bold">{activeVideo.title}</h3>
                  <p className="text-sm text-gray-600 mt-2">{activeVideo.subtitle}</p>
                  <div className="mt-4 text-sm text-gray-800 leading-relaxed overflow-y-auto flex-grow">
                    {activeVideo.description}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VideoGallery;