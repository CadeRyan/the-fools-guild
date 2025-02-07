'use client';

import { useState, useEffect } from 'react';

export default function TypingHeadline() {
  const [text, setText] = useState('');
  const fullText = "The Fool's Guild";
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (text.length < fullText.length) {
      const timeout = setTimeout(() => {
        setText(fullText.slice(0, text.length + 1));
      }, 100);

      return () => clearTimeout(timeout);
    }
  }, [text]);

  // Cursor blink effect
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);

    return () => clearInterval(interval);
  }, []);

  return (
    <h1 className="text-6xl font-thin mb-8 text-center">
      {text}
      <span
        className="ml-1"
        style={{
          opacity: showCursor ? 1 : 0,
          transition: 'opacity 0.1s ease-in-out',
        }}
      >
        |
      </span>
    </h1>
  );
}