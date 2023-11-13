import React from 'react';
import MessageOutputComponent from './components/MessageOutputComponent/MessageOutputComponent';
import MessageInputComponent from './components/MessageInputComponent/MessageInputComponent';

function DeviceConnection() {
  return (
    <div>
      <MessageOutputComponent />
      <MessageInputComponent />
    </div>
  );
}

export default DeviceConnection;