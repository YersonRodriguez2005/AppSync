// src/components/common/StarRating.jsx
import { useState } from 'react';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

export const StarRating = ({ 
  rating = 5, 
  onRatingChange, 
  readOnly = false, 
  size = "md", // 'sm' | 'md' | 'lg'
  className = "" 
}) => {
  const [hoverRating, setHoverRating] = useState(0);

  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-7 h-7"
  };

  const handleMouseEnter = (index) => {
    if (!readOnly) setHoverRating(index);
  };

  const handleMouseLeave = () => {
    if (!readOnly) setHoverRating(0);
  };

  const handleClick = (index) => {
    if (!readOnly && onRatingChange) {
      onRatingChange(index);
    }
  };

  return (
    <div className={`inline-flex items-center gap-1 ${className}`}>
      {[1, 2, 3, 4, 5].map((starIndex) => {
        const isFilled = (hoverRating || rating) >= starIndex;

        return (
          <motion.button
            key={starIndex}
            type="button"
            disabled={readOnly}
            onClick={() => handleClick(starIndex)}
            onMouseEnter={() => handleMouseEnter(starIndex)}
            onMouseLeave={handleMouseLeave}
            whileHover={!readOnly ? { scale: 1.25 } : {}}
            whileTap={!readOnly ? { scale: 0.9 } : {}}
            className={`transition-colors duration-150 focus:outline-none ${
              readOnly ? 'cursor-default' : 'cursor-pointer'
            }`}
          >
            <Star
              className={`${sizeClasses[size]} transition-all duration-200 ${
                isFilled
                  ? 'fill-amber-400 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]'
                  : 'fill-transparent text-slate-300 dark:text-slate-600 hover:text-amber-300'
              }`}
            />
          </motion.button>
        );
      })}
    </div>
  );
};