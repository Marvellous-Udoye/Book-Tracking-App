// components/TypingAnimation.tsx

import React, { useEffect, useState } from 'react';

interface TypingAnimationProps {
  text: string;
  speed?: number; // Speed of typing in milliseconds
}

const TypingAnimation: React.FC<TypingAnimationProps> = ({ text, speed = 100 }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText((prev) => prev + text.charAt(index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval); // Cleanup
  }, [text, speed]);

  return <span>{displayedText}</span>;
};

export default TypingAnimation;
