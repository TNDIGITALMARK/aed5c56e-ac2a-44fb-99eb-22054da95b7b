'use client';

import { useState } from 'react';
import { DesktopShortcut } from './DesktopShortcut';
import { Taskbar } from '../taskbar/Taskbar';
import { StartMenu } from '../startmenu/StartMenu';
import { WidgetPanel } from '../widgets/WidgetPanel';
import { WindowManager } from '../window-framework/WindowManager';

const desktopShortcuts = [
  {
    id: 'recycle-bin',
    name: 'Recycle Bin',
    icon: '🗑️',
    position: { x: 50, y: 50 }
  },
  {
    id: 'my-computer',
    name: 'This PC',
    icon: '💻',
    position: { x: 50, y: 150 }
  },
  {
    id: 'documents',
    name: 'Documents',
    icon: '📁',
    position: { x: 50, y: 250 }
  },
  {
    id: 'network',
    name: 'Network',
    icon: '🌐',
    position: { x: 50, y: 350 }
  }
];

export function Desktop() {
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [isWidgetPanelOpen, setIsWidgetPanelOpen] = useState(false);
  const [windows, setWindows] = useState<any[]>([]);

  const handleDesktopClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsStartMenuOpen(false);
      setIsWidgetPanelOpen(false);
    }
  };

  const handleShortcutDoubleClick = (shortcut: any) => {
    const newWindow = {
      id: Date.now().toString(),
      type: shortcut.id === 'my-computer' ? 'file-explorer' : 'application',
      title: shortcut.name,
      position: { x: Math.random() * 400 + 100, y: Math.random() * 200 + 100 },
      size: { width: 800, height: 600 },
      isMaximized: false,
      isMinimized: false
    };
    setWindows(prev => [...prev, newWindow]);
  };

  return (
    <div
      className="fixed inset-0 bg-cover bg-center bg-no-repeat select-none"
      style={{
        backgroundImage: 'url(/generated/windows11-wallpaper.png)',
        zIndex: 'var(--z-desktop)'
      }}
      onClick={handleDesktopClick}
    >
      {/* Desktop Shortcuts */}
      <div className="absolute inset-0">
        {desktopShortcuts.map((shortcut) => (
          <DesktopShortcut
            key={shortcut.id}
            shortcut={shortcut}
            onDoubleClick={() => handleShortcutDoubleClick(shortcut)}
          />
        ))}
      </div>

      {/* Window Manager */}
      <WindowManager
        windows={windows}
        onUpdateWindows={setWindows}
      />

      {/* Widget Panel */}
      <WidgetPanel
        isOpen={isWidgetPanelOpen}
        onClose={() => setIsWidgetPanelOpen(false)}
      />

      {/* Start Menu */}
      <StartMenu
        isOpen={isStartMenuOpen}
        onClose={() => setIsStartMenuOpen(false)}
      />

      {/* Taskbar */}
      <Taskbar
        onStartMenuToggle={() => setIsStartMenuOpen(!isStartMenuOpen)}
        onWidgetPanelToggle={() => setIsWidgetPanelOpen(!isWidgetPanelOpen)}
        windows={windows}
        onWindowToggle={(windowId) => {
          setWindows(prev =>
            prev.map(window =>
              window.id === windowId
                ? { ...window, isMinimized: !window.isMinimized }
                : window
            )
          );
        }}
      />
    </div>
  );
}