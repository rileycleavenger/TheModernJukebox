import React from 'react';
import WebSocketListener from './components/WebSocketListener/WebSocketListener';

function DeviceConnection() {
  return (
    <div>
      <h1>This is the device connection page!</h1>
      <WebSocketListener />
    </div>
  );
}

export default DeviceConnection;