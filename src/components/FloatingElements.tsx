
import React from 'react';

const FloatingElements = () => {
  const elements = ['💸', '💱', '✨', '💰', '🪙', '⭐', '💎', '🌟'];
  
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {elements.map((emoji, index) => (
        <div
          key={index}
          className="absolute animate-bounce opacity-30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${3 + Math.random() * 4}s`,
            fontSize: `${1 + Math.random() * 1.5}rem`,
          }}
        >
          <div
            className="animate-pulse"
            style={{
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          >
            {emoji}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FloatingElements;
