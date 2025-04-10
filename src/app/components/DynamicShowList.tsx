"use client"; // Mark this as a Client Component

import React, { useState, useEffect } from 'react';
import ShowList from './ShowList'; // Import ShowList directly

// Define the loading component
const LoadingComponent = () => <div className="text-center p-10">Loading shows...</div>;

export default function DynamicShowList() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // This effect runs only on the client, after the initial render
    setIsMounted(true);
  }, []); // Empty dependency array ensures it runs only once

  // Before the component has mounted on the client, render the loading state
  // This ensures the initial client render matches the server render
  if (!isMounted) {
    return <LoadingComponent />;
  }

  // After mounting, render the actual ShowList component
  return <ShowList />;
}
