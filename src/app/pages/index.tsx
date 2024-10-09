"use client";

import { useState } from 'react';
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

  return (
    <Provider store={store}>
      <div className="container mx-auto p-0 sm:p-6">
        {/* <h1 className="text-center text-lg sm:text-2xl font-bold mb-2 sm:mb-6">Book Tracking App</h1> */}

        <div className="mb-6">
          <AddBookForm onAddBook={addBook} />
        </div>

        <div>
          <BookList books={books} onBookSelect={handleBookSelect} />
        </div>
      </div>
    </Provider>
  );
};

export default BookApp;