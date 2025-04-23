/**
 * 获取随机颜色 - 用于备选背景
 */
export const getRandomColor = (index: number) => {
  const colors = ['#1E293B', '#334155', '#0F172A', '#475569'];
  return colors[index % colors.length];
};
