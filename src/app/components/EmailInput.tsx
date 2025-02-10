"use client"

import React, { useState } from 'react';
import { db } from './FirebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

const EmailInput: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const isValidEmail = (email: string): boolean => {
    // Basic email validation regex (can be improved)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      setMessage('Please enter a valid email address.');
      return;
    }

    try {
      const docRef = await addDoc(collection(db, 'newsletterEmails'), {
        email: email,
      });
      setMessage('Thank you for subscribing!');
      setEmail(''); // Clear the input field
      console.log('Document written with ID: ', docRef.id);
    } catch (error) {
      setMessage('An error occurred. Please try again.');
      console.error('Error adding document: ', error);
    }
  };

  return (
    <div className="flex justify-center w-full max-w-[400px]">
      <form onSubmit={handleSubmit} className="mb-16 w-full mx-auto">
        <label htmlFor="email" className="block text-sm font-medium">
          Subscribe to our newsletter:
        </label>
        <div className="mt-1 flex rounded-md shadow-sm">
          <input
            type="email"
            name="email"
            id="email"
            className="pl-3 focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-l-md sm:text-sm border-gray-300 text-black max-w-[400px]"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
          className="inline-flex items-center px-2 py-2 rounded-r-md transition-colors duration-200 hover:bg-light-teal/5 border border-light-teal/30 hover:border-light-teal/60 hover:shadow-lg hover:shadow-light-teal/20"
        >
          Subscribe
        </button>
        </div>
        {message && <p className="mt-2 text-sm text-gray-500">{message}</p>}
      </form>
    </div>
  );
};

export default EmailInput;
