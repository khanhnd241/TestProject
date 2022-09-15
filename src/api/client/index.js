import axios from 'axios';

export const client = axios.create({
  baseURL: 'ttps://random-data-api.com/api/',
  timeout: 1000,
});
