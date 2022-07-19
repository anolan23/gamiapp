import axios from 'axios';

const baseURL =
  process.env.NODE_ENV !== 'development'
    ? 'enter heroku'
    : 'http://localhost:8080';

export default axios.create({
  baseURL,
  withCredentials: true,
  credentials: 'include',
});
