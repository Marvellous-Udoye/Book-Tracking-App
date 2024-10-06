import { useState } from 'react';
import { Book } from '../types/book';

interface AddBookFormProps {
  onAddBook: (book: Omit<Book, 'id' | 'addedDate'>) => void;
}

const AddBookForm: React.FC<AddBookFormProps> = ({ onAddBook }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [status, setStatus] = useState<'reading' | 'to-read' | 'completed'>('to-read');
  const [coverImage, setCoverImage] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddBook({ title, author, status, coverImage, description });
    // Clear form
    setTitle('');
    setAuthor('');
    setStatus('to-read');
    setCoverImage('');
    setDescription('');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-8 space-y-6">
        <h1 className="text-3xl font-extrabold text-gray-900 text-center">Add a New Book</h1>
        <p className="text-gray-600 text-center">Fill out the form below to add a new book to your collection.</p>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block font-bold text-gray-700">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border rounded-lg p-3 w-full focus:outline-none focus:border-blue-600 transition-all duration-300"
              required
            />
          </div>

          {/* Author */}
          <div>
            <label className="block font-bold text-gray-700">Author</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="border rounded-lg p-3 w-full focus:outline-none focus:border-blue-600 transition-all duration-300"
              required
            />
          </div>

          {/* Cover Image */}
          <div>
            <label className="block font-bold text-gray-700">Cover Image URL</label>
            <input
              type="text"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              className="border rounded-lg p-3 w-full focus:outline-none focus:border-blue-600 transition-all duration-300"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block font-bold text-gray-700">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as any)}
              className="border rounded-lg p-3 w-full focus:outline-none focus:border-blue-600 transition-all duration-300"
            >
              <option value="to-read">To Read</option>
              <option value="reading">Reading</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block font-bold text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border rounded-lg p-3 w-full focus:outline-none focus:border-blue-600 transition-all duration-300"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-600 text-white py-3 px-6 rounded-lg w-full font-semibold hover:bg-blue-700 transition-all duration-300"
          >
            Add Book
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBookForm;
