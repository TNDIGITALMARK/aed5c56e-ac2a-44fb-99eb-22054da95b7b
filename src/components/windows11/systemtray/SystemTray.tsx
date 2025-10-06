'use client';

import { useState, useEffect } from 'react';

export function SystemTray() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString([], {
      month: 'numeric',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="absolute right-2 flex items-center gap-2">
      {/* System Icons */}
      <div className="flex items-center gap-1">
        {/* Network */}
        <button className="
          flex items-center justify-center w-6 h-6
          hover:bg-white/10 rounded transition-colors
        ">
          <span className="text-xs">📶</span>
        </button>

        {/* Volume */}
        <button className="
          flex items-center justify-center w-6 h-6
          hover:bg-white/10 rounded transition-colors
        ">
          <span className="text-xs">🔊</span>
        </button>

        {/* Battery */}
        <button className="
          flex items-center justify-center w-6 h-6
          hover:bg-white/10 rounded transition-colors
        ">
          <span className="text-xs">🔋</span>
        </button>
      </div>

      {/* Time and Date */}
      <button className="
        flex flex-col items-end justify-center
        px-2 py-1 min-w-16
        hover:bg-white/10 rounded transition-colors
        text-white
      ">
        <div className="text-xs font-medium leading-none">
          {formatTime(currentTime)}
        </div>
        <div className="text-xs opacity-90 leading-none mt-0.5">
          {formatDate(currentTime)}
        </div>
      </button>

      {/* Show Desktop */}
      <button className="
        w-1 h-10 ml-1
        hover:bg-white/20 transition-colors
        border-l border-white/10
      " title="Show desktop" />
    </div>
  );
}