'use client';

export function WeatherWidget() {
  const weatherData = {
    location: 'Seattle, WA',
    temperature: 68,
    condition: 'Partly Cloudy',
    icon: '⛅',
    high: 72,
    low: 58,
    forecast: [
      { day: 'Mon', icon: '☀️', high: 75, low: 60 },
      { day: 'Tue', icon: '🌦️', high: 68, low: 55 },
      { day: 'Wed', icon: '⛅', high: 70, low: 58 },
      { day: 'Thu', icon: '☀️', high: 73, low: 62 }
    ]
  };

  return (
    <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
      {/* Current Weather */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="text-2xl font-light mb-1">
            {weatherData.temperature}°
          </div>
          <div className="text-caption text-white/70">
            {weatherData.location}
          </div>
          <div className="text-body text-white/90">
            {weatherData.condition}
          </div>
        </div>
        <div className="text-4xl">
          {weatherData.icon}
        </div>
      </div>

      {/* High/Low */}
      <div className="flex items-center gap-4 mb-4 text-caption text-white/70">
        <span>H: {weatherData.high}°</span>
        <span>L: {weatherData.low}°</span>
      </div>

      {/* 4-day Forecast */}
      <div className="grid grid-cols-4 gap-2">
        {weatherData.forecast.map((day) => (
          <div key={day.day} className="text-center">
            <div className="text-caption text-white/70 mb-1">
              {day.day}
            </div>
            <div className="text-lg mb-1">
              {day.icon}
            </div>
            <div className="text-caption">
              <div>{day.high}°</div>
              <div className="text-white/60">{day.low}°</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}