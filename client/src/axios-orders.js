import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://mycinemaapp-default-rtdb.firebaseio.com/',
});

export default instance;
