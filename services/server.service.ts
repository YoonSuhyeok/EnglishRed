import axios, { AxiosInstance } from 'axios';

export default class AxiosService {
    static readonly instance: AxiosInstance = axios.create({
        baseURL: 'http://localhost:50000',
        headers: {
            'Access-Control-Allow-Origin': 'http://localhost:50000',
            'Content-Type': 'application/json'
        },
        timeout: 100000,
    });
}