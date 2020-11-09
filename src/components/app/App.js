import React, { useState } from 'react';
import './App.css';
import EntryPoint from '../entrypoint/EntryPoint.jsx'
import UserOnQueue from '../useronqueue/UserOnQueue.jsx'

function App() {
  const [userId, setUserId] = useState('')

  function handleUserIdChange(id) {
    setUserId(id)
  }

  return (
    <div className="App">
      <EntryPoint
        userId={userId}
        onUserIdChange={handleUserIdChange}
      />
      <UserOnQueue
        userId={userId}
        onUserIdChange={handleUserIdChange}
      />
    </div>
  );
}

export default App;
