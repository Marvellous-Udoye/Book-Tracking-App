"use client";

import { useState } from 'react';
import BookList from '../components/BookList';
import AddBookForm from '../components/AddBookForm';
import { Book } from '../types/book';
import { useRouter } from 'next/navigation';

const Home = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const router = useRouter();

    const addBook = (book: Omit<Book, 'id'>) => {
        setBooks((prevBooks) => [
            ...prevBooks,
            { ...book, id: (prevBooks.length + 1).toString() }, // Fix to call toString()
        ]);
    };

    const handleBookSelect = (id: string) => {
        console.log('Selected book ID:', id);
        router.push(`/${id}`);
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-center text-2xl font-bold mb-6">Book Tracking App</h1>

            <div className="mb-6">
                <h2 className="text-center text-xl font-semibold mb-4">Add a New Book</h2>
                <AddBookForm onAddBook={addBook} />
            </div>

            <div>
                <BookList books={books} onBookSelect={handleBookSelect} />
            </div>
        </div>
    );
};

export default Home;
