"use client"

import Image from "next/image";
import { Suspense, useState } from "react";
import Loader from "./components/loader";
import BookApp from "./pages";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(true);
  const [bookForm, setBookForm] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const displayAddBook = () => {
    setBookForm(true)
    setPage(false)
    setIsOpen(false)
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <nav className="bg-white border-b-2 p-4">
        <div className="relative container mx-auto flex justify-between items-center">
          <p className="text-xl font-semibold text-blue-600">Book Tracker</p>

          {/* Hamburger Button */}
          <button className="md:hidden block text-blue-600" onClick={toggleMenu}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-6">
            <li><p className="hover:text-blue-500 cursor-pointer">Home</p></li>
            <li><p onClick={displayAddBook} className="hover:text-blue-500 cursor-pointer">Library</p></li>
          </ul>
        </div>

        {/* Mobile Menu */}
        <ul className={`md:hidden ${isOpen ? 'block' : 'hidden'} mt-4 space-y-2`}>
          <li><p className="block hover:bg-blue-100 px-4 py-2 cursor-pointer">Home</p></li>
          <li><p onClick={displayAddBook} className="block hover:bg-blue-100 px-4 py-2 cursor-pointer">Library</p></li>
        </ul>
      </nav>

      <main className="flex-grow">
        {page && <>
          {/* Hero Section */}
          <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-16 md:py-20">
            <div className="container mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Track Your Reading Progress</h1>
              <p className="text-base md:text-lg mb-8">Organize, manage, and track the books you&apos;re reading in one simple app.</p>
              <a href="#" className="bg-white text-blue-500 px-4 md:px-6 py-2 md:py-3 rounded-full font-semibold hover:bg-gray-100">Get Started</a>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-12 md:py-16">
            <div className="container mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-8 md:mb-12">Features You&apos;ll Love</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                <div className="p-4 md:p-6 bg-white shadow-md rounded-lg">
                  <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-4">Add & Organize Books</h3>
                  <p className="text-gray-600 text-sm md:text-base">Easily add books to your personal library and categorize them based on genre, author, or reading status.</p>
                </div>
                <div className="p-4 md:p-6 bg-white shadow-md rounded-lg">
                  <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-4">Track Reading Progress</h3>
                  <p className="text-gray-600 text-sm md:text-base">Update your reading progress with each chapter and keep a timeline of your journey.</p>
                </div>
                <div className="p-4 md:p-6 bg-white shadow-md rounded-lg">
                  <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-4">Review & Rate</h3>
                  <p className="text-gray-600 text-sm md:text-base">Share your thoughts on the books you&apos;ve read by leaving reviews and ratings for others to discover.</p>
                </div>
              </div>
            </div>
          </section>

          {/* App Screenshot Section */}
          <section className="bg-gray-100 py-12 md:py-16">
            <div className="container mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-8 md:mb-12">A Glimpse Into The App</h2>
              <div className="flex justify-center">
                <Image
                  src={'/path-to-image.png'}
                  alt="App Screenshot"
                  width={500}
                  height={500}
                  className="rounded-lg shadow-lg w-full md:w-2/3"
                />
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="py-12 md:py-16">
            <div className="container mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-8 md:mb-12">What our users are saying</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div className="bg-white shadow-md rounded-lg p-4 md:p-6">
                  <p className="text-gray-600 text-sm md:text-base">&quot;The Book Tracker app has completely transformed the way I organize my reading. It&apos;s so easy to use!&quot;</p>
                  <h3 className="text-base md:text-lg font-semibold mt-2 md:mt-4">- Sarah W.</h3>
                </div>
                <div className="bg-white shadow-md rounded-lg p-4 md:p-6">
                  <p className="text-gray-600 text-sm md:text-base">&quot;I love being able to track my progress and see how much I&apos;ve read. Highly recommended for all book lovers!&quot;</p>
                  <h3 className="text-base md:text-lg font-semibold mt-2 md:mt-4">- John D.</h3>
                </div>
              </div>
            </div>
          </section>
        </>}

        {bookForm &&
          <Suspense fallback={<Loader />}>
            <BookApp />
          </Suspense>}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto text-center">
          <p className="mb-4 text-sm md:text-base">© 2024 Book Tracker. All rights reserved.</p>
          <ul className="flex justify-center space-x-4">
            <li><a href="" className="hover:text-gray-300 hover:border-b-2 hover:border-b-white transition ease duration-300 text-sm md:text-base">Home</a></li>
            <li><a href="" className="hover:text-gray-300 hover:border-b-2 hover:border-b-white transition ease duration-300 text-sm md:text-base">Privacy Policy</a></li>
            <li><a href="" className="hover:text-gray-300 hover:border-b-2 hover:border-b-white transition ease duration-300 text-sm md:text-base">Contact</a></li>
          </ul>
        </div>
      </footer>

    </div>
  );
}
