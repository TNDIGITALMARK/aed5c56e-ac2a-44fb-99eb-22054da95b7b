'use client';

interface FileExplorerToolbarProps {
  currentPath: string;
  viewMode: 'list' | 'grid';
  onViewModeChange: (mode: 'list' | 'grid') => void;
  onNavigate: (path: string) => void;
  selectedCount: number;
}

export function FileExplorerToolbar({
  currentPath,
  viewMode,
  onViewModeChange,
  onNavigate,
  selectedCount
}: FileExplorerToolbarProps) {
  const pathSegments = currentPath.split('/').filter(Boolean);

  const handleBack = () => {
    if (pathSegments.length > 0) {
      const parentPath = '/' + pathSegments.slice(0, -1).join('/');
      onNavigate(parentPath === '/' ? '/' : parentPath);
    }
  };

  const handleForward = () => {
    // Forward navigation would be implemented with history state
  };

  const handleUp = () => {
    handleBack();
  };

  return (
    <div className="flex flex-col border-b border-white/10 bg-white/5">
      {/* Navigation Controls */}
      <div className="flex items-center gap-1 p-2">
        <button
          className="p-1.5 hover:bg-white/10 rounded transition-colors disabled:opacity-50"
          onClick={handleBack}
          disabled={currentPath === '/'}
          title="Back"
        >
          ←
        </button>
        <button
          className="p-1.5 hover:bg-white/10 rounded transition-colors opacity-50"
          onClick={handleForward}
          disabled
          title="Forward"
        >
          →
        </button>
        <button
          className="p-1.5 hover:bg-white/10 rounded transition-colors disabled:opacity-50"
          onClick={handleUp}
          disabled={currentPath === '/'}
          title="Up"
        >
          ↑
        </button>

        <div className="w-px h-4 bg-white/20 mx-1" />

        {/* View Controls */}
        <button
          className={`
            p-1.5 hover:bg-white/10 rounded transition-colors
            ${viewMode === 'list' ? 'bg-white/15' : ''}
          `}
          onClick={() => onViewModeChange('list')}
          title="List view"
        >
          ☰
        </button>
        <button
          className={`
            p-1.5 hover:bg-white/10 rounded transition-colors
            ${viewMode === 'grid' ? 'bg-white/15' : ''}
          `}
          onClick={() => onViewModeChange('grid')}
          title="Grid view"
        >
          ⊞
        </button>

        <div className="flex-1" />

        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="
              w-48 h-8 px-3 pl-8
              bg-white/10 border border-white/20
              rounded text-caption
              placeholder-white/60
              focus:outline-none focus:ring-1 focus:ring-blue-400
            "
          />
          <div className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-white/60">
            🔍
          </div>
        </div>
      </div>

      {/* Address Bar */}
      <div className="flex items-center px-2 pb-2">
        <div className="flex items-center gap-1 flex-1">
          <button
            className="px-2 py-1 hover:bg-white/10 rounded text-caption"
            onClick={() => onNavigate('/')}
          >
            This PC
          </button>
          {pathSegments.map((segment, index) => {
            const segmentPath = '/' + pathSegments.slice(0, index + 1).join('/');
            return (
              <div key={index} className="flex items-center gap-1">
                <span className="text-white/60">{'>'}</span>
                <button
                  className="px-2 py-1 hover:bg-white/10 rounded text-caption"
                  onClick={() => onNavigate(segmentPath)}
                >
                  {segment}
                </button>
              </div>
            );
          })}
        </div>

        {selectedCount > 0 && (
          <div className="text-caption text-white/70">
            {selectedCount} item{selectedCount !== 1 ? 's' : ''} selected
          </div>
        )}
      </div>
    </div>
  );
}