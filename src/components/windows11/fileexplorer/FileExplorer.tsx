'use client';

import { useState } from 'react';
import { FileExplorerSidebar } from './FileExplorerSidebar';
import { FileExplorerContent } from './FileExplorerContent';
import { FileExplorerToolbar } from './FileExplorerToolbar';

const sampleFiles = [
  {
    id: '1',
    name: 'Documents',
    type: 'folder',
    icon: '📁',
    size: '',
    modified: 'Today',
    path: '/Documents'
  },
  {
    id: '2',
    name: 'Pictures',
    type: 'folder',
    icon: '📁',
    size: '',
    modified: 'Yesterday',
    path: '/Pictures'
  },
  {
    id: '3',
    name: 'Project Plan.docx',
    type: 'file',
    icon: '📝',
    size: '156 KB',
    modified: '2 hours ago',
    path: '/Documents/Project Plan.docx'
  },
  {
    id: '4',
    name: 'Budget.xlsx',
    type: 'file',
    icon: '📊',
    size: '89 KB',
    modified: '3 hours ago',
    path: '/Documents/Budget.xlsx'
  },
  {
    id: '5',
    name: 'Presentation.pptx',
    type: 'file',
    icon: '📽️',
    size: '2.3 MB',
    modified: 'Yesterday',
    path: '/Documents/Presentation.pptx'
  },
  {
    id: '6',
    name: 'Family Vacation.jpg',
    type: 'file',
    icon: '🖼️',
    size: '4.2 MB',
    modified: 'Last week',
    path: '/Pictures/Family Vacation.jpg'
  }
];

export function FileExplorer() {
  const [currentPath, setCurrentPath] = useState('/');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  const getCurrentFiles = () => {
    if (currentPath === '/') {
      return sampleFiles.filter(file => file.type === 'folder' || file.path.split('/').length === 2);
    }
    return sampleFiles.filter(file => file.path.startsWith(currentPath) && file.path !== currentPath);
  };

  const handleNavigate = (path: string) => {
    setCurrentPath(path);
    setSelectedItems([]);
  };

  const handleItemSelect = (itemId: string, isCtrlKey: boolean) => {
    if (isCtrlKey) {
      setSelectedItems(prev =>
        prev.includes(itemId)
          ? prev.filter(id => id !== itemId)
          : [...prev, itemId]
      );
    } else {
      setSelectedItems([itemId]);
    }
  };

  const handleItemDoubleClick = (item: any) => {
    if (item.type === 'folder') {
      handleNavigate(item.path);
    }
  };

  return (
    <div className="flex h-full bg-white/5">
      {/* Sidebar */}
      <FileExplorerSidebar
        currentPath={currentPath}
        onNavigate={handleNavigate}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <FileExplorerToolbar
          currentPath={currentPath}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          onNavigate={handleNavigate}
          selectedCount={selectedItems.length}
        />

        {/* Content Area */}
        <FileExplorerContent
          files={getCurrentFiles()}
          selectedItems={selectedItems}
          viewMode={viewMode}
          onItemSelect={handleItemSelect}
          onItemDoubleClick={handleItemDoubleClick}
        />
      </div>
    </div>
  );
}