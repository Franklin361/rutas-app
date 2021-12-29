import axios from 'axios';

export const token = import.meta.env.VITE_TOKEN_MAPBOX as string;

export const searchApi = axios.create({
    baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places',
    params:{
        limit: 10,
        language: 'es',
        access_token: token 
    }
})
