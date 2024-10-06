// pages/[id].tsx

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Book } from '../types/book';

const BookDetails = () => {
  const router = useRouter();
  const { id } = router.query; // Extract id from query
  const [book, setBook] = useState<Book | null>(null);

  // Sample data to mimic fetching from a database
  const booksData: Book[] = [
    {
      id: '1',
      title: '1984',
      author: 'George Orwell',
      status: 'completed',
      description: 'Dystopian novel about totalitarian regime.',
      coverImage: 'https://covers.openlibrary.org/b/id/1538183-L.jpg',
    },
    {
      id: '2',
      title: 'Brave New World',
      author: 'Aldous Huxley',
      status: 'reading',
      description: 'Dystopian novel set in a futuristic world.',
      coverImage: 'https://covers.openlibrary.org/b/id/1966853-L.jpg',
    },
  ];

  useEffect(() => {
    if (id) {
      const foundBook = booksData.find((book) => book.id === id);
      setBook(foundBook || null);
    }
  }, [id]);

  if (!book) {
    return <div className="container mx-auto p-6">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">{book.title}</h1>
      <img src={book.coverImage} alt={book.title} className="h-64 object-cover mb-4" />
      <p className="text-lg font-semibold">Author: {book.author}</p>
      <p className="text-sm text-gray-600">Status: {book.status}</p>
      <p className="mt-4">{book.description}</p>
    </div>
  );
};

export default BookDetails;
