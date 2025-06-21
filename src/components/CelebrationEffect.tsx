
import React from 'react';

const CelebrationEffect = () => {
  const particles = ['🎉', '🎊', '⭐', '✨', '💫', '🌟', '💰', '🪙'];
  
  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden">
      {[...Array(20)].map((_, index) => (
        <div
          key={index}
          className="absolute animate-bounce opacity-80"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${1 + Math.random() * 2}s`,
            fontSize: `${1.5 + Math.random() * 1}rem`,
          }}
        >
          <div
            className="animate-spin"
            style={{
              animationDelay: `${Math.random() * 1}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          >
            {particles[Math.floor(Math.random() * particles.length)]}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CelebrationEffect;
