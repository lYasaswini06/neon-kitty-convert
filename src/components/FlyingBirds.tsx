
import React from 'react';

const FlyingBirds = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-32 pointer-events-none overflow-hidden">
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className="absolute opacity-60"
          style={{
            top: `${20 + Math.random() * 60}%`,
            animationDelay: `${index * 2}s`,
          }}
        >
          <div className="animate-[fly_15s_linear_infinite] text-2xl">
            🐦
          </div>
        </div>
      ))}
      
      <style jsx>{`
        @keyframes fly {
          0% {
            transform: translateX(-100px);
          }
          100% {
            transform: translateX(calc(100vw + 100px));
          }
        }
      `}</style>
    </div>
  );
};

export default FlyingBirds;
