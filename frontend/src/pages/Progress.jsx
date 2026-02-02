import { Link } from 'react-router-dom';
import { BarChart3, Target, BookOpen, ClipboardList, TrendingUp, AlertTriangle, Trophy, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import { subjects, topics, getTopicsForSubject } from '../data/subjects';
import { getProgress, getPerformanceBySubject, getWeakTopics, getQuizResults } from '../lib/storage';

export default function ProgressPage() {
  const progress = getProgress();
  const performanceBySubject = getPerformanceBySubject();
  const weakTopics = getWeakTopics();
  const quizResults = getQuizResults();

  const totalTopics = topics.length;
  const completedTopics = progress.completedTopics.length;
  const overallProgress = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;
  const overallAccuracy = progress.totalAnswers > 0
    ? Math.round((progress.correctAnswers / progress.totalAnswers) * 100)
    : 0;

  // Recent quiz results (last 5)
  const recentQuizzes = quizResults.slice(-5).reverse();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-heading font-black text-2xl sm:text-3xl mb-2">Your Progress</h1>
        <p className="text-muted-foreground">Track your learning journey and identify areas for improvement</p>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="border-border" data-testid="overall-progress">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-4 h-4 text-accent" />
              <span className="text-xs text-muted-foreground uppercase tracking-wide">Overall</span>
            </div>
            <p className="font-heading font-bold text-3xl">{overallProgress}%</p>
            <Progress value={overallProgress} className="h-1.5 mt-2" />
          </CardContent>
        </Card>

        <Card className="border-border" data-testid="topics-completed">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="w-4 h-4 text-accent" />
              <span className="text-xs text-muted-foreground uppercase tracking-wide">Topics</span>
            </div>
            <p className="font-heading font-bold text-3xl">{completedTopics}</p>
            <p className="text-xs text-muted-foreground mt-1">of {totalTopics} completed</p>
          </CardContent>
        </Card>

        <Card className="border-border" data-testid="quizzes-taken">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <ClipboardList className="w-4 h-4 text-accent" />
              <span className="text-xs text-muted-foreground uppercase tracking-wide">Quizzes</span>
            </div>
            <p className="font-heading font-bold text-3xl">{progress.totalQuizzesTaken}</p>
            <p className="text-xs text-muted-foreground mt-1">total taken</p>
          </CardContent>
        </Card>

        <Card className="border-border" data-testid="overall-accuracy">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-accent" />
              <span className="text-xs text-muted-foreground uppercase tracking-wide">Accuracy</span>
            </div>
            <p className="font-heading font-bold text-3xl">{overallAccuracy}%</p>
            <p className="text-xs text-muted-foreground mt-1">{progress.correctAnswers}/{progress.totalAnswers} correct</p>
          </CardContent>
        </Card>
      </div>

      {/* Subject Performance */}
      <div>
        <h2 className="font-heading font-bold text-lg mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-accent" />
          Performance by Subject
        </h2>
        
        <div className="space-y-4">
          {subjects.map((subject) => {
            const perf = performanceBySubject[subject.id];
            const accuracy = perf?.total > 0 ? Math.round((perf.correct / perf.total) * 100) : 0;
            const subjectTopics = getTopicsForSubject(subject.id);
            const completedInSubject = subjectTopics.filter(t => 
              progress.completedTopics.includes(t.id)
            ).length;
            const subjectProgress = Math.round((completedInSubject / subjectTopics.length) * 100);

            return (
              <Card key={subject.id} className="border-border">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-heading font-bold">{subject.shortName}</h3>
                      <p className="text-xs text-muted-foreground">
                        {completedInSubject}/{subjectTopics.length} topics
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="font-mono font-bold text-lg">{accuracy}%</span>
                      <p className="text-xs text-muted-foreground">accuracy</p>
                    </div>
                  </div>
                  <Progress value={subjectProgress} className="h-2" />
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Weak Areas */}
      {weakTopics.length > 0 && (
        <div>
          <h2 className="font-heading font-bold text-lg mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-destructive" />
            Areas to Improve
          </h2>
          
          <Card className="border-border border-destructive/30">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground mb-4">
                These topics need more practice (below 60% accuracy):
              </p>
              <div className="space-y-3">
                {weakTopics.slice(0, 5).map((topic) => (
                  <div key={topic.topicId} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">{topic.topicName}</p>
                      <p className="text-xs text-muted-foreground">{topic.correct}/{topic.total} correct</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm text-destructive">{topic.percentage}%</span>
                      <Link to={`/quiz/${topic.topicId}`}>
                        <Button size="sm" variant="outline" data-testid={`practice-weak-${topic.topicId}`}>
                          Practice
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Recent Quizzes */}
      <div>
        <h2 className="font-heading font-bold text-lg mb-4 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-accent" />
          Recent Quizzes
        </h2>

        {recentQuizzes.length === 0 ? (
          <Card className="border-border">
            <CardContent className="p-8 text-center">
              <ClipboardList className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">You have not taken any quizzes yet</p>
              <Link to="/subjects">
                <Button>Take Your First Quiz</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {recentQuizzes.map((quiz, index) => {
              const isPassing = (quiz.correct / quiz.total) >= 0.6;
              const quizDate = new Date(quiz.date);

              return (
                <Card key={index} className="border-border">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{quiz.topicName}</p>
                        <p className="text-xs text-muted-foreground">
                          {quizDate.toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <span className={`font-mono font-bold ${isPassing ? 'text-green-600' : 'text-destructive'}`}>
                            {quiz.correct}/{quiz.total}
                          </span>
                          <p className="text-xs text-muted-foreground">
                            {Math.round((quiz.correct / quiz.total) * 100)}%
                          </p>
                        </div>
                        <Link to={`/quiz/${quiz.topicId}`}>
                          <Button size="icon" variant="ghost">
                            <ChevronRight className="w-4 h-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* Call to Action */}
      {progress.totalQuizzesTaken > 0 && overallProgress < 100 && (
        <Card className="border-border bg-accent/5">
          <CardContent className="p-6 text-center">
            <Trophy className="w-10 h-10 text-accent mx-auto mb-3" />
            <h3 className="font-heading font-bold text-lg mb-2">Keep Going!</h3>
            <p className="text-sm text-muted-foreground mb-4">
              You are {overallProgress}% through the material. Stay consistent!
            </p>
            <Link to="/subjects">
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                Continue Studying
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
