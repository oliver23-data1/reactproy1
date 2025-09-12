import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import CourseList from './components/CourseList';
import CourseDetail from './components/CourseDetail';
import ExamSystem from './components/ExamSystem';
import ExamView from './components/ExamView';
import ModuleContent from './components/ModuleContent';

const AppRoutes = ({ courses }) => {
  console.log('Prop courses en AppRoutes:', courses);

  return (
    <Routes>
      <Route path="/" element={<CourseList courses={courses} />} />
      <Route path="/courses/:courseId" element={<CourseDetail courses={courses} />} />
      <Route path="/courses/:courseId/exams/:examId" element={<ExamSystem courses={courses} />} />
      <Route path="/courses/:courseId/exams/:examId/view" element={<ExamView />} />
      <Route path="/courses/:courseId/modules/:moduleId" element={<ModuleContent courses={courses} />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
