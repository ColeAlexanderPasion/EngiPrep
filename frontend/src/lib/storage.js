// Local storage helper for progress tracking
const STORAGE_KEYS = {
  PROGRESS: 'engiprep_progress',
  QUIZ_RESULTS: 'engiprep_quiz_results',
  THEME: 'engiprep_theme',
};

// Get progress data
export const getProgress = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.PROGRESS);
    return data ? JSON.parse(data) : {
      completedTopics: [],
      completedLessons: [],
      totalQuizzesTaken: 0,
      correctAnswers: 0,
      totalAnswers: 0,
    };
  } catch {
    return {
      completedTopics: [],
      completedLessons: [],
      totalQuizzesTaken: 0,
      correctAnswers: 0,
      totalAnswers: 0,
    };
  }
};

// Save progress data
export const saveProgress = (progress) => {
  try {
    localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(progress));
  } catch (e) {
    console.error('Failed to save progress:', e);
  }
};

// Mark topic as completed
export const markTopicCompleted = (topicId) => {
  const progress = getProgress();
  if (!progress.completedTopics.includes(topicId)) {
    progress.completedTopics.push(topicId);
    saveProgress(progress);
  }
  return progress;
};

// Mark lesson as completed
export const markLessonCompleted = (lessonId) => {
  const progress = getProgress();
  if (!progress.completedLessons.includes(lessonId)) {
    progress.completedLessons.push(lessonId);
    saveProgress(progress);
  }
  return progress;
};

// Get quiz results
export const getQuizResults = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.QUIZ_RESULTS);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

// Save quiz result
export const saveQuizResult = (result) => {
  try {
    const results = getQuizResults();
    results.push({
      ...result,
      date: new Date().toISOString(),
    });
    localStorage.setItem(STORAGE_KEYS.QUIZ_RESULTS, JSON.stringify(results));
    
    // Update overall progress
    const progress = getProgress();
    progress.totalQuizzesTaken += 1;
    progress.correctAnswers += result.correct;
    progress.totalAnswers += result.total;
    saveProgress(progress);
    
    return results;
  } catch (e) {
    console.error('Failed to save quiz result:', e);
    return [];
  }
};

// Get performance by subject
export const getPerformanceBySubject = () => {
  const results = getQuizResults();
  const performance = {};
  
  results.forEach((result) => {
    if (!performance[result.subjectId]) {
      performance[result.subjectId] = {
        correct: 0,
        total: 0,
        quizzes: 0,
      };
    }
    performance[result.subjectId].correct += result.correct;
    performance[result.subjectId].total += result.total;
    performance[result.subjectId].quizzes += 1;
  });
  
  return performance;
};

// Get weak topics (score < 60%)
export const getWeakTopics = () => {
  const results = getQuizResults();
  const topicPerformance = {};
  
  results.forEach((result) => {
    if (!topicPerformance[result.topicId]) {
      topicPerformance[result.topicId] = {
        correct: 0,
        total: 0,
        topicName: result.topicName,
        subjectId: result.subjectId,
      };
    }
    topicPerformance[result.topicId].correct += result.correct;
    topicPerformance[result.topicId].total += result.total;
  });
  
  const weakTopics = Object.entries(topicPerformance)
    .filter(([_, data]) => data.total > 0 && (data.correct / data.total) < 0.6)
    .map(([topicId, data]) => ({
      topicId,
      ...data,
      percentage: Math.round((data.correct / data.total) * 100),
    }))
    .sort((a, b) => a.percentage - b.percentage);
  
  return weakTopics;
};

// Clear all progress
export const clearAllProgress = () => {
  localStorage.removeItem(STORAGE_KEYS.PROGRESS);
  localStorage.removeItem(STORAGE_KEYS.QUIZ_RESULTS);
};
