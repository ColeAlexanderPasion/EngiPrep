import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import { HeaderNav, MobileNav } from "./components/Navigation";
import Dashboard from "./pages/Dashboard";
import Subjects from "./pages/Subjects";
import Topic from "./pages/Topic";
import Quiz from "./pages/Quiz";
import ProgressPage from "./pages/Progress";
import Settings from "./pages/Settings";

function AppContent() {
  return (
    <div className="min-h-screen bg-background">
      <HeaderNav />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-safe">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/subjects" element={<Subjects />} />
          <Route path="/subjects/:subjectId" element={<Subjects />} />
          <Route path="/topic/:topicId" element={<Topic />} />
          <Route path="/quiz/:topicId" element={<Quiz />} />
          <Route path="/progress" element={<ProgressPage />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>
      <MobileNav />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="engiprep-theme">
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
