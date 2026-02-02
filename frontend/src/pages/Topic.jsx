import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, BookOpen, ChevronRight, CheckCircle, ClipboardList } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { getTopicById } from '../data/subjects';
import { getLessonsByTopic } from '../data/lessons';
import { getProgress, markLessonCompleted } from '../lib/storage';

export default function Topic() {
  const { topicId } = useParams();
  const [viewingLessonId, setViewingLessonId] = useState(null);
  
  const topic = getTopicById(topicId);
  const allLessons = getLessonsByTopic(topicId);
  const progress = getProgress();

  if (!topic) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Topic not found</p>
        <Link to="/subjects">
          <Button variant="outline" className="mt-4">Go to Subjects</Button>
        </Link>
      </div>
    );
  }

  const handleMarkComplete = (lessonId) => {
    markLessonCompleted(lessonId);
    window.location.reload();
  };

  // Lesson Detail View
  const currentLesson = viewingLessonId ? allLessons.find(l => l.id === viewingLessonId) : null;
  
  if (currentLesson) {
    const isLessonCompleted = progress.completedLessons.includes(currentLesson.id);
    const formulaList = currentLesson.formulas || [];

    return (
      <div className="space-y-6">
        <button 
          onClick={() => setViewingLessonId(null)}
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          data-testid="back-to-lessons"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to {topic.name}
        </button>

        <Card className="border-border">
          <CardContent className="p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4 mb-6">
              <h1 className="font-heading font-black text-xl sm:text-2xl">{currentLesson.title}</h1>
              {isLessonCompleted && (
                <Badge className="bg-green-500/10 text-green-600 border-green-500/20">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Done
                </Badge>
              )}
            </div>

            <div className="space-y-4 text-foreground whitespace-pre-wrap font-body">
              {currentLesson.content}
            </div>

            {formulaList.length > 0 && (
              <div className="mt-8 border-t border-border pt-6">
                <h3 className="font-heading font-bold text-lg mb-4">Key Formulas</h3>
                <div className="space-y-3">
                  <FormulaCard name={formulaList[0]?.name} formula={formulaList[0]?.formula} />
                  {formulaList[1] && <FormulaCard name={formulaList[1].name} formula={formulaList[1].formula} />}
                </div>
              </div>
            )}

            <div className="mt-8 flex items-center gap-3">
              {!isLessonCompleted && (
                <Button 
                  onClick={() => handleMarkComplete(currentLesson.id)}
                  className="bg-green-600 hover:bg-green-700 text-white"
                  data-testid="mark-complete-btn"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Mark Complete
                </Button>
              )}
              <Link to={`/quiz/${topicId}`}>
                <Button variant="outline">
                  <ClipboardList className="w-4 h-4 mr-2" />
                  Take Quiz
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Lessons List View
  return (
    <div className="space-y-6">
      <div>
        <Link 
          to={`/subjects/${topic.subjectId}`} 
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          {topic.subjectName}
        </Link>
        
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="font-heading font-black text-2xl sm:text-3xl">{topic.name}</h1>
            <p className="text-muted-foreground mt-1">{topic.description}</p>
          </div>
          <Link to={`/quiz/${topicId}`}>
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90" data-testid="topic-quiz-btn">
              <ClipboardList className="w-4 h-4 mr-2" />
              Quiz
            </Button>
          </Link>
        </div>
      </div>

      <div>
        <h2 className="font-heading font-bold text-lg mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-accent" />
          Lessons
        </h2>

        {allLessons.length === 0 ? (
          <Card className="border-border">
            <CardContent className="p-8 text-center">
              <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Lessons coming soon!</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            <LessonCard 
              lesson={allLessons[0]} 
              index={0} 
              isCompleted={progress.completedLessons.includes(allLessons[0]?.id)} 
              onClick={() => setViewingLessonId(allLessons[0]?.id)} 
            />
            {allLessons[1] && (
              <LessonCard 
                lesson={allLessons[1]} 
                index={1} 
                isCompleted={progress.completedLessons.includes(allLessons[1].id)} 
                onClick={() => setViewingLessonId(allLessons[1].id)} 
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function LessonCard({ lesson, index, isCompleted, onClick }) {
  if (!lesson) return null;
  return (
    <Card 
      className="border-border hover:border-accent/50 transition-all duration-150 cursor-pointer"
      onClick={onClick}
      data-testid={`lesson-card-${lesson.id}`}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-muted flex items-center justify-center text-sm font-mono font-bold">
              {index + 1}
            </div>
            <div className="flex items-center gap-2">
              <h3 className="font-heading font-bold text-base">{lesson.title}</h3>
              {isCompleted && <CheckCircle className="w-4 h-4 text-green-500" />}
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        </div>
      </CardContent>
    </Card>
  );
}

function FormulaCard({ name, formula }) {
  if (!name || !formula) return null;
  return (
    <div className="bg-muted p-4 border border-border">
      <p className="text-sm text-muted-foreground mb-1">{name}</p>
      <p className="font-mono text-base font-medium">{formula}</p>
    </div>
  );
}
