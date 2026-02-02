import { useState, useEffect } from 'react';
import { Calendar, Clock } from 'lucide-react';
import { Card, CardContent } from './ui/card';

// March 2026 CE Board Exam date (assuming first Sunday of March)
const EXAM_DATE = new Date('2026-03-01T08:00:00');

// Move TimeBlock outside of main component
const TimeBlock = ({ value, label }) => (
  <div className="flex flex-col items-center">
    <div className="bg-primary text-primary-foreground font-mono font-bold text-2xl sm:text-3xl px-3 py-2 min-w-[60px] text-center">
      {String(value).padStart(2, '0')}
    </div>
    <span className="text-xs text-muted-foreground mt-1 uppercase tracking-wide">{label}</span>
  </div>
);

function calculateTimeLeft() {
  const now = new Date();
  const difference = EXAM_DATE.getTime() - now.getTime();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

export const ExamCountdown = () => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Card className="border-border bg-card" data-testid="exam-countdown">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5 text-accent" />
          <h3 className="font-heading font-bold text-lg">Board Exam Countdown</h3>
        </div>
        
        <div className="flex items-center justify-center gap-2 sm:gap-4">
          <TimeBlock value={timeLeft.days} label="Days" />
          <span className="text-2xl text-muted-foreground font-bold">:</span>
          <TimeBlock value={timeLeft.hours} label="Hours" />
          <span className="text-2xl text-muted-foreground font-bold">:</span>
          <TimeBlock value={timeLeft.minutes} label="Mins" />
          <span className="text-2xl text-muted-foreground font-bold hidden sm:block">:</span>
          <div className="hidden sm:block">
            <TimeBlock value={timeLeft.seconds} label="Secs" />
          </div>
        </div>

        <div className="mt-4 text-center">
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
            <Clock className="w-4 h-4" />
            March 2026 CE Licensure Examination
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
