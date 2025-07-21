import React from 'react';
import { Star } from 'lucide-react';

const LevelStars = ({ rating }) => {
  const MAX_STARS = 5;

  return (
    <div className="flex gap-1 text-yellow-400">
      {Array.from({ length: MAX_STARS }).map((_, i) => (
        <span key={i}>
          <Star
            className={`w-4 h-4 ${
              i < rating ? 'fill-yellow-400 stroke-yellow-400' : 'stroke-gray-300'
            }`}
          />
        </span>
      ))}
    </div>
  );
};

export default LevelStars;
