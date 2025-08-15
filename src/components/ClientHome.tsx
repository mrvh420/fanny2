'use client';

import React, { useState } from 'react';
import Preloader from './Preloader';
import Home from './Home';
import { Projekt } from '@/lib/cms';
import '../app/home.css';

interface ClientHomeProps {
  projekte: Projekt[];
}

const ClientHome: React.FC<ClientHomeProps> = ({ projekte }) => {
  const [preloaderComplete, setPreloaderComplete] = useState(false);

  const handlePreloaderComplete = () => {
    setPreloaderComplete(true);
  };

  return (
    <main>
      {!preloaderComplete ? (
        <Preloader onComplete={handlePreloaderComplete} />
      ) : (
        <Home projekte={projekte} />
      )}
    </main>
  );
};

export default ClientHome; 