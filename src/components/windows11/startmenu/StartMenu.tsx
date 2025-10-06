'use client';

import { StartMenuApp } from './StartMenuApp';
import { RecentFiles } from './RecentFiles';

interface StartMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const pinnedApps = [
  { id: 'edge', name: 'Microsoft Edge', icon: '🌐', category: 'Browser' },
  { id: 'word', name: 'Microsoft Word', icon: '📝', category: 'Office' },
  { id: 'excel', name: 'Microsoft Excel', icon: '📊', category: 'Office' },
  { id: 'powerpoint', name: 'PowerPoint', icon: '📽️', category: 'Office' },
  { id: 'outlook', name: 'Outlook', icon: '📧', category: 'Email' },
  { id: 'teams', name: 'Microsoft Teams', icon: '👥', category: 'Communication' },
  { id: 'photos', name: 'Photos', icon: '🖼️', category: 'Media' },
  { id: 'music', name: 'Groove Music', icon: '🎵', category: 'Media' },
  { id: 'calculator', name: 'Calculator', icon: '🧮', category: 'Utilities' },
  { id: 'notepad', name: 'Notepad', icon: '📄', category: 'Text Editor' },
  { id: 'paint', name: 'Paint', icon: '🎨', category: 'Graphics' },
  { id: 'terminal', name: 'Windows Terminal', icon: '⚡', category: 'Developer' }
];

const recentFiles = [
  { name: 'Project Proposal.docx', app: 'Word', icon: '📝', modified: '2 hours ago' },
  { name: 'Budget Analysis.xlsx', app: 'Excel', icon: '📊', modified: '3 hours ago' },
  { name: 'Presentation.pptx', app: 'PowerPoint', icon: '📽️', modified: 'Yesterday' },
  { name: 'Meeting Notes.txt', app: 'Notepad', icon: '📄', modified: '2 days ago' },
  { name: 'Family Photo.jpg', app: 'Photos', icon: '🖼️', modified: '3 days ago' }
];

export function StartMenu({ isOpen, onClose }: StartMenuProps) {
  if (!isOpen) return null;

  const handleAppClick = (app: typeof pinnedApps[0]) => {
    console.log('Launch app:', app.name);
    onClose();
  };

  return (
    <div
      className="
        fixed bottom-14 left-1/2 transform -translate-x-1/2
        w-[640px] h-[700px]
        acrylic rounded-lg
        shadow-[var(--shadow-flyout)]
        animate-in fade-in slide-in-from-bottom-2
        duration-200
      "
      style={{ zIndex: 'var(--z-startmenu)' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-6 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-semibold">U</span>
          </div>
          <span className="text-body-strong">User Account</span>
        </div>
        <button
          className="w-8 h-8 rounded hover:bg-white/10 flex items-center justify-center"
          title="Power options"
        >
          ⚡
        </button>
      </div>

      {/* Search */}
      <div className="px-6 pb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search for apps, settings, and documents"
            className="
              w-full h-10 px-4 pl-10
              bg-white/10 border border-white/20
              rounded-md text-body
              placeholder-white/60
              focus:outline-none focus:ring-2 focus:ring-blue-400
            "
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            🔍
          </div>
        </div>
      </div>

      <div className="flex-1 px-6 pb-6">
        <div className="grid grid-cols-2 gap-6 h-full">
          {/* Pinned Apps */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-body-strong">Pinned</h3>
              <button className="text-caption text-blue-400 hover:underline">
                All apps →
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2 flex-1">
              {pinnedApps.map((app) => (
                <StartMenuApp
                  key={app.id}
                  app={app}
                  onClick={() => handleAppClick(app)}
                />
              ))}
            </div>
          </div>

          {/* Recent Files */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-body-strong">Recent</h3>
              <button className="text-caption text-blue-400 hover:underline">
                More →
              </button>
            </div>

            <RecentFiles files={recentFiles} />
          </div>
        </div>
      </div>
    </div>
  );
}