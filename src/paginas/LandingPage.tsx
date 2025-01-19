import React from 'react';
import { Link } from 'react-router-dom';
import { ThemeProvider, useTheme } from './temasContext';

const ThemeToggleButton: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme}
      className="nav-button">
      {theme === 'light' ? 'Alto Contraste' : 'Modo Claro'}
    </button>
  );
};

const LandingPage = () => {
    return (
        <ThemeProvider>
        <div className="landing-page">
            {/* Left Side (Image Placeholder) */}
            <div className="left-side">
                {/* You can replace this red background with an image later */}
            </div>

            {/* Right Side (Login Form) */}
            <div className="right-side">
                <h1 className="app-name">ViverJuntos</h1>

                {/* Login Form */}
                <div className="login-form">
                    <input 
                        type="text" 
                        className="input-field" 
                        placeholder="Usuário" 
                    />
                    <input 
                        type="password" 
                        className="input-field" 
                        placeholder="Senha" 
                    />

                    <div className="button-container">
                    <Link to='/home' className='login-btn'>Login</Link>
                        <button className="signup-btn">Sign Up</button>
                        <ThemeToggleButton />
                    </div>
                </div>
            </div>
        </div>
        </ThemeProvider>
    );
};

export default LandingPage;
