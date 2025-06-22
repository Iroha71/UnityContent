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