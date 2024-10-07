import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Book } from '../types/book';
import Loader from '../components/loader';

const BookDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [book, setBook] = useState<Book | null>(null);

  // Sample data to mimic fetching from a database
  const booksData: Book[] = [
    {
      id: '1',
      title: '1984',
      author: 'George Orwell',
      status: 'Completed',
      description: 'Dystopian novel about totalitarian regime.',
      coverImage: '',
    },
    {
      id: '2',
      title: 'Brave New World',
      author: 'Aldous Huxley',
      status: 'Reading',
      description: 'Dystopian novel set in a futuristic world.',
      coverImage: '',
    },
  ];

  useEffect(() => {
    if (id) {
      const foundBook = booksData.find((book) => book.id === id);
      setBook(foundBook || null);
    }
  }, [booksData, id]);

  if (!book) {
    return (
      <div className="container mx-auto p-6">
        <Loader />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">{book.title}</h1>
      {book.coverImage ? (
        <Image
          src={book.coverImage}
          alt={book.title}
          width={256}
          height={384}
          className="object-cover mb-4"
        />
      ) : (
        <div className="h-64 w-48 bg-gray-200 flex items-center justify-center mb-4">
          <span className="text-gray-500">No cover image</span>
        </div>
      )}
      <p className="text-lg font-semibold">Author: {book.author}</p>
      <p className="text-sm text-gray-600">Status: {book.status}</p>
      <p className="mt-4">{book.description}</p>
    </div>
  );
};

export default BookDetails;