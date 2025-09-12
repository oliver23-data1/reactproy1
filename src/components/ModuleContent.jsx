import React from 'react';
import { useParams } from 'react-router-dom';

const ModuleContent = ({ courses, content }) => {
  const { courseId, moduleId } = useParams();

  if (!Array.isArray(courses) || courses.length === 0) {
    return <div>Loading module content...</div>;
  }

  const course = courses.find(c => c.id === parseInt(courseId));
  const module = course?.modules.find(m => m.id === parseInt(moduleId));

  if (!module) {
    return <div>Module not found.</div>;
  }

  const pdfUrl = `/public/${content}`;

  return (
    <div className="p-4 border rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-2">Contenido del Módulo</h3>
      <p>Aquí debería ir la previsualización del PDF o un enlace para descargarlo.</p>
      <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
        Descargar PDF: {content}
      </a>
    </div>
  );
};

export default ModuleContent;
