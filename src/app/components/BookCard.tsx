import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Book } from '../types/book';

interface BookCardProps {
  book: Book;
  onClick: () => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onClick }) => {
  const [imgSrc, setImgSrc] = useState<string>('/placeholder-book-cover.jpg');

  useEffect(() => {
    if (book.coverImage && book.coverImage.startsWith('data:image')) {
      setImgSrc(book.coverImage);
    } else if (book.coverImage) {
      setImgSrc(book.coverImage);
    }
  }, [book.coverImage]);

  return (
    <div
      onClick={onClick}
      className="cursor-pointer border border-[2px] rounded-lg shadow-lg p-4 hover:shadow-2xl transition-shadow"
    >
      <div className="relative h-48 w-full">
        <Image
          src={imgSrc}
          alt={book.title}
          layout="fill"
          objectFit="cover"
          className="rounded"
        />
      </div>
      <h3 className="text-lg font-bold mt-2">{book.title}</h3>
      <p className="text-sm text-gray-600">By {book.author}</p>
      <p className="text-sm mt-2 text-green-600">Status: {book.status}</p>
    </div>
  );
};

export default BookCard;