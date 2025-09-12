import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes';
import { useState, useEffect } from 'react';

function App() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await fetch('http://localhost:3001/courses');
        const data = await response.json();
        console.log('Datos obtenidos:', data);
        setCourses(data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    }
    fetchCourses();
  }, []);

  return (
    <Router>
      <AppRoutes courses={courses} />
    </Router>
  );
}

export default App;
