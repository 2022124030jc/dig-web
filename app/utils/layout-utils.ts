import { ItemSpan } from './type';

// 使用固定的类名映射而不是动态生成
export const spanClassMap: Record<number, string> = {
  2: 'sm:col-span-2 md:col-span-2 lg:col-span-2',
  3: 'sm:col-span-2 md:col-span-3 lg:col-span-3',
  4: 'sm:col-span-2 md:col-span-3 lg:col-span-4',
};

// 宽度比例映射
export const widthClassMap: Record<string, string> = {
  '1/2': 'sm:col-span-1 md:col-span-2 lg:col-span-2',
  '1/3': 'sm:col-span-1 md:col-span-1 lg:col-span-1',
  '1/4': 'sm:col-span-1 md:col-span-1 lg:col-span-1',
  '2/3': 'sm:col-span-2 md:col-span-2 lg:col-span-3',
  '3/4': 'sm:col-span-2 md:col-span-3 lg:col-span-3',
  '1/1': 'sm:col-span-2 md:col-span-3 lg:col-span-4',
};

// 获取项目的类名
export function getItemClassName(
  item: { span?: number; width?: ItemSpan },
  baseClassName: string = 'item flex flex-col'
): string {
  let className = baseClassName;

  // 优先使用 width 属性
  if (item.width && widthClassMap[item.width]) {
    className += ` ${widthClassMap[item.width]}`;
  }
  // 如果没有 width 属性，则使用 span 属性
  else if (item.span && spanClassMap[item.span]) {
    className += ` ${spanClassMap[item.span]}`;
  }

  return className;
}
