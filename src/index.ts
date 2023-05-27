import axios from 'axios';

const url = 'http://localhost:3000/users';
const data = { name: 'test', age: '20' };

axios.post(url, data);
