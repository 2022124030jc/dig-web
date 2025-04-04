'use client';

import clientData from '@/config/client.json';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useMemo } from 'react';

export default function Clients() {
  // 过滤掉无效数据
  const clients = clientData.clients.filter((client) => client && client.name && client.logo);

  // 将客户按列分组（每列最多显示5个）
  const columnClients = useMemo(() => {
    const result = [];
    // 确定有多少列（每5行为一列）
    const columnCount = 5;

    // 为每列创建客户列表
    for (let i = 0; i < columnCount; i++) {
      const colClients = clients.filter((_, index) => index % columnCount === i);
      // 为确保无限滚动效果，复制客户列表
      result.push([...colClients, ...colClients, ...colClients]); // 三倍数据以确保足够长的滚动内容
    }

    return result;
  }, [clients]);

  return (
    <div className="relative w-full h-full px-10 overflow-hidden">
      {/* 上方模糊渐变 */}
      <div className="absolute top-0 left-0 w-full h-4 bg-gradient-to-b from-black via-black to-transparent z-10 pointer-events-none"></div>

      <div className="grid grid-cols-5 gap-x-16 w-full h-full items-center justify-center py-8">
        {columnClients.map((colClients, colIndex) => (
          <div key={colIndex} className="relative h-full overflow-hidden">
            <motion.div
              className="flex flex-col gap-16 items-center"
              animate={{
                y: [0, (-100 * colClients.length) / 3],
              }}
              transition={{
                duration: 20 + colIndex * 3, // 加快速度并减小列间差异
                repeat: Infinity,
                repeatType: 'mirror', // 使用mirror代替loop避免跳回开始位置
                ease: 'linear',
              }}
              initial={{ y: 0 }} // 统一起始位置
            >
              {colClients.map((client, index) => (
                <motion.div
                  key={`${colIndex}-${index}`}
                  className="relative h-[60px] w-full flex items-center justify-center"
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Image
                    src={client.logo}
                    alt={client.name}
                    fill
                    sizes="(max-width: 768px) 20vw, 12vw"
                    style={{ objectFit: 'contain' }}
                    className="transition-all duration-300"
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        ))}
      </div>

      {/* 下方模糊渐变 */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black via-black to-transparent z-10 pointer-events-none"></div>
    </div>
  );
}
