import React, { useState } from 'react';
import './App.css';
import EntryPoint from '../entrypoint/EntryPoint.jsx'
import UserOnQueue from '../useronqueue/UserOnQueue.jsx'

function App() {
  const [userId, setUserId] = useState('')

  const [userInitialQueuePosition, setUserInitialQueuePosition] = useState(0)

  function handleUserIdChange(userInfo) {
    setUserId(userInfo.id)
    setUserInitialQueuePosition(userInfo.position)
  }

  return (
    <div className="App">
      <EntryPoint
        onUserIdChange={handleUserIdChange}
      />
      <UserOnQueue
        userId={userId}
        userInitialQueuePosition={userInitialQueuePosition}
        onUserIdChange={handleUserIdChange}
      />
    </div>
  );
}

export default App;
