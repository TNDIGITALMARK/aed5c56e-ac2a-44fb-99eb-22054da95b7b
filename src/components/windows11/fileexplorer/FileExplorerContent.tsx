'use client';

interface FileExplorerContentProps {
  files: Array<{
    id: string;
    name: string;
    type: 'file' | 'folder';
    icon: string;
    size: string;
    modified: string;
    path: string;
  }>;
  selectedItems: string[];
  viewMode: 'list' | 'grid';
  onItemSelect: (itemId: string, isCtrlKey: boolean) => void;
  onItemDoubleClick: (item: any) => void;
}

export function FileExplorerContent({
  files,
  selectedItems,
  viewMode,
  onItemSelect,
  onItemDoubleClick
}: FileExplorerContentProps) {
  const handleItemClick = (item: any, e: React.MouseEvent) => {
    onItemSelect(item.id, e.ctrlKey || e.metaKey);
  };

  const handleItemDoubleClick = (item: any) => {
    onItemDoubleClick(item);
  };

  if (viewMode === 'grid') {
    return (
      <div className="flex-1 p-4 overflow-auto">
        <div className="grid grid-cols-6 gap-4">
          {files.map((file) => (
            <div
              key={file.id}
              className={`
                flex flex-col items-center p-2 rounded cursor-pointer
                hover:bg-white/10 transition-colors
                ${selectedItems.includes(file.id) ? 'bg-white/20' : ''}
              `}
              onClick={(e) => handleItemClick(file, e)}
              onDoubleClick={() => handleItemDoubleClick(file)}
            >
              <div className="text-3xl mb-1">{file.icon}</div>
              <span className="text-caption text-center line-clamp-2 break-all">
                {file.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto">
      {/* Table Header */}
      <div className="sticky top-0 bg-white/10 border-b border-white/10 px-4 py-2">
        <div className="grid grid-cols-12 gap-4 text-caption font-medium text-white/70">
          <div className="col-span-6">Name</div>
          <div className="col-span-2">Date modified</div>
          <div className="col-span-2">Type</div>
          <div className="col-span-2 text-right">Size</div>
        </div>
      </div>

      {/* File List */}
      <div className="p-2">
        {files.map((file) => (
          <div
            key={file.id}
            className={`
              grid grid-cols-12 gap-4 p-2 rounded cursor-pointer
              hover:bg-white/10 transition-colors
              ${selectedItems.includes(file.id) ? 'bg-white/20' : ''}
            `}
            onClick={(e) => handleItemClick(file, e)}
            onDoubleClick={() => handleItemDoubleClick(file)}
          >
            <div className="col-span-6 flex items-center gap-2 min-w-0">
              <span className="text-lg flex-shrink-0">{file.icon}</span>
              <span className="text-body truncate">{file.name}</span>
            </div>
            <div className="col-span-2 flex items-center text-caption text-white/70">
              {file.modified}
            </div>
            <div className="col-span-2 flex items-center text-caption text-white/70">
              {file.type === 'folder' ? 'Folder' : 'File'}
            </div>
            <div className="col-span-2 flex items-center justify-end text-caption text-white/70">
              {file.size}
            </div>
          </div>
        ))}
      </div>

      {files.length === 0 && (
        <div className="flex items-center justify-center h-64 text-white/50">
          <div className="text-center">
            <div className="text-4xl mb-2">📁</div>
            <div className="text-body">This folder is empty</div>
          </div>
        </div>
      )}
    </div>
  );
}