'use client';

export function NewsWidget() {
  const newsArticles = [
    {
      id: 1,
      title: 'Microsoft Announces New AI Features',
      source: 'TechCrunch',
      time: '2h ago',
      category: 'Technology'
    },
    {
      id: 2,
      title: 'Windows 11 Usage Continues to Grow',
      source: 'The Verge',
      time: '4h ago',
      category: 'Technology'
    },
    {
      id: 3,
      title: 'Remote Work Trends in 2024',
      source: 'Forbes',
      time: '6h ago',
      category: 'Business'
    }
  ];

  return (
    <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-body-strong">News</h3>
        <button className="text-caption text-blue-400 hover:underline">
          See all
        </button>
      </div>

      {/* News Articles */}
      <div className="space-y-3">
        {newsArticles.map((article) => (
          <button
            key={article.id}
            className="
              flex flex-col gap-1 w-full p-2 -m-2
              hover:bg-white/10 rounded transition-colors
              text-left
            "
          >
            <div className="text-body text-white/90 line-clamp-2">
              {article.title}
            </div>
            <div className="flex items-center gap-2 text-caption text-white/60">
              <span>{article.source}</span>
              <span>•</span>
              <span>{article.time}</span>
              <span>•</span>
              <span>{article.category}</span>
            </div>
          </button>
        ))}
      </div>

      {/* News Sources */}
      <div className="mt-4 pt-3 border-t border-white/10">
        <div className="text-caption text-white/60 mb-2">
          Your interests
        </div>
        <div className="flex flex-wrap gap-1">
          {['Technology', 'Business', 'Science', 'Sports'].map((interest) => (
            <span
              key={interest}
              className="
                px-2 py-1 text-caption
                bg-white/10 rounded-full
                text-white/80
              "
            >
              {interest}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}