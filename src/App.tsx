import React from 'react';
import './globals.css';
import { Link, Outlet } from 'react-router-dom';
import { ThemeProvider } from './paginas/temasContext';
import { useTheme } from './paginas/temasContext';

const ThemeToggleButton: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme}
      className="nav-button">
      {theme === 'light' ? 'Alto Contraste' : 'Modo Claro'}
    </button>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <div className="app-container">
        <div div className="sidebar-left" >
          <Link to='/' className='nav-button'>Home</Link>
          <button className="nav-button">Perfil</button>
          <button className="nav-button">Configurações</button>
          
        </div>
        <main className="feed-container">
          <div className="app-header">
            <h1 className="app-title">Rede social linda cheirosa</h1>
          </div>
          <Outlet />
        </main>
        <div className="sidebar-right">
          <input type="text" className="search-bar" placeholder="Search..." />
          <Link to='/createpost' className='nav-button'>Postar</Link>
          <ThemeToggleButton />
        </div>
      </div >
    </ThemeProvider >
  );
}

export default App;
