import { Book } from '../types/book';

interface BookCardProps {
  book: Book;
  onClick: () => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer border rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow"
    >
      <img
        src={book.coverImage}
        alt={book.title}
        className="h-48 w-full object-cover rounded"
      />
      <h3 className="text-lg font-bold mt-2">{book.title}</h3>
      <p className="text-sm text-gray-600">By {book.author}</p>
      <p className="text-sm mt-2 text-green-600">Status: {book.status}</p>
    </div>
  );
};

export default BookCard;
