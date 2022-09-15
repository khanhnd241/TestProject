import react from 'react';
import axios from 'axios';
import {client} from '../client';
const getListUsers = () => {
  const URL = ' https://random-data-api.com/api/users/random_user?size=10 ';
  return axios.get(URL);
};
export default {getListUsers};
