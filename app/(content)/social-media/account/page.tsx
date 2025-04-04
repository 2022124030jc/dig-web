'use client';

import accounts from '@/config/account.json';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

// 定义Account类型
type Account = (typeof accounts)[0];

// 重新组织数据以符合特定的交错布局要求
const reorderAccounts = (): {
  rows: Array<{ position: number; account: Account }[]>;
} => {
  // 创建包含位置信息的行数组
  const rows: Array<{ position: number; account: Account }[]> = [];

  // 定义循环模式中的位置: [row, column]
  // 5个位置: 第一行的1,3,5位置和第二行的2,4位置
  const pattern = [
    [0, 0], // 第一行第1个位置 (索引 0,0)
    [0, 2], // 第一行第3个位置 (索引 0,2)
    [0, 4], // 第一行第5个位置 (索引 0,4)
    [1, 1], // 第二行第2个位置 (索引 1,1)
    [1, 3], // 第二行第4个位置 (索引 1,3)
  ];

  // 处理所有账号
  accounts.forEach((account, index) => {
    // 确定当前账号在模式中的位置
    const patternIndex = index % pattern.length;
    const [rowIndex, colIndex] = pattern[patternIndex];

    // 确定当前账号应该在哪个循环组
    const cycleIndex = Math.floor(index / pattern.length);
    // 实际行索引 = 模式中的行索引 + (循环数 * 2)，因为每个循环占用2行
    const actualRowIndex = rowIndex + cycleIndex * 2;

    // 确保行存在
    if (!rows[actualRowIndex]) {
      rows[actualRowIndex] = [];
    }

    // 添加账号和位置信息
    rows[actualRowIndex].push({ position: colIndex, account });
  });

  return { rows };
};

const { rows } = reorderAccounts();

const Card = ({
  account,
  onOpenDetail,
}: {
  account: Account;
  onOpenDetail: (account: Account) => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative cursor-pointer h-full rounded-2xl overflow-hidden"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => onOpenDetail(account)}
    >
      <div className="relative h-full w-full bg-black/5">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={account.bg}
            alt={account.name}
            fill
            className="object-cover transition-all duration-700 brightness-75 hover:scale-110 hover:brightness-100"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        <div className="absolute inset-0 flex flex-col gap-3 justify-center items-center p-6 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
          <div className="relative h-16 w-16 rounded-full overflow-hidden border-2 border-white/80">
            <Image
              src={account.avatar}
              alt={account.name}
              fill
              className="object-cover"
              sizes="64px"
            />
          </div>

          <h3 className="text-xl font-bold">{account.name}</h3>
          <p className="text-sm text-white/80">{account.description}</p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
            transition={{ duration: 0.3 }}
            className="mt-2"
          >
            <button className="bg-white/90 text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-white">
              查看详情
            </button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

// 详情模态窗口组件
const DetailModal = ({ account, onClose }: { account: Account; onClose: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 "
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: 'spring', duration: 0.4 }}
        className="bg-white w-full max-w-[1174px] h-auto md:h-[90vh] max-h-[1000px] relative rounded-[30px] overflow-hidden shadow-2xl "
        onClick={(e) => e.stopPropagation()}
      >
        {/* 关闭按钮 */}
        <button
          onClick={onClose}
          className="absolute right-10 top-10 z-10 w-[30px] h-[30px] flex items-center justify-center bg-[#25262a] rounded-full text-white hover:bg-gray-700 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        <div className="flex flex-col md:flex-row h-full">
          {/* 左侧图片区域 */}
          <div className="w-full md:w-[440px] h-[300px] md:h-full p-4 md:p-[50px]">
            <div className="w-full h-full relative rounded-[20px] overflow-hidden">
              <Image
                src={account.bg}
                alt={account.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 440px"
              />
            </div>
          </div>

          {/* 右侧内容区域 */}
          <div className="flex-1 p-6 md:p-10 flex flex-col">
            {/* 头部信息 */}
            <div className="flex items-center gap-6 mb-8">
              {/* 头像 */}
              <div className="relative w-[99px] h-[99px] rounded-full overflow-hidden border border-[#eaecef]">
                <Image
                  src={account.avatar}
                  alt={account.name}
                  fill
                  className="object-cover"
                  sizes="99px"
                />
              </div>

              {/* 标题 */}
              <h2 className="text-[#25262a] text-4xl md:text-5xl lg:text-[56px] font-black font-['Inter'] leading-tight">
                {account.name}
              </h2>
            </div>

            {/* 描述文本 */}
            <div className="mb-12  text-black text-lg md:text-xl font-normal leading-relaxed">
              {account.detail.description}
            </div>

            <div className="space-y-4">
              {/* 公众号粉丝数 */}
              <div className="bg-white rounded-[20px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.08)] border border-[#eaecef] p-6 flex justify-between items-center">
                <div>
                  <p className="text-[#a5a5a9] text-base md:text-xl font-normal mb-2">
                    公众号粉丝数
                  </p>
                  <p className="text-[#25262a] text-xl md:text-2xl font-bold">
                    {account.detail.tc.followers}
                  </p>
                </div>
              </div>

              {/* 小红书数据 - 两列布局 */}
              <div className="grid grid-cols-2 gap-4">
                {/* 小红书粉丝数 */}
                <div className="bg-[#ebecf1] rounded-[20px] p-4 flex flex-col justify-center">
                  <p className="text-[#a5a5a9] text-sm md:text-base font-normal mb-1">
                    小红书粉丝数
                  </p>
                  <p className="text-[#25262a] text-lg md:text-2xl font-bold">
                    {account.detail.xiaohongshu.followers}
                  </p>
                </div>

                {/* 小红书获赞与收藏 */}
                <div className="bg-[#ebecf1] rounded-[20px] p-4 flex flex-col justify-center">
                  <p className="text-[#a5a5a9] text-sm md:text-base font-normal mb-1">
                    小红书获赞与收藏
                  </p>
                  <p className="text-[#25262a] text-lg md:text-2xl font-bold">
                    {account.detail.xiaohongshu.data}
                  </p>
                </div>
              </div>

              {/* 抖音数据 - 两列布局 */}
              <div className="grid grid-cols-2 gap-4 md:col-span-2">
                {/* 抖音粉丝数 */}
                <div className="bg-[#ebecf1] rounded-[20px] p-4 flex flex-col justify-center">
                  <p className="text-[#a5a5a9] text-sm md:text-base font-normal mb-1">抖音粉丝数</p>
                  <p className="text-[#25262a] text-lg md:text-2xl font-bold">
                    {account.detail.douyin.followers}
                  </p>
                </div>

                {/* 抖音获赞与收藏 */}
                <div className="bg-[#ebecf1] rounded-[20px] p-4 flex flex-col justify-center">
                  <p className="text-[#a5a5a9] text-sm md:text-base font-normal mb-1">
                    抖音获赞与收藏
                  </p>
                  <p className="text-[#25262a] text-lg md:text-2xl font-bold">
                    {account.detail.douyin.data}
                  </p>
                </div>
              </div>
            </div>

            {/* 底部链接区域 */}
            <div className="mt-6 flex gap-4">
              <a
                href={account.detail.tc.link}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-[#25262a] text-white rounded-full text-sm hover:bg-[#3a3b3f] transition-colors"
              >
                访问公众号
              </a>
              <a
                href={account.detail.xiaohongshu.link}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-[#25262a] text-white rounded-full text-sm hover:bg-[#3a3b3f] transition-colors"
              >
                访问小红书
              </a>
              <a
                href={account.detail.douyin.link}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-[#25262a] text-white rounded-full text-sm hover:bg-[#3a3b3f] transition-colors"
              >
                访问抖音
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function AccountsPage() {
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);

  const openDetail = (account: Account) => {
    setSelectedAccount(account);
  };

  const closeDetail = () => {
    setSelectedAccount(null);
  };

  return (
    <div className="h-full pb-4">
      <div className="grid grid-rows-2 h-full">
        {/* 只渲染前两行 */}
        {rows.slice(0, 2).map((row, rowIndex) => (
          <div key={`row-${rowIndex}`} className="grid grid-cols-5 w-full h-full">
            {/* 每行有5个位置 */}
            {[0, 1, 2, 3, 4].map((colPosition) => {
              // 查找当前位置是否有卡片
              const item = row.find((item) => item.position === colPosition);

              return (
                <div key={`cell-${rowIndex}-${colPosition}`} className="col-span-1 h-full">
                  {item && <Card account={item.account} onOpenDetail={openDetail} />}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* 详情模态窗口 */}
      <AnimatePresence>
        {selectedAccount && <DetailModal account={selectedAccount} onClose={closeDetail} />}
      </AnimatePresence>
    </div>
  );
}
