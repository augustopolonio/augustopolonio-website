'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function FlipAvatar() {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="mb-8 flex justify-center">
      <div 
        className="perspective-1000 w-32 h-32 md:w-40 md:h-40 cursor-pointer"
        onClick={handleClick}
      >
        <div className={`relative w-full h-full transition-transform duration-700 preserve-3d md:group-hover:rotate-y-180 ${isFlipped ? 'rotate-y-180' : ''}`}>
          {/* Front - Avatar */}
          <div className="absolute inset-0 backface-hidden rounded-full overflow-hidden border-4 border-accent shadow-2xl">
            <Image
              src="/augusto-polonio-avatar.png"
              alt="Augusto Polonio"
              fill
              className="object-cover"
              priority
            />
          </div>
          {/* Back - Real Photo */}
          <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-full overflow-hidden border-4 border-accent shadow-2xl">
            <Image
              src="/AugustoPolonio.jpg"
              alt="Augusto Polonio"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
