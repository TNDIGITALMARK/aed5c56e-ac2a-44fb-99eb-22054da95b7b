'use client';

interface TaskbarButtonProps {
  app: {
    id: string;
    name: string;
    icon: string;
    type: 'start' | 'search' | 'task-view' | 'widgets' | 'app' | 'window';
  };
  isActive?: boolean;
  onClick: () => void;
}

export function TaskbarButton({ app, isActive = false, onClick }: TaskbarButtonProps) {
  return (
    <button
      className={`
        relative flex items-center justify-center
        w-10 h-10 rounded-md
        transition-all duration-150 ease-out
        hover:bg-white/10 hover:backdrop-blur-sm
        active:scale-95 active:bg-white/20
        ${isActive ? 'bg-white/15 backdrop-blur-sm' : ''}
        group
      `}
      onClick={onClick}
      title={app.name}
    >
      {/* Icon */}
      <span className="text-lg">{app.icon}</span>

      {/* Active Indicator */}
      {isActive && (
        <div className="
          absolute bottom-0 left-1/2 transform -translate-x-1/2
          w-1 h-1 rounded-full bg-white/80
        " />
      )}

      {/* Tooltip */}
      <div className="
        absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2
        px-2 py-1 text-xs text-white
        bg-black/80 backdrop-blur-sm rounded
        opacity-0 group-hover:opacity-100
        transition-opacity duration-200
        pointer-events-none whitespace-nowrap
        text-caption
      ">
        {app.name}
      </div>
    </button>
  );
}