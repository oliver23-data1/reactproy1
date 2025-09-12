import React, { useState, useEffect } from 'react';
import { ClockIcon } from '@heroicons/react/24/outline';

const ExamView = ({ exam, onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState(exam.duration);
  const [timerState, setTimerState] = useState('normal');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});

  // Timer logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        const newTime = prevTime - 1;
        
        if (newTime <= 0) {
          clearInterval(timer);
          handleExamComplete();
          return 0;
        }
        
        if (newTime <= exam.duration * 0.166) { // Last 1/6 of time
          setTimerState('danger');
        } else if (newTime <= exam.duration * 0.333) { // Last 1/3 of time
          setTimerState('warning');
        }

        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [exam.duration]);

  // Format time for display
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
    
    const progress = (Object.keys(answers).length + 1) * (100 / exam.questions.length);
    setProgress(Math.min(progress, 100));
  };

  const handleExamComplete = () => {
    const results = {
      answers,
      timeSpent: exam.duration - timeLeft,
      completionPercentage: progress
    };
    onComplete(results);
  };

  const currentQ = exam.questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl min-h-[700px] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-400 to-cyan-400 text-white p-8 text-center">
          <h1 className="text-4xl font-light mb-3">{exam.title}</h1>
          <p className="text-lg opacity-90">Pregunta {currentQuestion + 1} de {exam.questions.length}</p>
        </div>

        {/* Progress Bar */}
        <div className="bg-gray-50 px-8 py-6 border-b border-gray-200">
          <div className="relative h-2.5 bg-gray-200 rounded-full overflow-hidden mb-2.5">
            <div 
              className="absolute h-full bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Progreso</span>
            <span>{Math.round(progress)}% Completado</span>
          </div>

          {/* Timer */}
          <div className={`flex items-center gap-2.5 text-xl font-semibold mt-4 ${
            timerState === 'warning' ? 'text-yellow-500' :
            timerState === 'danger' ? 'text-red-500 animate-pulse' :
            'text-red-600'
          }`}>
            <ClockIcon className="h-6 w-6" />
            <span>{formatTime(timeLeft)}</span>
          </div>
        </div>

        {/* Question content */}
        <div className="p-8">
          <div className="space-y-6">
            <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {currentQ.question}
              </h3>
              <div className="space-y-3">
                {currentQ.options.map((option, index) => (
                  <label
                    key={index}
                    className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <input
                      type="radio"
                      name={`question-${currentQ.id}`}
                      value={option}
                      checked={answers[currentQ.id] === option}
                      onChange={() => handleAnswerSelect(currentQ.id, option)}
                      className="h-4 w-4 text-blue-500 focus:ring-blue-400"
                    />
                    <span className="text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
                disabled={currentQuestion === 0}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Anterior
              </button>
              
              {currentQuestion < exam.questions.length - 1 ? (
                <button
                  onClick={() => setCurrentQuestion(prev => prev + 1)}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
                >
                  Siguiente
                </button>
              ) : (
                <button
                  onClick={handleExamComplete}
                  className="px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-600"
                >
                  Finalizar Examen
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamView;