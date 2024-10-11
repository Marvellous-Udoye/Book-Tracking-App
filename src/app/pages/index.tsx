"use client";

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Provider } from "react-redux";
import AddBookForm from '../components/AddBookForm';
import BookList from '../components/BookList';
import { bugAdded, bugResolved } from '../store/action';
import store from '../store/store';
import { Book } from '../types/book';
import useFetch from '../hooks/fetchData';
import Loader from '../components/loader';

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


  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [selectedValue, setSelectedValue] = useState('All');
  const [isOpen, setIsOpen] = useState(false);
  const [isAddBookClicked, setIsAddBookClicked] = useState(true);
  const [addForm, setAddForm] = useState(false);
  const { data: books, loading, error } = useFetch('/data.json');

  const router = useRouter();

  // Function to add a new book
  const addBook = (book: Omit<Book, 'id'>) => {
    const newBook = { ...book, id: (books.length + 1).toString() };
    setFilteredBooks((prevBooks) => [...prevBooks, newBook]);
  };

  const handleBookSelect = (id: string) => {
    console.log('Selected book ID:', id);
    router.push(`/${id}`);
  };

  const handleAddBook = () => {
    setIsAddBookClicked(!isAddBookClicked);
    setAddForm(true);
    setSearchTerm('');
    setSelectedValue('All');
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setIsAddBookClicked(true);
    setAddForm(false);
  };

  const handleFilterChange: React.MouseEventHandler<HTMLDivElement> = () => {
    setIsOpen(!isOpen);
    setIsAddBookClicked(true);
    setAddForm(false);
  };

  const options = [
    { value: "All", label: "All" },
    { value: "To-read", label: "To Read" },
    { value: "Reading", label: "Reading" },
    { value: "Completed", label: "Completed" },
  ];

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    setStatusFilter(value);
    setIsOpen(false);
  };

  useEffect(() => {
    if (books.length === 0)
      return
    <p>Unable to load book</p>;

    let filtered = books;

    // Search filtering
    if (searchTerm) {
      filtered = filtered.filter(
        (book: Book) =>
          book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filtering
    if (statusFilter !== 'All') {
      filtered = filtered.filter(
        (book: Book) => book.status.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    setFilteredBooks(filtered);
  }, [searchTerm, statusFilter, books]);

  if (loading) return <p><Loader /></p>;
  if (error) return <p>{error}</p>;

  return (
    <Provider store={store}>
      <div className="container mx-auto pt-4 sm:p-6">

        <div className='px-4 sm:px-0 mb-2 sm:mb-6'>
          {/* Search Bar */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4">
            <input
              type="text"
              placeholder="Search by title or author"
              value={searchTerm}
              onChange={handleSearchChange}
              className="border border-[#D9D9D9] rounded-lg p-2 sm:p-3 w-full focus:outline-none focus:border-blue-600 transition-all duration-300 text-sm sm:text-base"
            />
          </div>

          {/* Custom Dropdown */}
          <div
            className="relative border border-[#D9D9D9] rounded-lg p-2 sm:p-3 w-full flex justify-between items-center cursor-pointer"
            onClick={handleFilterChange}
          >
            <span className='text-sm sm:text-base'>
              {options.find(option => option.value === selectedValue)?.label}
            </span>
            <span className="absolute right-2 sm:right-6">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                <path d="M7 10l5 5 5-5H7z" />
              </svg>
            </span>
          </div>

          {/* Dropdown Options */}
          {isOpen && (
            <ul className="absolute border rounded-lg bg-white mt-1 w-[91.5%] z-10 border-blue-600">
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

        {isAddBookClicked && <div className='flex justify-end mb-2 sm:mb-6 mr-4 sm:mr-0'>
          <button
            onClick={handleAddBook}
            className="text-[12px] sm:text-base bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 sm:px-6 rounded-lg shadow-md transition duration-300 ease-in-out focus:outline-none "
          >
            Add Book
          </button>
        </div>}

        {/* Add Book Form */}
        {addForm && <div className="mb-6">
          <AddBookForm onAddBook={addBook} />
        </div>}

        {/* Book List */}
        <div>
          <BookList filteredBooks={filteredBooks} onBookSelect={handleBookSelect} />
        </div>
      </div>
    </Provider>
  );
};

export default BookApp;
