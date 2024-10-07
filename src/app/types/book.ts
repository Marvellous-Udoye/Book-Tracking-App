export interface Book {
  id: string;
  title: string;
  author: string;
  status: 'Reading' | 'To-read' | 'Completed';
  description: string;
  coverImage: string;
}