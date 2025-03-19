import React, { useState } from 'react';

const EnvDebug: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  const envVars = {
    VITE_VALID_USERNAME: import.meta.env.VITE_VALID_USERNAME || 'not set',
    VITE_VALID_PASSWORD: import.meta.env.VITE_VALID_PASSWORD ? '***' : 'not set',
    VITE_API_KEY: import.meta.env.VITE_API_KEY ? '***' : 'not set',
    DEV: import.meta.env.DEV,
    MODE: import.meta.env.MODE,
    PROD: import.meta.env.PROD,
    SSR: import.meta.env.SSR
  };
  
  if (!import.meta.env.DEV) {
    return null; // Only show in development mode
  }
  
  return (
    <div className="fixed bottom-4 right-4 z-50">      
      {isVisible && (
        <div className="mt-2 p-3 bg-gray-800 text-white rounded-md shadow-lg max-w-md text-xs">
          <h3 className="font-bold mb-2">Environment Variables</h3>
          <pre className="whitespace-pre-wrap overflow-auto max-h-60">
            {JSON.stringify(envVars, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default EnvDebug;
