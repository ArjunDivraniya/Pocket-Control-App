import axios from 'axios';

// For Android Emulator use 'http://10.0.2.2:5000/api'
// For Physical Device use 'http://YOUR_LOCAL_IP:5000/api'
const client = axios.create({
  baseURL: 'http://42.105.168.130/32/api', 
});

export default client;