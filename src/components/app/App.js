import React, { useState } from 'react';
import './App.css';
import EntryPoint from '../entrypoint/EntryPoint.jsx'
import UserOnQueue from '../useronqueue/UserOnQueue.jsx'

function App() {
  const [userId, setUserId] = useState(0)

  const [userInitialQueuePosition, setUserInitialQueuePosition] = useState(0)

  function handleUserIdChange(userInfo) {
    setUserId(userInfo.id)
    setUserInitialQueuePosition(userInfo.position)
  }

  return (
    <div className="App">
      <p id="entrypoint-component">Entry-Point Component:</p>
      <EntryPoint
        onUserIdChange={handleUserIdChange}
      />
      <p id="useronqueue-component">User-On-Queue Component:</p>
      <UserOnQueue
        userId={userId}
        userInitialQueuePosition={userInitialQueuePosition}
      />
    </div>
  );
}

export default App;
