import React, { useState, useEffect } from 'react';
import { WifiOff, Wifi } from 'lucide-react';

const OfflineStatus = () => {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!isOffline) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '100px',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: '#374151', // Dark grey
      color: 'white',
      padding: '8px 16px',
      borderRadius: '99px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      zIndex: 5000,
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      fontSize: '12px',
      fontWeight: '600',
      animation: 'fadeIn 0.3s ease-out'
    }}>
      <WifiOff size={14} />
      Working Offline (Using Cached Data)
    </div>
  );
};

export default OfflineStatus;
