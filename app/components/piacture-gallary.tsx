'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import React, { useState } from 'react';
import { getItemClassName } from '../utils/layout-utils';
import { PictureItem } from '../utils/type';

const PictureGallery: React.FC<{ picturesData: PictureItem[] }> = ({ picturesData }) => {
  const [activePicture, setActivePicture] = useState<PictureItem | null>(null);

  // 打开图片预览模态框
  const openPictureModal = (picture: PictureItem) => {
    setActivePicture(picture);
  };

  // 关闭图片预览模态框
  const closePictureModal = () => {
    setActivePicture(null);
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
    <div className="container mx-auto h-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {picturesData.map((picture) => (
          <div key={picture.id} className={getItemClassName(picture, 'picture-item flex flex-col')}>
            <div
              className="relative h-[400px] cursor-pointer rounded-2xl overflow-hidden"
              onClick={() => openPictureModal(picture)}
            >
              <div className="w-full h-full relative">
                <Image
                  src={picture.imgUrl}
                  alt={picture.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                  unoptimized
                />
                <div className="absolute inset-0 hover:bg-black hover:bg-opacity-20 transition-all duration-300"></div>
              </div>
            </div>
            <div className="mt-2 px-1">
              <p className="text-lg font-medium text-white opacity-60 truncate">{picture.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 图片预览模态框 - 使用 AnimatePresence 实现动画 */}
      <AnimatePresence>
        {activePicture && (
          <motion.div
            className="fixed inset-0 bg-gray-500 bg-opacity-90 z-50 flex items-center justify-center p-2 overflow-y-auto"
            onClick={closePictureModal}
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
                onClick={closePictureModal}
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
              <div className="bg-black rounded-xl overflow-hidden h-[600px] flex shadow-2xl">
                <div className="relative w-full h-full">
                  <Image
                    src={activePicture.imgUrl}
                    alt={activePicture.title}
                    layout="fill"
                    className="w-full h-full"
                    unoptimized
                  />
                </div>
                <div className="p-4 bg-white">
                  <h3 className="text-lg font-bold">{activePicture.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{activePicture.subtitle}</p>
                  <div className="mt-3 text-sm text-gray-800 leading-relaxed max-h-[20vh] overflow-y-auto">
                    {activePicture.description}
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

export default PictureGallery;
