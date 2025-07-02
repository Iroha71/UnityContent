export interface Category {
  name: string;
  id: string;
  count: number | 0;
}

export interface CardProps {
  slug: string;
  title: string;
  description: string;
  thumbnail: string;
  category: { id: string; name: string };
}

export const CATEGORIES = [
  { id: 'env', name: '地形・環境' },
  { id: 'design', name: '設計' },
  { id: 'ui', name: 'UI' },
  { id: 'tool', name: 'ツール・テンプレート' },
  { id: 'controller', name: 'キャラ操作' },
  { id: 'tips', name: 'TIPS' },
  { id: 'ai', name: 'AI' },
  { id: 'combat', name: '戦闘' },
  { id: 'shader', name: 'シェーダー' },
]