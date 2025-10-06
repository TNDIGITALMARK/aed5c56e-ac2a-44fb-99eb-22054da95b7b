'use client';

import { WeatherWidget } from './WeatherWidget';
import { NewsWidget } from './NewsWidget';
import { CalendarWidget } from './CalendarWidget';
import { PhotoWidget } from './PhotoWidget';

interface WidgetPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WidgetPanel({ isOpen, onClose }: WidgetPanelProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/20 backdrop-blur-sm"
        style={{ zIndex: 'var(--z-startmenu)' }}
        onClick={onClose}
      />

      {/* Widget Panel */}
      <div
        className="
          fixed left-4 bottom-14 top-4
          w-96
          acrylic rounded-lg
          shadow-[var(--shadow-flyout)]
          animate-in fade-in slide-in-from-left-2
          duration-200
          overflow-hidden
        "
        style={{ zIndex: 'var(--z-startmenu)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 pb-2">
          <h2 className="text-body-strong">Widgets</h2>
          <button
            className="w-8 h-8 rounded hover:bg-white/10 flex items-center justify-center"
            onClick={onClose}
            title="Close"
          >
            ×
          </button>
        </div>

        {/* Widget Content */}
        <div className="flex-1 overflow-auto p-4 pt-2 space-y-4">
          <WeatherWidget />
          <CalendarWidget />
          <NewsWidget />
          <PhotoWidget />
        </div>
      </div>
    </>
  );
}