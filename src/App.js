import './App.scss';
import React, { useContext, useEffect, useState } from 'react';
import { useRoutes } from 'react-router-dom';
import MainRoutes from './sitemap/main-routes';
import StateProvider, { store } from './context/StateProvider';
import ProfileService from './services/ProfileService';
import NavBar from './components/layout/nav-bar/NavBar';
function App() {
  const routes = useRoutes(MainRoutes)

  return (
    <div className="App">
      <StateProvider>
        <NavBar />
        <div className='bg-dark'>
          {routes}
        </div>
      </StateProvider>
    </div>
  );
}

export default App;
