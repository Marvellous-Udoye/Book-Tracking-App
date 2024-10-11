import { Book } from '../types/book';
import BookCard from './BookCard';

interface BookListProps {
  filteredBooks?: Book[];
  onBookSelect: (id: string) => void;
}

const BookList: React.FC<BookListProps> = ({ filteredBooks, onBookSelect }) => {
  return (
    <div className='p-4 sm:p-0'>
      <h2 className="text-xl font-semibold mb-4">Library</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
