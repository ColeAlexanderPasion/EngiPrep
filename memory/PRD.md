# EngiPrep PH - Product Requirements Document

## Project Overview
**Name:** EngiPrep PH  
**Type:** Educational Web Application (PWA-ready)  
**Target:** March 2026 Philippine Civil Engineering Licensure Examination

## User Personas
1. **CE Students** - Currently enrolled in civil engineering programs, preparing for board exam
2. **Fresh Graduates** - Recently graduated, reviewing for licensure examination
3. **Repeat Takers** - Previous examinees looking to pass on next attempt

## Core Requirements (Static)
- Mobile-first responsive design
- Pre-populated board-exam style content
- Local storage progress tracking (no authentication)
- Dark mode support
- Exam countdown timer

## What's Been Implemented (Feb 2, 2026)

### Phase 1: MVP Complete ✅
- **Dashboard** - Hero section, exam countdown (March 2026), quick stats, subject cards
- **Subjects Module** - 3 board exam subject areas with 14 topics total
- **Quiz System** - Practice & timed modes, MCQ questions, instant scoring, explanations
- **Progress Tracking** - Local storage for quiz results, topic completion, weak areas
- **Dark Mode** - Full light/dark theme toggle
- **Settings Page** - Theme toggle, data management, about section

### Pre-populated Content
- **Mathematics, Surveying & Transportation** - 4 topics (Engineering Math, Diff Eq, Surveying, Transportation)
- **Hydraulics & Geotechnical** - 6 topics (Eng Mech, Strength of Materials, Hydraulics, Eng Econ, Soil Mech, Foundation)
- **Structural & Construction** - 4 topics (Theory of Structures, RC Design, Steel Design, Construction Mgmt)

### Quiz Questions Available
- Engineering Mathematics: 5 questions
- Hydraulics: 5 questions
- Reinforced Concrete: 5 questions
- Theory of Structures: 5 questions
- Plus 2-3 questions each for other topics

### Lessons Available
- Engineering Mathematics: 2 lessons with formulas
- Hydraulics: 1 lesson with formulas
- Reinforced Concrete: 1 lesson with formulas
- Theory of Structures: 1 lesson with formulas

## Tech Stack
- **Frontend:** React 18, Tailwind CSS, Framer Motion
- **State:** Local Storage (no backend required)
- **UI Components:** Shadcn/UI
- **Fonts:** Chivo (headings), Public Sans (body), JetBrains Mono (code/formulas)

## Prioritized Backlog

### P0 - Critical (Next Sprint)
- [ ] Add more quiz questions per topic (target 10-15 each)
- [ ] Complete lessons for all topics
- [ ] Mobile gesture support for quiz navigation

### P1 - High Priority
- [ ] Formula cheat sheets per subject
- [ ] "Problem of the Day" feature
- [ ] Offline access (PWA service worker)
- [ ] Study planner with daily/weekly goals

### P2 - Medium Priority
- [ ] Performance analytics charts
- [ ] Share progress on social media
- [ ] Optional user accounts for cross-device sync
- [ ] Spaced repetition for weak areas

### P3 - Nice to Have
- [ ] Audio explanations for complex problems
- [ ] Community forum integration
- [ ] Achievement badges
- [ ] Leaderboards (with accounts)

## Next Actions
1. Add remaining quiz questions to reach 10+ per topic
2. Complete lesson content for all 14 topics
3. Add formula cheat sheets
4. Implement PWA for offline access
5. User testing with actual CE students
