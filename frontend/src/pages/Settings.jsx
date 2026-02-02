import { motion } from 'framer-motion';
import { Moon, Sun, Trash2, AlertTriangle, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Switch } from '../components/ui/switch';
import { Label } from '../components/ui/label';
import { Separator } from '../components/ui/separator';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../components/ui/alert-dialog';
import { useTheme } from '../components/ThemeProvider';
import { clearAllProgress, getProgress } from '../lib/storage';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function Settings() {
  const { theme, setTheme } = useTheme();
  const progress = getProgress();

  const handleClearProgress = () => {
    clearAllProgress();
    window.location.reload();
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <h1 className="font-heading font-black text-2xl sm:text-3xl mb-2">Settings</h1>
        <p className="text-muted-foreground">Customize your EngiPrep PH experience</p>
      </motion.div>

      {/* Appearance */}
      <motion.div variants={itemVariants}>
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="font-heading text-lg flex items-center gap-2">
              {theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              Appearance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="dark-mode" className="font-medium">Dark Mode</Label>
                <p className="text-sm text-muted-foreground">
                  Enable dark theme for night studying
                </p>
              </div>
              <Switch
                id="dark-mode"
                checked={theme === 'dark'}
                onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
                data-testid="dark-mode-toggle"
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Data Management */}
      <motion.div variants={itemVariants}>
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="font-heading text-lg flex items-center gap-2">
              <Trash2 className="w-5 h-5" />
              Data Management
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                Your progress is stored locally on this device:
              </p>
              <div className="grid grid-cols-3 gap-4 p-3 bg-muted">
                <div className="text-center">
                  <p className="font-heading font-bold text-lg">{progress.completedTopics.length}</p>
                  <p className="text-xs text-muted-foreground">Topics</p>
                </div>
                <div className="text-center">
                  <p className="font-heading font-bold text-lg">{progress.totalQuizzesTaken}</p>
                  <p className="text-xs text-muted-foreground">Quizzes</p>
                </div>
                <div className="text-center">
                  <p className="font-heading font-bold text-lg">{progress.completedLessons.length}</p>
                  <p className="text-xs text-muted-foreground">Lessons</p>
                </div>
              </div>
            </div>

            <Separator />

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="w-full" data-testid="clear-progress-btn">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear All Progress
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-destructive" />
                    Clear All Progress?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. All your quiz results, completed topics, and lesson progress will be permanently deleted.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleClearProgress}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    data-testid="confirm-clear-btn"
                  >
                    Clear Everything
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>
      </motion.div>

      {/* About */}
      <motion.div variants={itemVariants}>
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="font-heading text-lg flex items-center gap-2">
              <Info className="w-5 h-5" />
              About EngiPrep PH
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">
                EngiPrep PH is your smart study companion for the Philippine Civil Engineering Licensure Examination. 
                Built to help aspiring engineers prepare effectively with interactive lessons, practice quizzes, and progress tracking.
              </p>
            </div>
            
            <Separator />

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Version</p>
                <p className="font-medium">1.0.0</p>
              </div>
              <div>
                <p className="text-muted-foreground">Target Exam</p>
                <p className="font-medium">March 2026</p>
              </div>
            </div>

            <div className="p-4 bg-muted/50 text-center">
              <p className="text-sm text-muted-foreground">
                Made with ❤️ for Filipino Engineering Students
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
