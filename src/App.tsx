import React, { useEffect, useState } from 'react';
import './App.css';
import Home from './home';
import { getContact } from './services/contact.service';

function App(): JSX.Element {
  const [initializedContact, setInitializedContact] = useState<boolean>(false);
  useEffect(() => {
    if (!initializedContact) {
      getContact('1' ,'2');
      setInitializedContact(true);
    }
  });

  return (
    <div>
      <Home></Home>
    </div>
  );
}

export default App;
