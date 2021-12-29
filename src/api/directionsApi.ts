import axios from 'axios';

export const token = import.meta.env.VITE_TOKEN_MAPBOX as string;

export const direcionsApi = axios.create({
    baseURL: 'https://api.mapbox.com/directions/v5/mapbox/driving',
    params:{
        access_token: token,
        alternatives: true,
        geometries:'geojson',
        overview:'simplified',
        steps: false
    }
})
