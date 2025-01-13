import React from 'react'
import './globals.css';
import { Routes, Route, Outlet } from 'react-router-dom';
import { api } from './api/axiosInstance';

const App = () => {
  return (
    <main className='flex h-screen'>
        <Outlet />
    </main>
    
  )
}

export default App