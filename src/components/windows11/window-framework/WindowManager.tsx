'use client';

import { Window } from './Window';
import { FileExplorer } from '../fileexplorer/FileExplorer';

interface WindowManagerProps {
  windows: Array<{
    id: string;
    type: string;
    title: string;
    position: { x: number; y: number };
    size: { width: number; height: number };
    isMaximized: boolean;
    isMinimized: boolean;
  }>;
  onUpdateWindows: (windows: any[]) => void;
}

export function WindowManager({ windows, onUpdateWindows }: WindowManagerProps) {
  const handleWindowUpdate = (windowId: string, updates: Partial<any>) => {
    onUpdateWindows(
      windows.map(window =>
        window.id === windowId ? { ...window, ...updates } : window
      )
    );
  };

  const handleWindowClose = (windowId: string) => {
    onUpdateWindows(windows.filter(window => window.id !== windowId));
  };

  const handleWindowFocus = (windowId: string) => {
    // Move focused window to end of array (highest z-index)
    const window = windows.find(w => w.id === windowId);
    if (window) {
      const otherWindows = windows.filter(w => w.id !== windowId);
      onUpdateWindows([...otherWindows, window]);
    }
  };

  const renderWindowContent = (window: any) => {
    switch (window.type) {
      case 'file-explorer':
        return <FileExplorer />;
      default:
        return (
          <div className="p-4 text-center text-gray-500">
            <h2 className="text-lg font-medium mb-2">{window.title}</h2>
            <p>Application window content would appear here.</p>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 'var(--z-window)' }}>
      {windows.map((window, index) => (
        <Window
          key={window.id}
          window={window}
          zIndex={10 + index}
          onUpdate={(updates) => handleWindowUpdate(window.id, updates)}
          onClose={() => handleWindowClose(window.id)}
          onFocus={() => handleWindowFocus(window.id)}
        >
          {renderWindowContent(window)}
        </Window>
      ))}
    </div>
  );
}