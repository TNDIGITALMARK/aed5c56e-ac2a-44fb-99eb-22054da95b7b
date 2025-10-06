'use client';

import { useState } from 'react';

export function PhotoWidget() {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const photos = [
    {
      id: 1,
      src: '/generated/windows11-wallpaper.png',
      title: 'Abstract Blue',
      date: 'Today'
    },
    {
      id: 2,
      src: '/generated/windows11-wallpaper.png',
      title: 'Nature Scene',
      date: 'Yesterday'
    },
    {
      id: 3,
      src: '/generated/windows11-wallpaper.png',
      title: 'City View',
      date: '2 days ago'
    }
  ];

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const currentPhoto = photos[currentPhotoIndex];

  return (
    <div className="bg-white/10 rounded-lg overflow-hidden backdrop-blur-sm">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pb-2">
        <h3 className="text-body-strong">Photos</h3>
        <button className="text-caption text-blue-400 hover:underline">
          See all
        </button>
      </div>

      {/* Photo Display */}
      <div className="relative group">
        <div className="aspect-video bg-black/20 overflow-hidden">
          <img
            src={currentPhoto.src}
            alt={currentPhoto.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Navigation Arrows */}
        {photos.length > 1 && (
          <>
            <button
              className="
                absolute left-2 top-1/2 transform -translate-y-1/2
                w-8 h-8 bg-black/50 hover:bg-black/70
                rounded-full flex items-center justify-center
                opacity-0 group-hover:opacity-100 transition-opacity
              "
              onClick={prevPhoto}
            >
              <span className="text-white">‹</span>
            </button>
            <button
              className="
                absolute right-2 top-1/2 transform -translate-y-1/2
                w-8 h-8 bg-black/50 hover:bg-black/70
                rounded-full flex items-center justify-center
                opacity-0 group-hover:opacity-100 transition-opacity
              "
              onClick={nextPhoto}
            >
              <span className="text-white">›</span>
            </button>
          </>
        )}

        {/* Photo Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <div className="text-body text-white font-medium">
            {currentPhoto.title}
          </div>
          <div className="text-caption text-white/80">
            {currentPhoto.date}
          </div>
        </div>
      </div>

      {/* Photo Indicators */}
      {photos.length > 1 && (
        <div className="flex items-center justify-center gap-1 p-3">
          {photos.map((_, index) => (
            <button
              key={index}
              className={`
                w-2 h-2 rounded-full transition-colors
                ${index === currentPhotoIndex ? 'bg-white' : 'bg-white/40'}
              `}
              onClick={() => setCurrentPhotoIndex(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
}