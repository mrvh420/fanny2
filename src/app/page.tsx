'use client';

import React, { useState } from 'react';
import Preloader from '@/components/Preloader';
import Home from '@/components/Home';
import './preloader.css';
import './home.css';

export default function HomePage() {
  const [preloaderComplete, setPreloaderComplete] = useState(false);

  const handlePreloaderComplete = () => {
    setPreloaderComplete(true);
  };

  return (
    <main>
      {!preloaderComplete ? (
        <Preloader onComplete={handlePreloaderComplete} />
      ) : (
        <Home />
      )}
    </main>
  );
}
