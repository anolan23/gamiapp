import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default axios.create({
  baseURL,
  withCredentials: true,
});
