import { useRef, useState } from 'react';
import { Book } from '../types/book';
import Image from 'next/image';
import CustomSelect from './CustomSelect';

interface AddBookFormProps {
  onAddBook: (book: Omit<Book, 'id'>) => void;
}

const AddBookForm: React.FC<AddBookFormProps> = ({ onAddBook }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [status, setStatus] = useState<'Reading' | 'To-read' | 'Completed'>('To-read');
  const [description, setDescription] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddBook({ title, author, status, coverImage: selectedImage || '', description });
    // Clear form
    setTitle('');
    setAuthor('');
    setStatus('To-read');
    setDescription('');
    setSelectedImage(null);
  };

  const handleDivClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-[#EFEBFF] flex items-center justify-center py-4 sm:py-8 px-4 sm:px-6 lg:px-8 rounded-xl">
      <div className="max-w-2xl w-full bg-white shadow-lg rounded-lg p-4 sm:p-8 space-y-3 sm:space-y-6">
        <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 ">Add a New Book</h1>
        <p className="text-gray-600">Fill out the form below to add a new book to your collection.</p>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block font-bold text-gray-700 text-sm sm:text-base">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border border-[#D9D9D9] rounded-lg p-2 sm:p-3 w-full focus:outline-none focus:border-blue-600 transition-all duration-300 text-sm sm:text-base"
              required
            />
          </div>

          {/* Author */}
          <div>
            <label className="block font-bold text-gray-700 text-sm sm:text-base">Author</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="border border-[#D9D9D9] rounded-lg p-2 sm:p-3 w-full focus:outline-none focus:border-blue-600 transition-all duration-300 text-sm sm:text-base"
              required
            />
          </div>

          {/* Cover Image */}
          {selectedImage ? (
            <div className="min-h-[193px] min-w-[193px] rounded-[12px] relative bg-[#EFEBFF] sm:mt-4 sm:mb-6">
              <Image
                src={selectedImage}
                alt="Selected Image"
                width={193}
                height={193}
                className="rounded-[12px] w-full h-[193px] object-cover brightness-50 sm:w-full"
              />
              <div>
                <input
                  type="file"
                  accept="image/*"
                  className="rounded-[12px] absolute inset-0 opacity-0"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />
                <div
                  onClick={handleDivClick}
                  className="absolute top-[30%] left-[20%] right-[20%] flex flex-col gap-2 cursor-pointer sm:left-[30%]"
                >
                  <svg className="mx-auto" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <path d="M33.75 6.25H6.25C5.58696 6.25 4.95107 6.51339 4.48223 6.98223C4.01339 7.45107 3.75 8.08696 3.75 8.75V31.25C3.75 31.913 4.01339 32.5489 4.48223 33.0178C4.95107 33.4866 5.58696 33.75 6.25 33.75H33.75C34.413 33.75 35.0489 33.4866 35.5178 33.0178C35.9866 32.5489 36.25 31.913 36.25 31.25V8.75C36.25 8.08696 35.9866 7.45107 35.5178 6.98223C35.0489 6.51339 34.413 6.25 33.75 6.25ZM33.75 8.75V24.8047L29.6766 20.7328C29.4444 20.5006 29.1688 20.3164 28.8654 20.1907C28.5621 20.0651 28.2369 20.0004 27.9086 20.0004C27.5802 20.0004 27.2551 20.0651 26.9518 20.1907C26.6484 20.3164 26.3728 20.5006 26.1406 20.7328L23.0156 23.8578L16.1406 16.9828C15.6718 16.5143 15.0362 16.2512 14.3734 16.2512C13.7107 16.2512 13.075 16.5143 12.6062 16.9828L6.25 23.3391V8.75H33.75ZM6.25 26.875L14.375 18.75L26.875 31.25H6.25V26.875ZM33.75 31.25H30.4109L24.7859 25.625L27.9109 22.5L33.75 28.3406V31.25ZM22.5 15.625C22.5 15.2542 22.61 14.8916 22.816 14.5833C23.022 14.275 23.3149 14.0346 23.6575 13.8927C24.0001 13.7508 24.3771 13.7137 24.7408 13.786C25.1045 13.8584 25.4386 14.037 25.7008 14.2992C25.963 14.5614 26.1416 14.8955 26.214 15.2592C26.2863 15.6229 26.2492 15.9999 26.1073 16.3425C25.9654 16.6851 25.725 16.978 25.4167 17.184C25.1084 17.39 24.7458 17.5 24.375 17.5C23.8777 17.5 23.4008 17.3025 23.0492 16.9508C22.6975 16.5992 22.5 16.1223 22.5 15.625Z" fill="white" />
                  </svg>
                  <p className="text-[16px] font-[600] text-[#fff] text-center">
                    Change Image
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="min-h-[193px] min-w-[193px] rounded-[12px] relative bg-[#EFEBFF] sm:mt-4 sm:mb-6">
              <input
                type="file"
                accept="image/*"
                className="rounded-[12px] absolute inset-0 opacity-0"
                ref={fileInputRef}
                onChange={handleFileChange}
              />
              <div
                onClick={handleDivClick}
                className="absolute top-[30%] left-[20%] right-[20%] flex flex-col gap-2 cursor-pointer sm:left-[20%] sm:right-[20%]"
              >
                <div className="flex justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <path d="M33.75 6.25H6.25C5.58696 6.25 4.95107 6.51339 4.48223 6.98223C4.01339 7.45107 3.75 8.08696 3.75 8.75V31.25C3.75 31.913 4.01339 32.5489 4.48223 33.0178C4.95107 33.4866 5.58696 33.75 6.25 33.75H33.75C34.413 33.75 35.0489 33.4866 35.5178 33.0178C35.9866 32.5489 36.25 31.913 36.25 31.25V8.75C36.25 8.08696 35.9866 7.45107 35.5178 6.98223C35.0489 6.51339 34.413 6.25 33.75 6.25ZM33.75 8.75V24.8047L29.6766 20.7328C29.4444 20.5006 29.1688 20.3164 28.8654 20.1907C28.5621 20.0651 28.2369 20.0004 27.9086 20.0004C27.5802 20.0004 27.2551 20.0651 26.9518 20.1907C26.6484 20.3164 26.3728 20.5006 26.1406 20.7328L23.0156 23.8578L16.1406 16.9828C15.6718 16.5143 15.0362 16.2512 14.3734 16.2512C13.7107 16.2512 13.075 16.5143 12.6062 16.9828L6.25 23.3391V8.75H33.75ZM6.25 26.875L14.375 18.75L26.875 31.25H6.25V26.875ZM33.75 31.25H30.4109L24.7859 25.625L27.9109 22.5L33.75 28.3406V31.25ZM22.5 15.625C22.5 15.2542 22.61 14.8916 22.816 14.5833C23.022 14.275 23.3149 14.0346 23.6575 13.8927C24.0001 13.7508 24.3771 13.7137 24.7408 13.786C25.1045 13.8584 25.4386 14.037 25.7008 14.2992C25.963 14.5614 26.1416 14.8955 26.214 15.2592C26.2863 15.6229 26.2492 15.9999 26.1073 16.3425C25.9654 16.6851 25.725 16.978 25.4167 17.184C25.1084 17.39 24.7458 17.5 24.375 17.5C23.8777 17.5 23.4008 17.3025 23.0492 16.9508C22.6975 16.5992 22.5 16.1223 22.5 15.625Z" fill="#2563eb" />
                  </svg>
                </div>
                <p className="text-[16px] font-[600] text-blue-600 text-center">
                  + Upload Image
                </p>
              </div>
            </div>
          )}

          {/* Status */}
          <CustomSelect />

          {/* Description */}
          <div>
            <label className="block font-bold text-gray-700 text-sm sm:text-base">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border border-[#D9D9D9] rounded-lg p-2 sm:p-3 w-full focus:outline-none focus:border-blue-600 transition-all duration-300 text-sm sm:text-base"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-600 text-white text-sm sm:text-base py-3 px-6 rounded-lg w-full font-semibold hover:bg-blue-700 transition-all duration-300"
          >
            Add Book
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBookForm;
