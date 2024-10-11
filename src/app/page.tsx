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

  const displayLibrary = () => {
    setBookForm(true)
    setPage(false)
    setIsOpen(false)
  }

  const displayPage = () => {
    setBookForm(false)
    setPage(true)
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
          <ul className="hidden md:flex space-x-6 font-bold">
            <li
              onClick={displayPage}
              className="hover:text-blue-500 cursor-pointer">
              Home
            </li>
            <li>
              <p
                onClick={displayLibrary}
                className="hover:text-blue-500 cursor-pointer">
                Library
              </p>
            </li>
          </ul>
        </div>

        {/* Mobile Menu */}
        <ul className={`md:hidden ${isOpen ? 'block' : 'hidden'} mt-4 space-y-2`}>
          <li
            onClick={displayPage}
            className="block hover:bg-blue-100 px-4 py-2 cursor-pointer">
            Home
          </li>
          <li>
            <p
              onClick={displayLibrary}
              className="block hover:bg-blue-100 px-4 py-2 cursor-pointer">
              Library
            </p>
          </li>
        </ul>
      </nav>

      <main className="flex-grow">
        {page && <>
          {/* Hero Section */}
          <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-16 md:py-20">
            <div className="container mx-auto text-center">
              <h1 className="text-2xl md:text-4xl font-bold mb-4">Track Your Reading Progress</h1>
              <p className="text-base md:text-lg mb-8">Organize, manage, and track the books you&apos;re reading in one simple app.</p>
              <p
                onClick={displayLibrary}
                className="bg-white text-blue-500 px-4 md:px-6 py-2 md:py-3 rounded-full font-semibold hover:bg-gray-100 max-w-[200px] cursor-pointer mx-auto">Get Started</p>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-12 md:py-16">
            <div className="container mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-8 md:mb-12">Features you&apos;ll love</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                <div className="p-4 md:p-6 bg-white shadow-lg rounded-lg border-2">
                  <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-4">Add and organize books</h3>
                  <p className="text-gray-600 text-sm md:text-base">Easily add books to your personal library and categorize them based on genre, author, or reading status.</p>
                </div>
                <div className="p-4 md:p-6 bg-white shadow-lg rounded-lg border-2">
                  <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-4">Track reading progress</h3>
                  <p className="text-gray-600 text-sm md:text-base">Update your reading progress with each chapter and keep a timeline of your journey.</p>
                </div>
                <div className="p-4 md:p-6 bg-white shadow-lg rounded-lg border-2">
                  <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-4">Review and rate</h3>
                  <p className="text-gray-600 text-sm md:text-base">Share your thoughts on the books you&apos;ve read by leaving reviews and ratings for others to discover.</p>
                </div>
              </div>
            </div>
          </section>

          {/* App Screenshot Section */}
          <section className="bg-gray-100 py-12 md:py-16">
            <div className="container mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-8 md:mb-12">A glimpse into the app</h2>
              <div className="flex justify-center">
                <Image
                  src={'/images/Screenshot 2024-10-11 054846.png'}
                  alt="App Screenshot"
                  width={500}
                  height={200}
                  className="rounded-2xl shadow-lg w-full md:w-2/3"
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
            <li><p className="hover:text-gray-300 hover:border-b-2 hover:border-b-white transition ease duration-300 text-sm md:text-base cursor-pointer">Home</p></li>
            <li><p className="hover:text-gray-300 hover:border-b-2 hover:border-b-white transition ease duration-300 text-sm md:text-base cursor-pointer">Privacy Policy</p></li>
            <li><p className="hover:text-gray-300 hover:border-b-2 hover:border-b-white transition ease duration-300 text-sm md:text-base cursor-pointer">Contact</p></li>
          </ul>
        </div>
      </footer>

    </div>
  );
}
