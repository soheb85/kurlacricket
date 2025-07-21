'use client'
import React, { useState } from 'react'

const CarouselDots = () => {
  const [activeDot, setActiveDot] = useState(0)

  return (
    <div className="flex justify-center items-center gap-2 py-1.5 bg-white">
      {[...Array(5)].map((_, index) => (
        <button
          key={index}
          className={`w-1 h-1 rounded-full transition-all duration-300 ${
            activeDot === index ? 'bg-gray-800 scale-125' : 'bg-gray-400 hover:bg-gray-500'
          }`}
          onClick={() => setActiveDot(index)}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  )
}

export default CarouselDots