import React from 'react';
import { Link } from 'react-router-dom';

const CourseList = ({ courses }) => {
  console.log('Prop courses en CourseList:', courses);

  if (!Array.isArray(courses) || courses.length === 0) {
    return <div>Loading courses...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-light text-white mb-8 text-center">Cursos Disponibles</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <Link
              key={course.id}
              to={`/courses/${course.id}`}
              className="bg-white rounded-xl shadow-xl overflow-hidden transform transition-transform hover:scale-105"
            >
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  {course.title}
                </h2>
                <p className="text-gray-600">
                  {course.description}
                </p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-sm text-indigo-600">
                    {course.exams.length} exámenes
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                    Ver detalles →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseList;
