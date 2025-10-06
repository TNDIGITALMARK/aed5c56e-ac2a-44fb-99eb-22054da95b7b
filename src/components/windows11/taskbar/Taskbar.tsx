'use client';

import { TaskbarButton } from './TaskbarButton';
import { SystemTray } from '../systemtray/SystemTray';

interface TaskbarProps {
  onStartMenuToggle: () => void;
  onWidgetPanelToggle: () => void;
  windows: any[];
  onWindowToggle: (windowId: string) => void;
}

const pinnedApps = [
  { id: 'start', name: 'Start', icon: '⊞', type: 'start' as const },
  { id: 'search', name: 'Search', icon: '🔍', type: 'search' as const },
  { id: 'task-view', name: 'Task View', icon: '▢', type: 'task-view' as const },
  { id: 'widgets', name: 'Widgets', icon: '☁', type: 'widgets' as const },
  { id: 'edge', name: 'Microsoft Edge', icon: '🌐', type: 'app' as const },
  { id: 'file-explorer', name: 'File Explorer', icon: '📁', type: 'app' as const },
  { id: 'mail', name: 'Mail', icon: '📧', type: 'app' as const },
  { id: 'photos', name: 'Photos', icon: '🖼️', type: 'app' as const },
  { id: 'media-player', name: 'Media Player', icon: '▶️', type: 'app' as const }
];

export function Taskbar({ onStartMenuToggle, onWidgetPanelToggle, windows, onWindowToggle }: TaskbarProps) {
  const handleButtonClick = (button: typeof pinnedApps[0]) => {
    switch (button.type) {
      case 'start':
        onStartMenuToggle();
        break;
      case 'widgets':
        onWidgetPanelToggle();
        break;
      case 'search':
        // Handle search
        break;
      case 'task-view':
        // Handle task view
        break;
      default:
        // Handle app launch
        break;
    }
  };

  return (
    <div
      className="
        fixed bottom-0 left-0 right-0 h-12
        flex items-center justify-center
        acrylic-strong
        border-t border-white/10
      "
      style={{ zIndex: 'var(--z-taskbar)' }}
    >
      <div className="flex items-center gap-1 px-4">
        {/* Pinned Applications */}
        <div className="flex items-center gap-1">
          {pinnedApps.map((app) => (
            <TaskbarButton
              key={app.id}
              app={app}
              isActive={app.type === 'start'}
              onClick={() => handleButtonClick(app)}
            />
          ))}
        </div>

        {/* Running Windows */}
        {windows.length > 0 && (
          <>
            <div className="w-px h-6 bg-white/20 mx-2" />
            <div className="flex items-center gap-1">
              {windows.map((window) => (
                <TaskbarButton
                  key={window.id}
                  app={{
                    id: window.id,
                    name: window.title,
                    icon: window.type === 'file-explorer' ? '📁' : '📄',
                    type: 'window' as const
                  }}
                  isActive={!window.isMinimized}
                  onClick={() => onWindowToggle(window.id)}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* System Tray */}
      <SystemTray />
    </div>
  );
}