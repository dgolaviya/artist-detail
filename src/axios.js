import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://ws.audioscrobbler.com/2.0'
});

export default instance;
