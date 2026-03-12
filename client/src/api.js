import axios from "axios";

// diambil dari docs axios-http.com
const customAPI = axios.create({ 
  baseURL: '/api/v1',
});

export default customAPI