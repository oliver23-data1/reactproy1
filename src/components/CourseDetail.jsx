import React, { Component } from 'react';
import { useParams, Link, Routes, Route } from 'react-router-dom';
import ModuleContent from './ModuleContent';
import ExamSystem from './ExamSystem';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="min-h-screen bg-gradient-to-br from-red-500 to-pink-500 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="text-4xl font-light mb-4">Algo salió mal.</h1>
            <p>Por favor, inténtalo de nuevo más tarde.</p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const CourseDetail = ({ courses }) => {
  const { courseId } = useParams();

  console.log('Prop courses en CourseDetail:', courses);

  if (!Array.isArray(courses) || courses.length === 0) {
    return <div>Loading course details...</div>;
  }

  const course = courses.find(c => c.id === parseInt(courseId));

  if (!course) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h1 className="text-4xl font-light mb-4">Curso no encontrado</h1>
          <Link to="/" className="text-white underline">Volver a la lista de cursos</Link>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-xl overflow-hidden">
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-64 object-cover"
            />
            <div className="p-8">
              <h1 className="text-4xl font-light text-gray-900 mb-4">{course.title}</h1>
              <p className="text-xl text-gray-600 mb-8">{course.description}</p>

              <Routes>
                <Route path="/" element={
                  <>
                    <div className="space-y-6">
                      <h2 className="text-2xl font-semibold text-gray-900">Exámenes Disponibles</h2>
                      {course.exams.map((exam) => (
                        <Link
                          key={exam.id}
                          to={`/courses/${course.id}/exams/${exam.id}`}
                          className="block bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex justify-between items-center">
                            <h3 className="text-xl font-medium text-gray-900">{exam.title}</h3>
                            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                              Comenzar →
                            </span>
                          </div>
                          <p className="text-gray-600 mt-2">
                            Duración: {Math.floor(exam.duration / 60)} minutos
                          </p>
                        </Link>
                      ))}
                    </div>

                    <div className="space-y-6 mt-8">
                      <h2 className="text-2xl font-semibold text-gray-900">Módulos</h2>
                      {course.modules && course.modules.length > 0 ? (
                        course.modules.map((module) => (
                          <Link key={module.id} to={`/courses/${course.id}/modules/${module.id}`} className="block bg-gray-50 rounded-lg p-6">
                            <div className="flex justify-between items-center">
                              <h3 className="text-xl font-medium text-gray-900">{module.title}</h3>
                              <input type="checkbox" checked={module.completed} disabled />
                            </div>
                            <p className="text-gray-600 mt-2">
                              Contenido: {module.content}
                            </p>
                          </Link>
                        ))
                      ) : (
                        <p className="text-gray-600 mt-2">No hay módulos disponibles.</p>
                      )}
                    </div>

                    <div className="space-y-6 mt-8">
                      <h2 className="text-2xl font-semibold text-gray-900">Examen de Práctica</h2>
                      <Link
                        to={`/courses/${course.id}/exams/${course.practiceExam.id}`}
                        className="block bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex justify-between items-center">
                          <h3 className="text-xl font-medium text-gray-900">{course.practiceExam.title}</h3>
                          <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                            Comenzar →
                          </span>
                        </div>
                        <p className="text-gray-600 mt-2">
                          Duración: {Math.floor(course.practiceExam.duration / 60)} minutos
                        </p>
                      </Link>
                    </div>
                  </>
                } />
                <Route path="/modules/:moduleId" element={<ModuleContent content={course.modules.find(module => module.id === parseInt(useParams().moduleId))?.content} />} />
                <Route path="/exams/:examId" element={<ExamSystem courseId={course.id} />} />
              </Routes>

              <div className="mt-8">
                <Link
                  to="/"
                  className="inline-flex items-center text-indigo-600 hover:text-indigo-500"
                >
                  ← Volver a la lista de cursos
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default CourseDetail;
