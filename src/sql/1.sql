CREATE TABLE Courses (
    Id INT PRIMARY KEY,
    Title NVARCHAR(100),
    Description NVARCHAR(255),
    Image NVARCHAR(255)
);

CREATE TABLE Exams (
    Id INT PRIMARY KEY,
    CourseId INT NULL FOREIGN KEY REFERENCES Courses(Id), -- Cada curso puede tener un examen
    ModuleId INT UNIQUE NULL FOREIGN KEY REFERENCES Modules(Id), -- Cada módulo tiene un examen
    Title NVARCHAR(100),
    Duration INT -- en segundos
);

CREATE TABLE Questions (
    Id INT PRIMARY KEY,
    ExamId INT FOREIGN KEY REFERENCES Exams(Id),
    Question NVARCHAR(255),
    CorrectAnswer NVARCHAR(100),
    Explanation NVARCHAR(255),
    Score DECIMAL(5,2) -- Puntuación asignada a la pregunta
);

CREATE TABLE Options (
    Id INT PRIMARY KEY IDENTITY(1,1),
    QuestionId INT FOREIGN KEY REFERENCES Questions(Id),
    OptionText NVARCHAR(100)
);

CREATE TABLE Modules (
    Id INT PRIMARY KEY IDENTITY(1,1),
    CourseId INT FOREIGN KEY REFERENCES Courses(Id),
    Title NVARCHAR(100),
    Content NVARCHAR(MAX), -- Contenido del módulo
    Completed BIT DEFAULT 0 -- Estado de finalización
);

CREATE TABLE ExamResults (
    Id INT PRIMARY KEY IDENTITY(1,1),
    ExamId INT FOREIGN KEY REFERENCES Exams(Id),
    StudentId INT, -- ID del estudiante (si se maneja un sistema de usuarios)
    Score DECIMAL(5,2), -- Nota obtenida
    DateTaken DATETIME DEFAULT GETDATE() -- Fecha en que se tomó el examen
);

-- 🔗 Relaciones
-- Un curso puede tener varios módulos (Courses → Modules)
-- Cada módulo tiene un examen (Modules → Exams)
-- Un curso puede tener un examen (Courses → Exams)
-- Un examen puede tener varias preguntas (Exams → Questions)
-- Cada pregunta puede tener varias opciones (Questions → Options)
-- Los resultados de los exámenes se almacenan en ExamResults
