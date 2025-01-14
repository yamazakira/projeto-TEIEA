import React from 'react';
import './globals.css';
import { Link, Outlet } from 'react-router-dom';

const App = () => {
  return (
    <div className="app-container">
      <div className="sidebar-left">
        <Link to='/' className='nav-button'>Home</Link>
        <button className="nav-button">Perfil</button>
        <button className="nav-button">Configurações</button>
      </div>
      <main className="feed-container">
        <div className="app-header">
          <h1 className="app-title">Rede social linda cheirosa</h1>
          <div className="divider"></div>
        </div>
        <Outlet />
      </main>
      <div className="sidebar-right">
        <input type="text" className="search-bar" placeholder="Search..." />
        <Link to='/createpost' className='nav-button'>Postar</Link>
      </div>
    </div>
  );
}

export default App;
