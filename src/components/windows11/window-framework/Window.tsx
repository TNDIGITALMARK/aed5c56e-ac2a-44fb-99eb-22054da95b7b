'use client';

import { useState, useRef, useEffect } from 'react';

interface WindowProps {
  window: {
    id: string;
    type: string;
    title: string;
    position: { x: number; y: number };
    size: { width: number; height: number };
    isMaximized: boolean;
    isMinimized: boolean;
  };
  zIndex: number;
  onUpdate: (updates: Partial<any>) => void;
  onClose: () => void;
  onFocus: () => void;
  children: React.ReactNode;
}

export function Window({ window, zIndex, onUpdate, onClose, onFocus, children }: WindowProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  if (window.isMinimized) {
    return null;
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget || (e.target as HTMLElement).closest('.window-header')) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - window.position.x,
        y: e.clientY - window.position.y
      });
      onFocus();
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && !window.isMaximized) {
      onUpdate({
        position: {
          x: Math.max(0, e.clientX - dragStart.x),
          y: Math.max(0, e.clientY - dragStart.y)
        }
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
  };

  useEffect(() => {
    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, isResizing, dragStart]);

  const handleMinimize = () => {
    onUpdate({ isMinimized: true });
  };

  const handleMaximize = () => {
    onUpdate({ isMaximized: !window.isMaximized });
  };

  const windowStyle = window.isMaximized
    ? {
        left: 0,
        top: 0,
        width: '100vw',
        height: 'calc(100vh - 48px)', // Subtract taskbar height
        zIndex
      }
    : {
        left: window.position.x,
        top: window.position.y,
        width: window.size.width,
        height: window.size.height,
        zIndex
      };

  return (
    <div
      ref={windowRef}
      className="
        absolute
        acrylic-strong
        rounded-lg
        shadow-[var(--shadow-3)]
        overflow-hidden
        pointer-events-auto
        border border-white/10
      "
      style={windowStyle}
      onMouseDown={handleMouseDown}
    >
      {/* Window Header */}
      <div className="
        window-header
        flex items-center justify-between
        h-8 px-3
        bg-white/5
        border-b border-white/10
        cursor-move
      ">
        <div className="flex items-center gap-2">
          <span className="text-caption text-white/90 font-medium">
            {window.title}
          </span>
        </div>

        <div className="flex items-center gap-1">
          {/* Minimize Button */}
          <button
            className="
              w-6 h-6 rounded
              hover:bg-white/20 active:bg-white/30
              flex items-center justify-center
              transition-colors
            "
            onClick={handleMinimize}
            title="Minimize"
          >
            <span className="text-xs">–</span>
          </button>

          {/* Maximize/Restore Button */}
          <button
            className="
              w-6 h-6 rounded
              hover:bg-white/20 active:bg-white/30
              flex items-center justify-center
              transition-colors
            "
            onClick={handleMaximize}
            title={window.isMaximized ? 'Restore' : 'Maximize'}
          >
            <span className="text-xs">
              {window.isMaximized ? '❐' : '□'}
            </span>
          </button>

          {/* Close Button */}
          <button
            className="
              w-6 h-6 rounded
              hover:bg-red-500 active:bg-red-600
              flex items-center justify-center
              transition-colors
            "
            onClick={onClose}
            title="Close"
          >
            <span className="text-xs text-white">×</span>
          </button>
        </div>
      </div>

      {/* Window Content */}
      <div className="flex-1 overflow-hidden bg-white/5">
        {children}
      </div>

      {/* Resize Handle */}
      {!window.isMaximized && (
        <div
          className="
            absolute bottom-0 right-0
            w-3 h-3 cursor-nw-resize
            opacity-0 hover:opacity-50
            bg-white/20
          "
          onMouseDown={(e) => {
            e.stopPropagation();
            setIsResizing(true);
          }}
        />
      )}
    </div>
  );
}