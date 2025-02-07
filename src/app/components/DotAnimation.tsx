"use client"

import React, { useEffect, useState } from 'react';
import './DotAnimation.css';

interface DotProps {
  pattern: number;
  delay: number;
  startX: number;
  startY: number;
}

const DotAnimation: React.FC = () => {
  const [dots, setDots] = useState<DotProps[]>([]);

  useEffect(() => {
    const patterns = 4; // Number of different animation patterns
    const dotsPerPattern = 25; // Number of dots for each pattern
    const gridSize = 30; // 30px grid
    const offset = 15; // 15px offset
    const newDots: DotProps[] = [];

    for (let pattern = 0; pattern < patterns; pattern++) {
      for (let i = 0; i < dotsPerPattern; i++) {
        // Calculate random grid positions
        const gridX = Math.floor(Math.random() * 80); // Assuming the grid covers most of the screen
        const gridY = Math.floor(Math.random() * 80);

        newDots.push({
          pattern,
          delay: Math.random() * 5, // Random delay between 0-5s
          startX: offset + gridX * gridSize, // Start position on the grid
          startY: offset + gridY * gridSize,
        });
      }
    }

    setDots(newDots);
  }, []);

  return (
    <div className="dot-animation-container">
      {dots.map((dot, index) => (
        <div
          key={index}
          className={`dot pattern-${dot.pattern}`}
          style={{
            animationDelay: `${dot.delay}s`,
            left: `${dot.startX}px`,
            top: `${dot.startY}px`,
          }}
        />
      ))}
    </div>
  );
};

export default DotAnimation;
