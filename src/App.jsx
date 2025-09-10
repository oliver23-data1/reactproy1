import React, { useState, useEffect } from 'react';
import './App.css';
import './directorio.css';

function App() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [dependencia, setDependencia] = useState('');
  const [totalTrabajadores, setTotalTrabajadores] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.example.com/directory'); // Replace with actual API endpoint
        const result = await response.json();
        setData(result);
        setTotalTrabajadores(result.length); // Assuming the API returns an array of employees
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDependenciaChange = (event) => {
    setDependencia(event.target.value);
  };

  const filteredData = data.filter(item => {
    // Implement your filtering logic here based on searchTerm and dependencia
    // This is a placeholder, replace with your actual filtering logic
    return (
      item.nombreCompleto.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (dependencia === '' || item.dependencia === dependencia)
    );
  });

  return (
    <div className="main-content">
      {/* Header Top */}
      <div className="header-top">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <i className="fas fa-phone mr-2"></i> Central:
              <span className="mx-3">|</span>
              <i className="fas fa-envelope mr-2"></i>
            </div>
            <div className="col-md-6 text-md-right">
              <a href="#" className="text-white mr-3"><i className="fab fa-facebook"></i></a>
              <a href="#" className="text-white mr-3"><i className="fab fa-twitter"></i></a>
              <a href="#" className="text-white"><i className="fab fa-youtube"></i></a>
            </div>
          </div>
        </div>
      </div>

      {/* Header Main */}
      <header className="header-main">
        <div className="container">
          <div className="header-flex" style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px'}}>
            <div className="logo-container-left">
              <a href="directorio.html" target="_blank" rel="noopener noreferrer">
                <img src="/img/logo_horizontal.png" alt="UNAMAD" className="logo" />
              </a>
            </div>
            <div className="logo-container-right" style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
              <a href="https://www.gob.pe/institucion/unamad/funcionarios" target="_blank" rel="noopener noreferrer" className="logo-link-gob">
                <img src="/img/logogob.svg" alt="Logo Secundario" className="logo d-none d-md-block" />
                <img src="/img/logomobil.svg" alt="Logo Secundario" className="logo d-block d-md-none logo-gob-mobile" />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content text-center">
            <h2>Directorio Telefónico Institucional</h2>
            <p>Encuentra la información de contacto del personal universitario</p>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <div className="container" style={{ paddingBottom: '60px' }}>
        <div className="search-card">
          <div className="search-title">
            <h3>Buscar Personal por Dependencia</h3>
            <p>Escriba el nombre de la dependencia o seleccione de la lista</p>
          </div>

          <div className="select-wrapper">
            <label htmlFor="dependencia">Dependencia:</label>
            <select id="dependencia" className="custom-select" onChange={handleDependenciaChange}>
              {/* Select2 se encargará del placeholder */}
            </select>
          </div>

          <button className="btn-mostrar">
            <i className="fas fa-search"></i>
            Mostrar Directorio
          </button>
        </div>

        {/* Results Section con Tabla */}
        <div className="results-section" id="resultsSection">
          <div className="results-card">
            {/* Header con estadísticas */}
            <div className="results-header">
              <h4 id="nombreDependencia"></h4>
              <div className="results-stats">
                <div className="stat-item">
                  <div className="stat-icon">
                    <i className="fas fa-users"></i>
                  </div>
                  <div className="stat-text">
                    <div className="detail-label">Total de personal</div>
                    <div className="detail-value" id="totalTrabajadores">{totalTrabajadores} trabajadores</div>
                  </div>
                </div>
                <div className="stat-item">
                  <div className="stat-icon">
                    <i className="fas fa-building"></i>
                  </div>
                  <div className="stat-text">
                    <div className="detail-label">Tipo</div>
                    <div className="detail-value">Dependencia Institucional</div>
                  </div>
                </div>
                <div className="stat-item">
                  <div className="stat-icon">
                    <i className="fas fa-calendar"></i>
                  </div>
                  <div className="stat-text">
                    <div className="detail-label">Actualizado</div>
                    <div className="detail-value">09/09/2025</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Barra de búsqueda */}
            <div className="search-bar-container">
              <input
                type="text"
                id="buscarTrabajador"
                className="form-control"
                placeholder="🔍 Buscar por nombre, cargo, teléfono o correo..."
                onChange={handleSearch}
              />
            </div>

            {/* Tabla de trabajadores */}
            <div className="table-container">
              <table className="professional-table" id="tablaTrabajadores">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nombre Completo</th>
                    <th>Cargo</th>
                    <th>Teléfono</th>
                    <th>Correo Electrónico</th>
                  </tr>
                </thead>
                <tbody id="tbodyTrabajadores">
                  {filteredData.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.nombreCompleto}</td>
                      <td>{item.cargo}</td>
                      <td>{item.telefono}</td>
                      <td>{item.correoElectronico}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer>
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="footer-content">
                <h5>UNAMAD</h5>
                <p>Av. Jorge Chávez N° 1160</p>
                <p>Puerto Maldonado - Madre de Dios</p>
                <p>Central: </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="footer-content">
                <h5>Enlaces de Interés</h5>
                <p><a href="#" className="text-white">Portal Institucional</a></p>
                <p><a href="#" className="text-white">Transparencia</a></p>
                <p><a href="#" className="text-white">Mesa de Partes Virtual</a></p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="footer-content">
                <h5>Horario de Atención</h5>
                <p>Lunes a Viernes</p>
                <p>8:00 am - 1:00 pm</p>
                <p>2:00 pm - 5:00 pm</p>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 Universidad Nacional Amazónica de Madre de Dios - Todos los derechos reservados</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
