'use client';

import { useState } from 'react';

interface DesktopShortcutProps {
  shortcut: {
    id: string;
    name: string;
    icon: string;
    position: { x: number; y: number };
  };
  onDoubleClick: () => void;
}

export function DesktopShortcut({ shortcut, onDoubleClick }: DesktopShortcutProps) {
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSelected(true);
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDoubleClick();
  };

  return (
    <div
      className={`
        absolute flex flex-col items-center cursor-pointer
        p-2 rounded transition-all duration-150
        hover:bg-white/10 hover:backdrop-blur-sm
        ${isSelected ? 'bg-white/20 backdrop-blur-sm' : ''}
      `}
      style={{
        left: shortcut.position.x,
        top: shortcut.position.y,
        width: '80px'
      }}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onBlur={() => setIsSelected(false)}
      tabIndex={0}
    >
      {/* Icon */}
      <div className="text-3xl mb-1 filter drop-shadow-lg">
        {shortcut.icon}
      </div>

      {/* Name */}
      <span className="text-xs text-white text-center leading-tight font-medium drop-shadow-lg select-none">
        {shortcut.name}
      </span>
    </div>
  );
}