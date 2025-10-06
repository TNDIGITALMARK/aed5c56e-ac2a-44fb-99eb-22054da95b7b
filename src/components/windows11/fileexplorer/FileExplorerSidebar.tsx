'use client';

interface FileExplorerSidebarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

const quickAccess = [
  { name: 'Desktop', icon: '🖥️', path: '/Desktop' },
  { name: 'Downloads', icon: '⬇️', path: '/Downloads' },
  { name: 'Documents', icon: '📁', path: '/Documents' },
  { name: 'Pictures', icon: '🖼️', path: '/Pictures' },
  { name: 'Music', icon: '🎵', path: '/Music' },
  { name: 'Videos', icon: '🎬', path: '/Videos' }
];

const thisPC = [
  { name: 'Local Disk (C:)', icon: '💽', path: '/C:' },
  { name: 'Data (D:)', icon: '💽', path: '/D:' },
  { name: 'USB Drive (E:)', icon: '🔌', path: '/E:' }
];

export function FileExplorerSidebar({ currentPath, onNavigate }: FileExplorerSidebarProps) {
  const SidebarItem = ({ item }: { item: typeof quickAccess[0] }) => (
    <button
      className={`
        flex items-center gap-2 w-full px-2 py-1.5
        text-left text-body rounded
        hover:bg-white/10 active:bg-white/15
        transition-colors
        ${currentPath === item.path ? 'bg-white/15' : ''}
      `}
      onClick={() => onNavigate(item.path)}
    >
      <span className="text-sm">{item.icon}</span>
      <span className="text-caption truncate">{item.name}</span>
    </button>
  );

  return (
    <div className="w-56 bg-white/5 border-r border-white/10 p-2">
      {/* Quick Access */}
      <div className="mb-4">
        <h3 className="text-caption font-medium text-white/70 mb-2 px-2">
          Quick access
        </h3>
        <div className="space-y-0.5">
          {quickAccess.map((item) => (
            <SidebarItem key={item.path} item={item} />
          ))}
        </div>
      </div>

      {/* This PC */}
      <div className="mb-4">
        <h3 className="text-caption font-medium text-white/70 mb-2 px-2">
          This PC
        </h3>
        <div className="space-y-0.5">
          {thisPC.map((item) => (
            <SidebarItem key={item.path} item={item} />
          ))}
        </div>
      </div>

      {/* Network */}
      <div>
        <h3 className="text-caption font-medium text-white/70 mb-2 px-2">
          Network
        </h3>
        <div className="space-y-0.5">
          <SidebarItem item={{ name: 'Network', icon: '🌐', path: '/Network' }} />
        </div>
      </div>
    </div>
  );
}