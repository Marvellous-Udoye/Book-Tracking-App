export interface Book {
  id: string;
  title: string;
  author: string;
  status: 'reading' | 'to-read' | 'completed';
  description: string;
  coverImage: string;
}