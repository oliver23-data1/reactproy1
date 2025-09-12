import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ExamView from './ExamView';

const ExamSystem = ({ courses }) => {
  const { courseId, examId } = useParams();

  if (!Array.isArray(courses) || courses.length === 0) {
    return <div>Loading exam...</div>;
  }

  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes in seconds
  const [timerState, setTimerState] = useState('normal');

  // Timer logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        const newTime = prevTime - 1;
        
        // Update timer state based on remaining time
        if (newTime <= 300) { // Last 5 minutes
          setTimerState('danger');
        } else if (newTime <= 600) { // Last 10 minutes
          setTimerState('warning');
        }

        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format time for display
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const course = courses.find(c => c.id === parseInt(courseId));
  const exam = course?.exams.find(e => e.id === parseInt(examId));

  console.log('courseId:', courseId);
  console.log('examId:', examId);
  console.log('course:', course);
  console.log('exam:', exam);

  if (!course || !exam) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
        <h1 className="text-white text-3xl">Examen no encontrado</h1>
      </div>
    );
  }

  return (
    <ExamView
      exam={exam}
      progress={progress}
      setProgress={setProgress}
      timeLeft={timeLeft}
      formatTime={formatTime}
    />
  );
};

export default ExamSystem;
