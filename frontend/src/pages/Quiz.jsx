import { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Clock, CheckCircle, XCircle, ChevronRight, Trophy, RotateCcw, BookOpen } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import { getTopicById } from '../data/subjects';
import { getRandomQuestions } from '../data/quizzes';
import { saveQuizResult, markTopicCompleted } from '../lib/storage';
import { cn } from '../lib/utils';

const QUIZ_TIME_LIMIT = 300; // 5 minutes in seconds

export default function Quiz() {
  const { topicId } = useParams();
  const topic = getTopicById(topicId);
  
  const [quizState, setQuizState] = useState('setup');
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [timedMode, setTimedMode] = useState(false);
  const [timeLeft, setTimeLeft] = useState(QUIZ_TIME_LIMIT);
  const [quizResult, setQuizResult] = useState(null);
  const timerRef = useRef(null);

  // Function to finish quiz
  const finishQuiz = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    const correct = questions.filter(q => answers[q.id] === q.correctAnswer).length;
    const result = {
      topicId,
      topicName: topic?.name || topicId,
      subjectId: topic?.subjectId || 'unknown',
      correct,
      total: questions.length,
      percentage: Math.round((correct / questions.length) * 100),
      timedMode,
      timeSpent: timedMode ? QUIZ_TIME_LIMIT - timeLeft : null,
    };
    
    saveQuizResult(result);
    
    if (result.percentage >= 60) {
      markTopicCompleted(topicId);
    }
    
    setQuizResult(result);
    setQuizState('review');
  };

  // Timer effect
  useEffect(() => {
    if (quizState !== 'active' || !timedMode) return;

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [quizState, timedMode]);

  // Auto-finish when timer hits 0
  useEffect(() => {
    if (timeLeft === 0 && quizState === 'active' && timedMode) {
      finishQuiz();
    }
  }, [timeLeft]);

  const startQuiz = (timed = false) => {
    const quizQuestions = getRandomQuestions(topicId, 5);
    if (quizQuestions.length === 0) {
      alert('No questions available for this topic yet.');
      return;
    }
    setQuestions(quizQuestions);
    setTimedMode(timed);
    setTimeLeft(QUIZ_TIME_LIMIT);
    setAnswers({});
    setCurrentIndex(0);
    setShowExplanation(false);
    setQuizState('active');
  };

  const selectAnswer = (questionId, answerIndex) => {
    if (showExplanation) return;
    setAnswers(prev => ({ ...prev, [questionId]: answerIndex }));
    setShowExplanation(true);
  };

  const nextQuestion = () => {
    setShowExplanation(false);
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      finishQuiz();
    }
  };

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

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Setup Screen
  if (quizState === 'setup') {
    return (
      <div className="space-y-6">
        <Link 
          to={`/subjects/${topic.subjectId}`}
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          Back to Subject
        </Link>

        <Card className="border-border">
          <CardContent className="p-6 sm:p-8 text-center">
            <div className="w-16 h-16 bg-accent/10 flex items-center justify-center mx-auto mb-6">
              <Trophy className="w-8 h-8 text-accent" />
            </div>
            
            <h1 className="font-heading font-black text-2xl sm:text-3xl mb-2">{topic.name}</h1>
            <p className="text-muted-foreground mb-8">Test your knowledge with board-exam style questions</p>

            <div className="grid gap-4 max-w-sm mx-auto">
              <Button 
                onClick={() => startQuiz(false)} 
                className="h-14 text-base"
                data-testid="start-practice-quiz"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Practice Mode
              </Button>
              
              <Button 
                onClick={() => startQuiz(true)} 
                variant="outline"
                className="h-14 text-base"
                data-testid="start-timed-quiz"
              >
                <Clock className="w-5 h-5 mr-2" />
                Timed Mode (5 min)
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Review Screen
  if (quizState === 'review') {
    const isPassing = quizResult.percentage >= 60;

    return (
      <div className="space-y-6">
        <Card className="border-border">
          <CardContent className="p-6 sm:p-8 text-center">
            <div className={cn(
              "w-20 h-20 flex items-center justify-center mx-auto mb-6",
              isPassing ? "bg-green-500/10" : "bg-destructive/10"
            )}>
              {isPassing ? (
                <Trophy className="w-10 h-10 text-green-500" />
              ) : (
                <XCircle className="w-10 h-10 text-destructive" />
              )}
            </div>

            <h1 className="font-heading font-black text-3xl sm:text-4xl mb-2">
              {quizResult.percentage}%
            </h1>
            <p className="text-muted-foreground text-lg mb-2">
              {quizResult.correct} out of {quizResult.total} correct
            </p>
            {isPassing ? (
              <p className="text-green-600 font-medium">Great job! Topic marked as completed.</p>
            ) : (
              <p className="text-muted-foreground">Keep practicing! Need 60% to pass.</p>
            )}

            <div className="grid gap-4 max-w-sm mx-auto mt-8">
              <Button 
                onClick={() => setQuizState('setup')} 
                className="bg-accent text-accent-foreground hover:bg-accent/90"
                data-testid="try-again-btn"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
              
              <Link to={`/topic/${topicId}`}>
                <Button variant="outline" className="w-full" data-testid="review-lessons-btn">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Review Lessons
                </Button>
              </Link>
              
              <Link to="/progress">
                <Button variant="ghost" className="w-full">
                  View Progress
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Answer Review */}
        <div className="space-y-4">
          <h2 className="font-heading font-bold text-lg">Answer Review</h2>
          {questions.map((question, qIndex) => {
            const userAnswer = answers[question.id];
            const isCorrect = userAnswer === question.correctAnswer;

            return (
              <Card key={question.id} className="border-border">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className={cn(
                      "w-8 h-8 flex items-center justify-center flex-shrink-0",
                      isCorrect ? "bg-green-500/10" : "bg-destructive/10"
                    )}>
                      {isCorrect ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <XCircle className="w-5 h-5 text-destructive" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm mb-2">Q{qIndex + 1}: {question.question}</p>
                      <p className="text-sm text-muted-foreground">
                        Your answer: <span className={isCorrect ? "text-green-600" : "text-destructive"}>
                          {question.options[userAnswer] || 'No answer'}
                        </span>
                      </p>
                      {!isCorrect && (
                        <p className="text-sm text-green-600 mt-1">
                          Correct: {question.options[question.correctAnswer]}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }

  // Active Quiz Screen
  const currentQuestion = questions[currentIndex];
  const userAnswer = answers[currentQuestion?.id];
  const progressPercent = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="space-y-6">
      {/* Quiz Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{topic.name}</p>
          <p className="font-heading font-bold">Question {currentIndex + 1} of {questions.length}</p>
        </div>
        {timedMode && (
          <div className={cn(
            "flex items-center gap-2 px-3 py-2 font-mono font-bold",
            timeLeft <= 60 ? "bg-destructive/10 text-destructive" : "bg-muted"
          )} data-testid="quiz-timer">
            <Clock className="w-4 h-4" />
            {formatTime(timeLeft)}
          </div>
        )}
      </div>

      {/* Progress Bar */}
      <Progress value={progressPercent} className="h-2" />

      {/* Question Card */}
      <Card className="border-border">
        <CardContent className="p-6">
          <p className="font-heading font-bold text-lg mb-6" data-testid="quiz-question">
            {currentQuestion?.question}
          </p>

          <div className="space-y-3">
            {currentQuestion?.options.map((option, index) => {
              const isSelected = userAnswer === index;
              const isCorrect = index === currentQuestion.correctAnswer;
              const showResult = showExplanation;

              return (
                <button
                  key={index}
                  onClick={() => selectAnswer(currentQuestion.id, index)}
                  disabled={showExplanation}
                  className={cn(
                    "w-full text-left p-4 border transition-all duration-150",
                    !showResult && "hover:border-accent hover:bg-accent/5",
                    !showResult && isSelected && "border-accent bg-accent/10",
                    showResult && isCorrect && "border-green-500 bg-green-500/10",
                    showResult && isSelected && !isCorrect && "border-destructive bg-destructive/10",
                    !showResult && !isSelected && "border-border"
                  )}
                  data-testid={`quiz-option-${index}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 flex items-center justify-center bg-muted font-mono text-sm font-bold">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="flex-1">{option}</span>
                    {showResult && isCorrect && (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    )}
                    {showResult && isSelected && !isCorrect && (
                      <XCircle className="w-5 h-5 text-destructive" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {showExplanation && (
            <div className="mt-6 p-4 bg-muted border border-border">
              <p className="text-sm font-medium mb-1">Explanation:</p>
              <p className="text-sm text-muted-foreground">{currentQuestion.explanation}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Next Button */}
      {showExplanation && (
        <div className="flex justify-end">
          <Button onClick={nextQuestion} className="bg-accent text-accent-foreground hover:bg-accent/90" data-testid="next-question-btn">
            {currentIndex < questions.length - 1 ? (
              <>
                Next Question
                <ChevronRight className="w-4 h-4 ml-1" />
              </>
            ) : (
              <>
                Finish Quiz
                <Trophy className="w-4 h-4 ml-1" />
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
