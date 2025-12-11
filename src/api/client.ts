import axios from 'axios';

// Default to Android emulator host. Override with API_BASE_URL env var if needed.
const DEFAULT_BASE = 'http://10.0.2.2:5000/api';

const client = axios.create({
  baseURL: process.env.API_BASE_URL || DEFAULT_BASE,
  timeout: 10000,
});

export default client;