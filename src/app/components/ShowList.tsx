"use client";

import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from './FirebaseConfig'; // Import Firestore instance
import ShowCard, { Show } from './ShowCard'; // Import ShowCard and Show interface
// import Loading from './Loading'; // Optional: Add a loading indicator

const ShowList: React.FC = () => {
  const [shows, setShows] = useState<Show[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isDataFetched, setIsDataFetched] = useState(false); // Track if fetch attempt completed

  useEffect(() => {
    const fetchShows = async () => {
      // Removed setLoading(true)
      setError(null);
      try {
        // Query Firestore - fetching 'upcomingShows' collection
        // Optional: Add orderBy('showDate', 'asc') if showDate is a Timestamp
        const showsCollection = collection(db, 'upcomingShows');
        const q = query(showsCollection, orderBy("showtime", "asc")); // Order by the new showtime field
        const querySnapshot = await getDocs(q); // Use the ordered query
        // console.log("Raw Firestore Snapshot:", querySnapshot.docs.map(d => d.data())); // Log raw data

        const showsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          // Ensure all required fields from the Show interface are present
          // Add type assertions or default values if necessary
        })) as Show[]; // Asserting the type for now
        // console.log("Mapped showsData:", showsData); // Log mapped data

        // Basic validation to ensure essential fields exist - REINSTATING FILTER
        const validShows = showsData.filter(show => show.id && show.showName && show.showDate && show.ticketLink && show.briefDescription && show.theatreName);
        // const validShows = showsData; // Filter bypassed
        // console.log("Filtered validShows (filter reinstated):", validShows); // Log filtered data

        setShows(validShows);

      } catch (err) {
        console.error("Error fetching shows:", err);
        setError("Failed to load shows. Please try again later.");
      } finally {
        setIsDataFetched(true); // Mark fetch attempt as complete
      }
    };

    fetchShows();
  }, []); // Empty dependency array means this runs once on mount

  // Always render the container div
  // console.log("Rendering ShowList with shows state:", shows); // Log state before render
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {error ? (
        // Show error if it exists - using orange text
        <div className="sm:col-span-2 lg:col-span-3 text-center p-10 text-orange">{error}</div>
      ) : isDataFetched && shows.length === 0 ? (
        // Show "No shows" only after fetch completes and confirms no shows - using light-teal text
        <div className="sm:col-span-2 lg:col-span-3 text-center p-10 text-light-teal/70">No upcoming shows announced yet. Stay tuned!</div>
      ) : shows.length > 0 ? (
        // Render show cards if shows exist
        shows.map(show => (
          <ShowCard key={show.id} show={show} />
        ))
      ) : (
        // Render nothing while data is fetching (after mount, before fetch completes)
        null // Or <></>
      )}
    </div>
  );
};

export default ShowList;
