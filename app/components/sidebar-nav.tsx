'use client';

import clsx from 'clsx';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { memo, useCallback, useState } from 'react';
import { navItems } from '../config/sidebar';

// 动画变体定义 - 简化过渡效果
const sectionVariants: Variants = {
  expanded: {
    height: 'auto',
    opacity: 1,
    transition: { duration: 0.2, ease: 'easeOut' },
  },
  collapsed: {
    height: 0,
    opacity: 0,
    transition: { duration: 0.2, ease: 'easeIn' },
  },
};

// 子项动画变体 - 降低延迟增量
const itemVariants: Variants = {
  hidden: { opacity: 0, x: -5 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.03, duration: 0.15 },
  }),
};

// 导航链接组件 - 使用memo减少重渲染
const NavLink = memo(
  ({
    href,
    children,
    isActive,
    isSubItem = false,
  }: {
    href: string;
    children: React.ReactNode;
    isActive: boolean;
    isSubItem?: boolean;
  }) => {
    return (
      <Link href={href} className="block w-full">
        <span
          className={`transition-colors duration-200 ${
            isSubItem && `text-sm md:text-base font-bold text-white`
          }`}
        >
          {children}
        </span>
      </Link>
    );
  }
);

NavLink.displayName = 'NavLink';

// 单个导航分类组件 - 分离为独立组件以减少整体重渲染
const NavSection = memo(
  ({
    section,
    isExpanded,
    toggleSection,
    pathname,
  }: {
    section: (typeof navItems)[0];
    isExpanded: boolean;
    toggleSection: (label: string) => void;
    pathname: string;
  }) => {
    // 检查链接是否为活动状态
    const isLinkActive = useCallback(
      (href: string) => {
        return pathname.startsWith(href);
      },
      [pathname]
    );

    return (
      <div
        className={clsx(
          'w-full text-left focus:outline-none border-y py-2 flex flex-col justify-between',
          isExpanded ? 'border-white flex-1' : 'border-white/20'
        )}
      >
        {/* 分类标题 */}
        <motion.button
          className="w-full text-left focus:outline-none py-2"
          onClick={() => toggleSection(section.label)}
          initial="initial"
          whileHover="hover"
          animate="initial"
          transition={{ duration: 0.15 }}
          variants={{
            initial: {},
            hover: { x: 5 },
          }}
        >
          <motion.span
            className={`font-roboto font-black transition-colors duration-200 text-xl md:text-2xl ${
              isExpanded ? 'text-white' : 'text-white/50'
            }`}
            variants={{
              initial: {
                color: isExpanded ? 'white' : 'rgba(255, 255, 255, 0.5)',
              },
              hover: {
                color: 'white',
              },
            }}
          >
            {section.label}
          </motion.span>
        </motion.button>

        {/* 子项目列表 */}
        <AnimatePresence initial={false} mode="wait">
          {isExpanded && (
            <motion.div
              initial="collapsed"
              animate="expanded"
              exit="collapsed"
              variants={sectionVariants}
              className="overflow-hidden"
            >
              <div className="flex flex-col gap-4 py-2">
                {section.items
                  .filter((item) => item.href)
                  .map((item, index) => (
                    <motion.div
                      key={item.href}
                      custom={index}
                      initial="hidden"
                      animate="visible"
                      variants={itemVariants}
                      className="flex items-center gap-2"
                    >
                      <div className="min-w-[10px] flex items-center">
                        {isLinkActive(item.href) && (
                          <div className="w-[8px] h-[8px] bg-white rounded-full" />
                        )}
                      </div>
                      <NavLink href={item.href} isActive={isLinkActive(item.href)} isSubItem={true}>
                        {item.label}
                      </NavLink>
                    </motion.div>
                  ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

NavSection.displayName = 'NavSection';

// 侧边栏导航组件
export default function SidebarNav() {
  const pathname = usePathname();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const router = useRouter();

  // 自动展开当前活动分类
  const activeSection = (() => {
    if (expandedSection) return expandedSection;

    // 查找包含当前路径的分类
    const currentSection = navItems.find((section) =>
      section.items.some((item) => item.href && pathname.startsWith(item.href))
    );

    return currentSection?.label || null;
  })();

  // 切换分类展开状态并跳转到第一个子项目
  const toggleSection = useCallback(
    (label: string) => {
      // 如果当前section未展开，则展开它并导航到第一个子项目
      if (expandedSection !== label) {
        setExpandedSection(label);

        // 找到该分类下的第一个子项目并导航
        const section = navItems.find((item) => item.label === label);
        if (section && section.items.length > 0) {
          const firstItem = section.items[0];
          if (firstItem.href) {
            router.push(firstItem.href);
          }
        }
      } else {
        // 如果当前section已展开，则折叠它
        setExpandedSection(null);
      }
    },
    [expandedSection, router]
  );

  return (
    <nav className="flex flex-col h-full will-change-transform">
      {navItems.map((section) => (
        <NavSection
          key={section.label}
          section={section}
          isExpanded={section.label === activeSection}
          toggleSection={toggleSection}
          pathname={pathname}
        />
      ))}
    </nav>
  );
}
