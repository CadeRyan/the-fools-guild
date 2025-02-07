import React from 'react';
import Image from 'next/image';

interface ShowCardProps {
  shows: {
    imageUrl: string;
    title: string;
    description: string;
    linkUrl: string;
  }[];
}

const ShowCards: React.FC<ShowCardProps> = ({ shows }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {shows.map((show, index) => (
        <a
          key={index}
          href={show.linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="p-6 rounded-lg backdrop-blur-xxs bg-light-teal/5 border border-light-teal/30 shadow-lg hover:shadow-xl hover:border-light-teal/60 hover:shadow-light-teal/20 transition-all duration-300 motion-preset-rebound-up motion-delay-300 hover:scale-[1.1]">
                  <div className="overflow-hidden rounded-md mb-4 relative" style={{ height: '192px' }}>
                    <Image
                      src={show.imageUrl}
                      alt={show.title}
                      className="object-cover transition-transform duration-300 card-image"
                      fill
                    />
                    {/*<div>Image goes here</div>*/}
                  </div>
          <h3 className="text-xl font-semibold text-center text-white">{show.title}</h3>
          <p className="font-thin text-white/70 text-center">{show.description}</p>
        </a>
      ))}
    </div>
  );
};

export default ShowCards;
