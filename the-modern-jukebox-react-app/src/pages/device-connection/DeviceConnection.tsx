import React from 'react';
import WebSocketComponent from './components/WebSocketComponent/WebSocketComponent';
import WebSocketListener from './components/WebSocketListener/WebSocketListener';

function DeviceConnection() {
  return (
    <div>
      <h1>This is the device connection page!</h1>
      <WebSocketComponent />
      <WebSocketListener />
    </div>
  );
}

export default DeviceConnection;