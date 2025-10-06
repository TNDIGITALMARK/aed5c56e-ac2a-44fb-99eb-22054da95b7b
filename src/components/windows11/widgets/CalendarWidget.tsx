'use client';

import { useState } from 'react';

export function CalendarWidget() {
  const [currentDate] = useState(new Date());

  const events = [
    {
      id: 1,
      title: 'Team Meeting',
      time: '10:00 AM',
      date: 'Today'
    },
    {
      id: 2,
      title: 'Project Review',
      time: '2:30 PM',
      date: 'Today'
    },
    {
      id: 3,
      title: 'Client Call',
      time: '9:00 AM',
      date: 'Tomorrow'
    }
  ];

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
      {/* Date Header */}
      <div className="mb-4">
        <div className="text-body-strong mb-1">
          {formatDate(currentDate)}
        </div>
        <div className="text-caption text-white/70">
          {currentDate.getFullYear()}
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="space-y-3">
        <div className="text-body-strong text-white/90 mb-2">
          Upcoming
        </div>

        {events.map((event) => (
          <div key={event.id} className="flex items-start gap-3">
            <div className="w-1 h-12 bg-blue-400 rounded-full flex-shrink-0 mt-1" />
            <div className="flex-1 min-w-0">
              <div className="text-body text-white/90 font-medium">
                {event.title}
              </div>
              <div className="text-caption text-white/60">
                {event.date} at {event.time}
              </div>
            </div>
          </div>
        ))}

        {events.length === 0 && (
          <div className="text-center text-white/60 py-4">
            <div className="text-2xl mb-2">📅</div>
            <div className="text-caption">No upcoming events</div>
          </div>
        )}
      </div>
    </div>
  );
}