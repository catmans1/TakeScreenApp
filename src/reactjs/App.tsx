import React from 'react';

import { AppRouter } from './router';
import { AuthenticationProvider } from './contexts';

function App() {
  return (
    <AuthenticationProvider>
      <AppRouter />
    </AuthenticationProvider>
  );
}

export default App;
