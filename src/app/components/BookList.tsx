import { filter } from 'framer-motion/client';
import { Book } from '../types/book';
import BookCard from './BookCard';

interface BookListProps {
  books?: Book[];
  filteredBooks?: Book[];
  onBookSelect: (id: string) => void;
}

const BookList: React.FC<BookListProps> = ({ books, filteredBooks, onBookSelect }) => {
  return (
    <div className='p-4 sm:p-0'>
      <h2 className="hidden text-xl font-semibold mb-4">My Books</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books &&
          <>
            {books.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onClick={() => onBookSelect(book.id)}
              />
            ))}</>}
        {filteredBooks &&
          <>
            {filteredBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onClick={() => onBookSelect(book.id)}
              />
            ))}</>
        }
      </div>
    </div>
  );
};

export default BookList;
