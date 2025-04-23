'use client';

import clsx from 'clsx';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { memo, useCallback, useEffect, useState } from 'react';

export const navItems = [
  {
    label: 'Creative & Motion',
    items: [
      {
        label: 'CGI',
        href: '/creation/icg',
      },
      {
        label: 'CG',
        href: '/creation/cg',
      },
      {
        label: 'AIGC',
        href: '/creation/motion',
      },
    ],
  },
  {
    label: 'Photography',
    items: [
      {
        label: 'KV制作',
        href: '/photography/kv',
      },
      {
        label: '短视频制作',
        href: '/photography/video',
      },
    ],
  },
  {
    label: 'Visual Design',
    items: [
      {
        label: '公众号创意排版',
        href: '/visual-design/wechat',
      },
    ],
  },
  {
    label: 'Social Media',
    items: [
      {
        label: '媒体矩阵',
        href: '/social-media/account',
      },
      {
        label: '人物专访',
        href: '/social-media/interview',
      },
      {
        label: '品牌活动',
        href: '/social-media/brand-activity',
      },
      {
        label: '深挖好物',
        href: '/social-media/deep-dive',
      },
      {
        label: '品牌解析',
        href: '/social-media/brand-analysis',
      },
      {
        label: '运动社群',
        href: '/social-media/sports-community',
      },
    ],
  },
  {
    label: 'About Us',
    items: [
      {
        label: '团队成就',
        href: '/aboutus/team',
      },
      {
        label: 'Clients',
        href: '/aboutus/clients',
      },
    ],
  },
];

// 优化动画变体 - 减少属性变化，简化过渡
const sectionVariants: Variants = {
  expanded: {
    height: 'auto',
    opacity: 1,
    transition: { duration: 0.15, ease: [0.25, 0.1, 0.25, 1] }, // 使用更简单的缓动函数
  },
  collapsed: {
    height: 0,
    opacity: 0,
    transition: { duration: 0.1, ease: [0.25, 0.1, 0.25, 1] }, // 缩短折叠动画时间
  },
};

// 优化子项动画 - 移除延迟级联效果，统一显示
const itemVariants: Variants = {
  hidden: { opacity: 0 }, // 移除x轴变换，只保留透明度变化
  visible: {
    opacity: 1,
    transition: { duration: 0.1 }, // 减少动画时间
  },
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
    // 添加点击时模糊焦点的处理
    const handleClick = (e: React.MouseEvent) => {
      // 在移动后立即模糊所有焦点元素
      setTimeout(() => {
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur();
        }
      }, 10);
    };

    return (
      <Link
        href={href}
        className="block w-full select-none"
        onClick={handleClick}
        draggable={false}
      >
        <span
          className={`transition-colors duration-200 select-none ${
            isSubItem && `text-3xl font-bold text-white`
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

    // 添加点击后模糊处理
    const handleSectionClick = () => {
      toggleSection(section.label);
      // 模糊所有焦点
      setTimeout(() => {
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur();
        }
      }, 10);
    };

    return (
      <div
        className={clsx(
          'w-full text-left border-y py-2 flex flex-col justify-between select-none',
          isExpanded ? 'border-white flex-1' : 'border-white/20'
        )}
      >
        {/* 分类标题 - 使用mousedown而不是click来避免焦点问题 */}
        <div
          className="w-full text-left py-2 hover:pl-1 transition-all duration-150 select-none cursor-pointer"
          onMouseDown={handleSectionClick}
          draggable={false}
        >
          <span
            className={`font-inter italic font-black transition-colors duration-200  select-none ${
              isExpanded
                ? 'text-white text-4xl text-nowrap'
                : 'text-white/50 hover:text-white text-3xl'
            }`}
          >
            {section.label}
          </span>
        </div>

        {/* 子项目列表 - 使用will-change提升性能 */}
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial="collapsed"
              animate="expanded"
              exit="collapsed"
              variants={sectionVariants}
              className="overflow-hidden will-change-[height,opacity]"
            >
              <div className="flex flex-col gap-4 py-2">
                {section.items
                  .filter((item) => item.href)
                  .map((item) => (
                    <motion.div
                      key={item.href}
                      initial="hidden"
                      animate="visible"
                      variants={itemVariants}
                      className="flex items-center gap-2 select-none"
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

  // 添加全局点击处理器来移除焦点
  useEffect(() => {
    const clearFocus = () => {
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    };

    // 添加全局点击监听器
    document.addEventListener('mousedown', clearFocus);
    // 添加路由变化监听
    const handleRouteChange = () => {
      setTimeout(clearFocus, 50);
    };

    window.addEventListener('popstate', handleRouteChange);

    return () => {
      document.removeEventListener('mousedown', clearFocus);
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

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
      if (expandedSection !== label) {
        setExpandedSection(label);

        const section = navItems.find((item) => item.label === label);
        if (section && section.items.length > 0) {
          const firstItem = section.items[0];
          if (firstItem.href) {
            router.push(firstItem.href);
          }
        }
      } else {
        setExpandedSection(null);
      }
    },
    [expandedSection, router]
  );

  return (
    <>
      <style jsx global>{`
        * {
          -webkit-tap-highlight-color: transparent !important;
          outline: none !important;
        }

        /* 针对所有交互元素彻底禁用焦点样式 */
        a,
        button,
        [role='button'],
        input,
        select,
        textarea {
          outline: none !important;
          box-shadow: none !important;
          -webkit-appearance: none !important;
        }

        a:focus,
        button:focus,
        [role='button']:focus,
        input:focus,
        select:focus,
        textarea:focus,
        a:active,
        button:active,
        [role='button']:active,
        input:active,
        select:active,
        textarea:active,
        a:focus-visible,
        button:focus-visible,
        [role='button']:focus-visible,
        input:focus-visible,
        select:focus-visible,
        textarea:focus-visible {
          outline: none !important;
          box-shadow: none !important;
          -webkit-appearance: none !important;
        }

        /* 针对Firefox特殊处理 */
        ::-moz-focus-inner {
          border: 0 !important;
        }
      `}</style>

      <nav
        className="flex flex-col h-full will-change-transform select-none"
        onMouseDown={() =>
          document.activeElement instanceof HTMLElement && document.activeElement.blur()
        }
      >
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
    </>
  );
}
