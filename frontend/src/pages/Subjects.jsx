import { Link, useParams } from 'react-router-dom';
import { Calculator, Waves, Building2, BookOpen, ClipboardList, ChevronRight, ArrowLeft, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { subjects, getSubjectById, getTopicsForSubject } from '../data/subjects';
import { getProgress } from '../lib/storage';

const iconMap = {
  Calculator: Calculator,
  Waves: Waves,
  Building2: Building2,
};

export default function Subjects() {
  const { subjectId } = useParams();
  const progress = getProgress();

  // Single Subject Detail View
  if (subjectId) {
    const subject = getSubjectById(subjectId);

    if (!subject) {
      return (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Subject not found</p>
          <Link to="/subjects">
            <Button variant="outline" className="mt-4">Go Back</Button>
          </Link>
        </div>
      );
    }

    const Icon = iconMap[subject.icon];
    const subjectTopics = getTopicsForSubject(subjectId);

    return (
      <div className="space-y-6">
        <div>
          <Link to="/subjects" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="w-4 h-4" />
            All Subjects
          </Link>
          
          <div className="flex items-start gap-4">
            <div className={`w-14 h-14 ${subject.color} flex items-center justify-center flex-shrink-0`}>
              {Icon && <Icon className="w-7 h-7 text-white" />}
            </div>
            <div>
              <h1 className="font-heading font-black text-2xl sm:text-3xl">{subject.name}</h1>
              <p className="text-muted-foreground mt-1">{subject.description}</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="font-heading font-bold text-lg mb-4">Topics ({subjectTopics.length})</h2>
          <div className="space-y-3">
            {subjectTopics.map((topic) => {
              const isCompleted = progress.completedTopics.includes(topic.id);

              return (
                <Card key={topic.id} className="border-border hover:border-accent/50 transition-all duration-150">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-heading font-bold text-base">{topic.name}</h3>
                          {isCompleted && (
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-0.5 line-clamp-1">
                          {topic.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <Link to={`/topic/${topic.id}`}>
                          <Button variant="outline" size="sm" data-testid={`lesson-btn-${topic.id}`}>
                            <BookOpen className="w-4 h-4 mr-1" />
                            Lessons
                          </Button>
                        </Link>
                        <Link to={`/quiz/${topic.id}`}>
                          <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90" data-testid={`quiz-btn-${topic.id}`}>
                            <ClipboardList className="w-4 h-4 mr-1" />
                            Quiz
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // All Subjects List View
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading font-black text-2xl sm:text-3xl mb-2">Board Exam Subjects</h1>
        <p className="text-muted-foreground">Master all three subject areas for the CE Licensure Examination</p>
      </div>

      <div className="space-y-4">
        {subjects.map((subject) => {
          const Icon = iconMap[subject.icon];
          const subjectTopics = getTopicsForSubject(subject.id);
          const completedInSubject = subjectTopics.filter(t => 
            progress.completedTopics.includes(t.id)
          ).length;

          return (
            <Link key={subject.id} to={`/subjects/${subject.id}`} data-testid={`subject-${subject.id}`}>
              <Card className="border-border hover:border-accent/50 transition-all duration-150 mb-4">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 ${subject.color} flex items-center justify-center flex-shrink-0`}>
                      {Icon && <Icon className="w-6 h-6 text-white" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h2 className="font-heading font-bold text-lg">{subject.name}</h2>
                        <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                      </div>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {subject.description}
                      </p>
                      <div className="flex items-center gap-4 mt-3 text-sm">
                        <Badge variant="secondary">
                          {subjectTopics.length} Topics
                        </Badge>
                        {completedInSubject > 0 && (
                          <span className="text-accent text-xs font-medium flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" />
                            {completedInSubject} completed
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
