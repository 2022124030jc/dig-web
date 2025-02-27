import PageTransition from '@/app/components/page-transition';

export default function Creation() {
  return (
    <PageTransition>
      <div className="text-white">
        <h1 className="text-3xl font-bold mb-6">创作</h1>
        <p className="mb-4">这是创作页面的内容，展示我们的创意和动态内容。</p>
        {/* 其他内容 */}
      </div>
    </PageTransition>
  );
}
