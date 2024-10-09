"use client";

import { useEffect, useState } from 'react';
import BookList from '../components/BookList';
import AddBookForm from '../components/AddBookForm';
import { Book } from '../types/book';
import { useRouter } from 'next/navigation';
import { Provider } from "react-redux";
import store from '../store/store';
import { bugAdded, bugResolved } from '../store/action';

const BookApp = () => {
  const unsubscribe = store.subscribe(() => {
    // Subscribe method to notif the UI components to rerender when the store changes 
    // console.log("Store changed", store.getState())
  })

  store.dispatch(bugAdded("Bug 1"))
  store.dispatch(bugResolved(1))

  unsubscribe() // Calling function to unsubscribe ui component from the store, so that when an action is dispatched it doesn't re-render

  // Returns bug 2 and 3
  // store.dispatch(bugRemoved(1))
  // console.log(store.getState())

  const [books, setBooks] = useState<Book[]>([
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
    {
      id: '3',
      title: 'Faith Destroying Emperor',
      author: 'LazySageDao',
      status: 'To-read',
      description: 'Dystopian novel set in a futuristic world.',
      coverImage: '',
    },
  ]);

  const router = useRouter();

  const addBook = (book: Omit<Book, 'id'>) => {
    setBooks((prevBooks) => [
      ...prevBooks,
      { ...book, id: (prevBooks.length + 1).toString() },
    ]);
  };

  const handleBookSelect = (id: string) => {
    console.log('Selected book ID:', id);
    router.push(`/${id}`);
  };

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [filteredBooks, setFilteredBooks] = useState<Book[]>(books);
  const [selectedValue, setSelectedValue] = useState("All");
  const [isOpen, setIsOpen] = useState(false);

  const options = [
    { value: "All", label: "All" },
    { value: "Completed", label: "Completed" },
    { value: "Reading", label: "Reading" },
    { value: "To-read", label: "To Read" },
  ];

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    setStatusFilter(value);
    setIsOpen(false);
  };

  useEffect(() => {
    let filtered = books;

    // Search filtering
    if (searchTerm) {
      filtered = filtered.filter(
        (book) =>
          book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filtering
    if (statusFilter !== 'All') {
      filtered = filtered.filter(
        (book) => book.status.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    setFilteredBooks(filtered);
  }, [searchTerm, statusFilter, books]);

  return (
    <Provider store={store}>
      <div className="container mx-auto pt-4 sm:p-6">
        <div className='px-4 sm:px-0 '>
          {/* Search Bar */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4">
            <input
              type="text"
              placeholder="Search by title or author"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-[#D9D9D9] rounded-lg p-2 sm:p-3 w-full focus:outline-none focus:border-blue-600 transition-all duration-300 text-sm sm:text-base"
            />
          </div>

          {/* Custom Dropdown */}
          <div
            className="border border-[#D9D9D9] rounded-lg p-2 sm:p-3 w-full flex justify-between items-center cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className='text-sm sm:text-base'>
              {options.find(option => option.value === selectedValue)?.label}
            </span>
            <span className="absolute right-6 sm:right-12 lg:right-20">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                <path d="M7 10l5 5 5-5H7z" />
              </svg>
            </span>
          </div>

          {/* Dropdown Options */}
          {isOpen && (
            <ul className="absolute border rounded-lg bg-white mt-1 w-full z-10 border-blue-600">
              {options.map((option) => (
                <li
                  key={option.value}
                  onClick={() => handleSelect(option.value)}
                  className="p-2 hover:bg-blue-100 cursor-pointer text-sm sm:text-base"
                >
                  {option.label}
                </li>
              ))}
            </ul>
          )}

        </div>
        {/* Add Book Form */}
        <div className="my-6">
          <AddBookForm onAddBook={addBook} />
        </div>

        {/* Book List */}
        <div>
          <BookList books={books} filteredBooks={filteredBooks} onBookSelect={handleBookSelect} />
        </div>
      </div>
    </Provider>
  );
};

export default BookApp;