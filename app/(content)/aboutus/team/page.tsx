'use client';

import aboutusData from '@/config/aboutus.json';
import AutoPlay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

// 自定义分页指示器组件
interface DotsProps {
  slides: any[];
  selectedIndex: number;
}

const CarouselDots = ({ slides, selectedIndex }: DotsProps) => (
  <div className="flex justify-center gap-2 mt-4">
    {slides.map((_, index: number) => (
      <div
        key={index}
        className={`w-2 h-2 rounded-full ${selectedIndex === index ? 'bg-white' : 'bg-gray-500'}`}
      />
    ))}
  </div>
);

export default function TeamPage() {
  const [mounted, setMounted] = useState(false);

  // 行业报道轮播
  const [headerEmblaRef, headerEmblaApi] = useEmblaCarousel({ loop: true }, [
    AutoPlay({ delay: 5000 }),
  ]);
  const [headerSelectedIndex, setHeaderSelectedIndex] = useState(0);

  // 奖项展示轮播
  const [awardsEmblaRef, awardsEmblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    slidesToScroll: 1,
    breakpoints: {
      '(min-width: 640px)': {
        slidesToScroll: 1,
      },
      '(min-width: 768px)': {
        slidesToScroll: 1,
      },
      '(min-width: 1024px)': {
        slidesToScroll: 1,
      },
    },
  });

  // 监听轮播索引变化
  useEffect(() => {
    if (!headerEmblaApi) return;

    const onSelect = () => {
      setHeaderSelectedIndex(headerEmblaApi.selectedScrollSnap());
    };

    headerEmblaApi.on('select', onSelect);
    onSelect();

    return () => {
      headerEmblaApi.off('select', onSelect);
    };
  }, [headerEmblaApi]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="pb-40">
      {/* 行业报道部分 */}
      <section className="mb-12 w-full">
        <h2 className="text-2xl font-bold mb-6 text-white">行业报道</h2>
        <div className="relative w-full">
          <div className="overflow-hidden rounded-lg" ref={headerEmblaRef}>
            <div className="flex">
              {aboutusData.headerImage.map((item, index) => (
                <div key={index} className="flex-[0_0_100%] min-w-0">
                  <div className="relative h-[400px] w-full">
                    <Image src={item.thumb} alt={item.title} fill className="object-cover" />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                      <h3 className="text-xl font-bold text-white">{item.title}</h3>
                      <p className="text-white/80">{item.subtitle}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <CarouselDots slides={aboutusData.headerImage} selectedIndex={headerSelectedIndex} />
        </div>
      </section>

      {/* 奖项展示部分 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-white">奖项展示</h2>
        <div className="relative">
          <div className="overflow-hidden" ref={awardsEmblaRef}>
            <div className="flex gap-4">
              {aboutusData.rewards.map((reward, index) => (
                <div
                  key={index}
                  className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_calc(50%-8px)] md:flex-[0_0_calc(33.333%-11px)]"
                >
                  <div
                    className={`bg-gradient-to-br ${
                      reward.type === 'gold'
                        ? 'from-yellow-500 to-yellow-700'
                        : reward.type === 'red'
                        ? 'from-red-600 to-red-800'
                        : 'from-blue-500 to-blue-700'
                    } rounded-lg p-6 h-[200px] flex flex-col justify-between`}
                  >
                    <div>
                      <div className="text-white font-medium">{reward.category}</div>
                      <div className="text-white/80 text-sm">{reward.description}</div>
                    </div>
                    <div className="flex justify-center items-center">
                      {reward.type === 'gold' ? (
                        <div className="bg-white/20 rounded-full p-3 w-16 h-16 flex items-center justify-center">
                          <span className="text-white font-bold">{reward.title}</span>
                        </div>
                      ) : (
                        <div className="text-white font-bold text-xl">{reward.title}</div>
                      )}
                    </div>
                    <div className="text-white/80 text-sm">{reward.subtitle}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 数据表现部分 */}
      <section>
        <h2 className="text-2xl font-bold mb-6 text-white">数据表现</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 bg-gray-800 rounded-lg p-6">
          {aboutusData.statistics.map((stat, index) => (
            <div key={index} className=" rounded-lg p-6">
              <div className="text-white text-2xl font-bold mb-1">{stat.title}</div>
              <div className="text-gray-400 text-sm">{stat.description}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
