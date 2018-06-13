window.navigator.userAgent = "react-native"
import SocketIOClient from 'socket.io-client';
import IP from '../secrets';

const socket = SocketIOClient(IP, {jsonp: false});

socket.on('connect', () => {
  console.log('I am now connected to the server!');
});

export default socket;
