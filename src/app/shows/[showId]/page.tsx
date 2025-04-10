"use client"; // Needed for hooks like useParams, useState, useEffect

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation'; // Hook to get route parameters
import Link from 'next/link';
import Image from 'next/image';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../components/FirebaseConfig'; // Correct path for this project
import { Show } from '../../components/ShowCard'; // Correct path for this project

// Function to safely render multiline text
const renderMultilineText = (text: string | undefined) => {
  if (!text) return null;
  return text.split('\\n').map((line, index) => (
    <React.Fragment key={index}>
      {line}
      <br />
    </React.Fragment>
  ));
};

export default function ShowDetailPage() {
  const params = useParams();
  const showId = params.showId as string; // Get showId from URL

  const [show, setShow] = useState<Show | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!showId) {
      setError("Show ID not found.");
      setLoading(false);
      return;
    }

    const fetchShowDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const showDocRef = doc(db, 'upcomingShows', showId);
        const docSnap = await getDoc(showDocRef);

        if (docSnap.exists()) {
          // Combine doc ID with data and assert type
          setShow({ id: docSnap.id, ...docSnap.data() } as Show);
        } else {
          setError("Show not found.");
        }
      } catch (err) {
        console.error("Error fetching show details:", err);
        setError("Failed to load show details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchShowDetails();
  }, [showId]); // Re-run effect if showId changes

  if (loading) {
    // Using light-teal text for loading
    return <div className="container mx-auto text-center p-10 pt-24 text-light-teal">Loading show details...</div>;
  }

  if (error) {
    // Using orange text for error
    return <div className="container mx-auto text-center p-10 pt-24 text-orange">{error}</div>;
  }

  if (!show) {
    // Using light-teal text
    return <div className="container mx-auto text-center p-10 pt-24 text-light-teal">Show data is unavailable.</div>;
  }

  // Destructure show details for easier use
  const {
    showName,
    showDate,
    theatreName,
    detailedDescription,
    runtime,
    contentAdvisory,
    venueInfo,
    ticketLink,
    cast,
    showImageURL,
    photoCredit
  } = show;

  return (
    // Standardized to max-w-7xl, added pt-24 for spacing below header
    <div className="max-w-7xl mx-auto py-12 px-4 pt-24">
      {/* Using light-teal text, orange hover */}
      <Link href="/shows" className="text-light-teal hover:text-orange mb-6 inline-block">
        &larr; Back to Upcoming Shows
      </Link>

      {/* Updated image container and Image props for natural height */}
      {showImageURL && (
        <div className="w-full mb-8 rounded-lg overflow-hidden shadow-lg"> {/* Removed fixed height */}
          <Image
            src={showImageURL}
            alt={`Promo image for ${showName}`}
            width={0} // Required but set to 0 when using style width/height auto
            height={0} // Required but set to 0 when using style width/height auto
            sizes="100vw" // Indicate it spans viewport width for optimization
            style={{ width: '100%', height: 'auto' }} // Let CSS handle responsive sizing
            quality={85}
            priority // Prioritize loading the main show image
          />
        </div>
      )}
      {/* Using light-teal text for photo credit */}
      {showImageURL && photoCredit && (
          <p className="text-right text-xs text-light-teal/60 italic -mt-6 mb-8 mr-1">
            Photo Credit: {photoCredit}
          </p>
      )}

      {/* Using Klein font, uppercase, light-teal text */}
      <h1 className="text-3xl md:text-5xl font-klein uppercase font-bold text-light-teal mb-4">{showName}</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {/* Left Column (Details) */}
        <div className="md:col-span-2 space-y-4">
          {/* Using light-teal text and border */}
          <h2 className="text-xl font-semibold text-light-teal border-b border-light-teal/30 pb-2">Description</h2>
          {/* Using light-teal text */}
          <p className="text-light-teal/90 whitespace-pre-wrap">
            {renderMultilineText(detailedDescription) || renderMultilineText(show.briefDescription) || 'No description available.'}
          </p>

          {cast && cast.length > 0 && (
            <div>
              {/* Using light-teal text */}
              <h3 className="text-lg font-semibold text-light-teal mt-4">Cast</h3>
              <p className="text-light-teal/80">{cast.join(', ')}</p>
            </div>
          )}

          {contentAdvisory && (
             <div>
               {/* Using light-teal text */}
               <h3 className="text-lg font-semibold text-light-teal mt-4">Content Advisory</h3>
               <p className="text-light-teal/80">{contentAdvisory}</p>
             </div>
          )}
        </div>

        {/* Right Column (Quick Info & Tickets) */}
        <div className="space-y-4">
          <div>
            {/* Using light-teal text */}
            <h3 className="text-lg font-semibold text-light-teal">Date & Time</h3>
            <p className="text-light-teal/80">{showDate || 'TBA'}</p>
          </div>
          <div>
            {/* Using light-teal text */}
            <h3 className="text-lg font-semibold text-light-teal">Venue</h3>
            <p className="text-light-teal/80">{theatreName || 'TBA'}</p>
            {venueInfo && <p className="text-sm text-light-teal/70 mt-1">{venueInfo}</p>}
          </div>
          {runtime && (
            <div>
              {/* Using light-teal text */}
              <h3 className="text-lg font-semibold text-light-teal">Runtime</h3>
              <p className="text-light-teal/80">{runtime}</p>
            </div>
          )}
          <div className="pt-4">
            <a
              href={ticketLink}
              target="_blank"
              rel="noopener noreferrer"
              // Using teal background, white text, lighter teal hover
              className="block w-full text-center px-6 py-3 text-lg rounded-md bg-teal text-white hover:bg-light-teal/70 transition-colors duration-200 shadow-md"
            >
              Buy Tickets
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// Optional: Add metadata generation function
// export async function generateMetadata({ params }: { params: { showId: string } }) {
//   const showDocRef = doc(db, 'upcomingShows', params.showId);
//   const docSnap = await getDoc(showDocRef);
//   if (docSnap.exists()) {
//     const show = docSnap.data();
//     return {
//       title: `${show.showName} | The Fool's Guild`, // Updated title
//       description: show.briefDescription || `Details for the show: ${show.showName}`,
//     };
//   }
//   return {
//     title: "Show Not Found | The Fool's Guild", // Updated title
//     description: "The show details could not be found.",
//   };
// }
