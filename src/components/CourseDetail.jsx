import React from 'react';
import { useParams, Link } from 'react-router-dom';

const CourseDetail = ({ courses }) => {
  const { courseId } = useParams();
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
  );
};

export default CourseDetail;