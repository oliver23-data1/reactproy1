import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CourseList from './components/CourseList';
import CourseDetail from './components/CourseDetail';
import ExamSystem from './components/ExamSystem';
import { courses } from './data/mockData';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CourseList courses={courses} />} />
        <Route path="/courses/:courseId" element={<CourseDetail courses={courses} />} />
        <Route path="/courses/:courseId/exams/:examId" element={<ExamSystem courses={courses} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
