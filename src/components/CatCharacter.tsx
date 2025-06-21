
import React, { useState, useEffect } from 'react';

interface CatCharacterProps {
  isTyping: boolean;
  showSuccess: boolean;
}

const CatCharacter = ({ isTyping, showSuccess }: CatCharacterProps) => {
  const [expression, setExpression] = useState('happy');
  const [speechBubble, setSpeechBubble] = useState('');
  const [showBubble, setShowBubble] = useState(false);

  const speeches = {
    typing: ["Typing... 😺", "Keep going! 🐾", "Meow meow! 💭"],
    success: ["Super! 💥", "Amazing! 🌟", "Purrfect! 😸", "Well done! 🎉"],
    idle: ["Ready to convert? 😊", "I'm here to help! 💪", "Let's go! 🚀"]
  };

  useEffect(() => {
    if (isTyping) {
      setExpression('curious');
      const randomSpeech = speeches.typing[Math.floor(Math.random() * speeches.typing.length)];
      setSpeechBubble(randomSpeech);
      setShowBubble(true);
    } else if (showSuccess) {
      setExpression('excited');
      const randomSpeech = speeches.success[Math.floor(Math.random() * speeches.success.length)];
      setSpeechBubble(randomSpeech);
      setShowBubble(true);
      setTimeout(() => {
        setShowBubble(false);
        setExpression('happy');
      }, 3000);
    } else {
      setExpression('happy');
      setShowBubble(false);
    }
  }, [isTyping, showSuccess]);

  const getCatFace = () => {
    switch (expression) {
      case 'curious':
        return '🤔';
      case 'excited':
        return '😸';
      case 'happy':
      default:
        return '😺';
    }
  };

  return (
    <div className="fixed bottom-4 left-4 z-10">
      {/* Speech bubble */}
      {showBubble && (
        <div className="absolute bottom-20 left-0 bg-white/90 backdrop-blur-md rounded-2xl p-3 shadow-lg animate-bounce max-w-40">
          <p className="text-sm font-medium text-gray-800">{speechBubble}</p>
          <div className="absolute -bottom-2 left-6 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white/90"></div>
        </div>
      )}
      
      {/* Cat character */}
      <div className="bg-white/20 backdrop-blur-md rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 cursor-pointer">
        <div className="text-4xl animate-pulse">
          {getCatFace()}
        </div>
      </div>
    </div>
  );
};

export default CatCharacter;
