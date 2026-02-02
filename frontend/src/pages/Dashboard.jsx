import { Link } from 'react-router-dom';
import { Calculator, Waves, Building2, BookOpen, ClipboardList, TrendingUp, ArrowRight, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import { ExamCountdown } from '../components/ExamCountdown';
import { subjects, getTopicsForSubject, topics } from '../data/subjects';
import { getProgress, getPerformanceBySubject } from '../lib/storage';

const iconMap = {
  Calculator: Calculator,
  Waves: Waves,
  Building2: Building2,
};

export default function Dashboard() {
  const progress = getProgress();
  const performanceBySubject = getPerformanceBySubject();
  
  const totalTopics = topics.length;
  const completedTopics = progress.completedTopics.length;
  const overallProgress = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;
  const accuracy = progress.totalAnswers > 0 
    ? Math.round((progress.correctAnswers / progress.totalAnswers) * 100) 
    : 0;

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="relative overflow-hidden border border-border bg-card p-6 sm:p-8">
        <div className="grid-pattern absolute inset-0 opacity-50" />
        <div className="relative z-10">
          <h1 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl mb-2">
            EngiPrep <span className="text-accent">PH</span>
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg mb-6 max-w-xl">
            Your smart companion for the March 2026 Civil Engineering Licensure Examination
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/subjects">
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90 uppercase tracking-wide text-sm font-bold" data-testid="start-reviewing-btn">
                <BookOpen className="w-4 h-4 mr-2" />
                Start Reviewing
              </Button>
            </Link>
            <Link to="/subjects">
              <Button variant="outline" data-testid="take-quiz-btn">
                <ClipboardList className="w-4 h-4 mr-2" />
                Take a Quiz
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Exam Countdown */}
      <ExamCountdown />

      {/* Quick Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="border-border" data-testid="stat-progress">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-4 h-4 text-accent" />
              <span className="text-xs text-muted-foreground uppercase tracking-wide">Progress</span>
            </div>
            <p className="font-heading font-bold text-2xl">{overallProgress}%</p>
            <Progress value={overallProgress} className="h-1 mt-2" />
          </CardContent>
        </Card>

        <Card className="border-border" data-testid="stat-topics">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="w-4 h-4 text-accent" />
              <span className="text-xs text-muted-foreground uppercase tracking-wide">Topics</span>
            </div>
            <p className="font-heading font-bold text-2xl">{completedTopics}/{totalTopics}</p>
            <p className="text-xs text-muted-foreground mt-1">Completed</p>
          </CardContent>
        </Card>

        <Card className="border-border" data-testid="stat-quizzes">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <ClipboardList className="w-4 h-4 text-accent" />
              <span className="text-xs text-muted-foreground uppercase tracking-wide">Quizzes</span>
            </div>
            <p className="font-heading font-bold text-2xl">{progress.totalQuizzesTaken}</p>
            <p className="text-xs text-muted-foreground mt-1">Taken</p>
          </CardContent>
        </Card>

        <Card className="border-border" data-testid="stat-accuracy">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-accent" />
              <span className="text-xs text-muted-foreground uppercase tracking-wide">Accuracy</span>
            </div>
            <p className="font-heading font-bold text-2xl">{accuracy}%</p>
            <p className="text-xs text-muted-foreground mt-1">Overall</p>
          </CardContent>
        </Card>
      </div>

      {/* Subjects Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-heading font-bold text-xl">Board Exam Subjects</h2>
          <Link to="/subjects" className="text-accent text-sm font-medium hover:underline flex items-center gap-1">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {subjects.map((subject) => {
            const Icon = iconMap[subject.icon];
            const subjectPerformance = performanceBySubject[subject.id];
            const subjectAccuracy = subjectPerformance?.total > 0 
              ? Math.round((subjectPerformance.correct / subjectPerformance.total) * 100) 
              : null;
            const subjectTopics = getTopicsForSubject(subject.id);

            return (
              <Link key={subject.id} to={`/subjects/${subject.id}`} data-testid={`subject-card-${subject.id}`}>
                <Card className="border-border hover:border-accent/50 transition-all duration-150 h-full">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className={`w-10 h-10 ${subject.color} flex items-center justify-center`}>
                        {Icon && <Icon className="w-5 h-5 text-white" />}
                      </div>
                      {subjectAccuracy !== null && (
                        <span className="text-xs font-mono bg-muted px-2 py-1">
                          {subjectAccuracy}%
                        </span>
                      )}
                    </div>
                    <CardTitle className="font-heading text-base mt-3">{subject.shortName}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                      {subject.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>{subjectTopics.length} Topics</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Quick Tips */}
      <Card className="border-border bg-muted/30">
        <CardContent className="p-6">
          <h3 className="font-heading font-bold text-lg mb-3 flex items-center gap-2">
            <Target className="w-5 h-5 text-accent" />
            Study Tip
          </h3>
          <p className="text-muted-foreground text-sm">
            <strong className="text-foreground">Focus on weak areas first.</strong> Check your Progress page to identify topics where you need more practice. Consistent daily review is more effective than cramming.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
