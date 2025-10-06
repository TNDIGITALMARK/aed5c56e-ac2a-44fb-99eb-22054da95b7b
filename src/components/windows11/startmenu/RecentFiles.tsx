'use client';

interface RecentFilesProps {
  files: Array<{
    name: string;
    app: string;
    icon: string;
    modified: string;
  }>;
}

export function RecentFiles({ files }: RecentFilesProps) {
  return (
    <div className="space-y-1 flex-1">
      {files.map((file, index) => (
        <button
          key={index}
          className="
            flex items-center gap-3 w-full p-2
            hover:bg-white/10 rounded transition-colors
            text-left group
          "
        >
          {/* File Icon */}
          <div className="text-lg flex-shrink-0">
            {file.icon}
          </div>

          {/* File Info */}
          <div className="flex-1 min-w-0">
            <div className="text-body font-medium truncate">
              {file.name}
            </div>
            <div className="text-caption text-white/70">
              {file.app} • {file.modified}
            </div>
          </div>

          {/* More Options */}
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="w-6 h-6 hover:bg-white/10 rounded flex items-center justify-center">
              •••
            </button>
          </div>
        </button>
      ))}
    </div>
  );
}