export const courses = [
  {
    id: 1,
    title: 'Matemáticas Avanzadas',
    description: 'Curso de matemáticas de nivel superior',
    image: 'https://placehold.co/600x400/2563eb/ffffff?text=Matemáticas',
    exams: [
      {
        id: 101,
        title: 'Examen Parcial 1',
        duration: 1800, // 30 minutes in seconds
        questions: [
          {
            id: 1001,
            question: '¿Cuál es la derivada de x²?',
            options: ['2x', 'x', 'x³', '1'],
            correctAnswer: '2x',
            explanation: 'La derivada de x² es 2x según la regla de potencias.'
          },
          // More questions...
        ]
      },
      // More exams...
    ]
  },
  {
    id: 2,
    title: 'Física Cuántica',
    description: 'Introducción a la física cuántica',
    image: 'https://placehold.co/600x400/dc2626/ffffff?text=Física',
    exams: [
      {
        id: 201,
        title: 'Conceptos Básicos',
        duration: 1800,
        questions: [
          {
            id: 2001,
            question: '¿Qué es el principio de incertidumbre de Heisenberg?',
            options: [
              'No se puede medir simultáneamente la posición y el momento con precisión arbitraria',
              'Las partículas siempre tienen una posición definida',
              'La energía se conserva siempre',
              'La velocidad de la luz es constante'
            ],
            correctAnswer: 'No se puede medir simultáneamente la posición y el momento con precisión arbitraria',
            explanation: 'El principio establece un límite fundamental en la precisión con la que se pueden medir ciertas parejas de magnitudes físicas.'
          },
          // More questions...
        ]
      }
    ]
  },
  {
    id: 3,
    title: 'Programación en Python',
    description: 'Curso básico de programación con Python',
    image: 'https://placehold.co/600x400/16a34a/ffffff?text=Python',
    exams: [
      {
        id: 301,
        title: 'Fundamentos de Python',
        duration: 1800,
        questions: [
          {
            id: 3001,
            question: '¿Qué es una lista en Python?',
            options: [
              'Una colección ordenada y mutable de elementos',
              'Un número entero',
              'Una función',
              'Un tipo de dato inmutable'
            ],
            correctAnswer: 'Una colección ordenada y mutable de elementos',
            explanation: 'Las listas en Python son estructuras de datos que pueden contener múltiples elementos de diferentes tipos.'
          }
        ]
      }
    ]
  }
];