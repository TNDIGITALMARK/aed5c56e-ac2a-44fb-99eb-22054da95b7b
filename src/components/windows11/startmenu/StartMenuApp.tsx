'use client';

interface StartMenuAppProps {
  app: {
    id: string;
    name: string;
    icon: string;
    category: string;
  };
  onClick: () => void;
}

export function StartMenuApp({ app, onClick }: StartMenuAppProps) {
  return (
    <button
      className="
        flex flex-col items-center justify-center
        w-20 h-20 p-2
        hover:bg-white/10 active:bg-white/20
        rounded-md transition-all duration-150
        group
      "
      onClick={onClick}
      title={app.name}
    >
      {/* Icon */}
      <div className="text-2xl mb-1 group-hover:scale-110 transition-transform duration-150">
        {app.icon}
      </div>

      {/* Name */}
      <span className="text-caption text-center leading-tight line-clamp-2">
        {app.name}
      </span>
    </button>
  );
}