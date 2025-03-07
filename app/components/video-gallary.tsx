'use client';

import { Play } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';

// 视频数据接口
interface VideoItem {
  description: string;
  sources: string[];
  subtitle: string;
  thumb: string;
  title: string;
}

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

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {mediaJSON.map((video, index) => (
          <div key={index} className="video-item flex flex-col">
            <div
              className="relative aspect-[3/4] cursor-pointer min-h-[400px] rounded-2xl overflow-hidden"
              onClick={() => openVideoModal(video)}
            >
              <div className="w-full h-full bg-gray-200 relative">
                <Image
                  src={video.thumb}
                  alt={video.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                  unoptimized
                />
                <div className="absolute inset-0 bg-black bg-opacity-10 hover:bg-opacity-20 transition-all duration-300">
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

      {/* 视频播放模态框 */}
      {activeVideo && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-2 overflow-y-auto"
          onClick={closeVideoModal}
        >
          <div className="relative w-full max-w-xl my-4" onClick={(e) => e.stopPropagation()}>
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
            <div className="bg-black rounded-xl overflow-hidden shadow-2xl">
              <video
                controls
                autoPlay
                className="w-full aspect-[9/16] max-h-[60vh] mx-auto"
                src={activeVideo.sources[0]}
              >
                您的浏览器不支持视频播放
              </video>
              <div className="p-4 bg-white">
                <h3 className="text-lg font-bold">{activeVideo.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{activeVideo.subtitle}</p>
                <div className="mt-3 text-sm text-gray-800 leading-relaxed max-h-[20vh] overflow-y-auto">
                  {activeVideo.description}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoGallery;
