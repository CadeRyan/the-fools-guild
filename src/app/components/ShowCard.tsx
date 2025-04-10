import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Define the structure of a show object based on Firestore fields
export interface Show {
  id: string; // Firestore document ID
  showName: string;
  showDate: string; // Consider using Timestamp and formatting it
  theatreName: string;
  briefDescription: string;
  detailedDescription?: string; // Added
  runtime?: string; // Added
  contentAdvisory?: string; // Added
  venueInfo?: string; // Added
  ticketLink: string;
  cast?: string[]; // Added (Array of strings)
  showImageURL?: string; // Optional image
  photoCredit?: string; // Added for photo credit
}

interface ShowCardProps {
  show: Show;
}

const ShowCard: React.FC<ShowCardProps> = ({ show }) => {
  return (
    // Using light-teal border, dark-blue-2 background
    <div className="border border-light-teal/30 rounded-lg overflow-hidden shadow-md bg-dark-blue-2/50 flex flex-col h-full transition-shadow duration-300 hover:shadow-xl hover:shadow-light-teal/10">
      {show.showImageURL && (
        <div className="relative h-48 w-full">
          <Image
            src={show.showImageURL}
            alt={`Promo image for ${show.showName}`}
            layout="fill"
            objectFit="cover"
          />
        </div>
      )}
      <div className="p-4 flex flex-col flex-grow">
        {/* Using Klein font, uppercase, light-teal text */}
        <h3 className="text-xl font-klein uppercase font-bold text-light-teal mb-1">{show.showName}</h3>
        {/* Using light-teal text with opacity */}
        <p className="text-sm text-light-teal/80 mb-1">{show.showDate}</p>
        <p className="text-sm text-light-teal/80 mb-3">{show.theatreName}</p>
        {/* Using light-teal text */}
        <p className="text-sm text-light-teal flex-grow mb-4">{show.briefDescription}</p>
        {/* Using light-teal border */}
        <div className="flex justify-between gap-2 mt-auto pt-4 border-t border-light-teal/20">
          <Link
            href={`/shows/${show.id}`} // Link to the dynamic show detail page
            // Using teal background, white text, lighter teal hover
            className="text-center px-4 py-2 text-sm rounded-md bg-teal text-white hover:bg-light-teal/70 transition-colors duration-200"
          >
            Show Info
          </Link>
          <a
            href={show.ticketLink}
            target="_blank"
            rel="noopener noreferrer"
            // Using teal background, white text, lighter teal hover
            className="text-center px-4 py-2 text-sm rounded-md bg-teal text-white hover:bg-light-teal/70 transition-colors duration-200"
          >
            Buy Tickets
          </a>
        </div>
      </div>
    </div>
  );
};

export default ShowCard;
