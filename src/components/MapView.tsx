import { useContext, useLayoutEffect, useRef } from "react";
import { Map } from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
import { PlacesContext } from '../context/places/PlacesContext';
import { MapContext } from '../context/map/MapContext';
import { token } from '../api/searchApi';
import { Loading } from './Loading';

import profile from "../assets/face.png";

const styleMap = {
    street: 'mapbox://styles/mapbox/streets-v11',
    outdoors: 'mapbox://styles/mapbox/outdoors-v11',
    light: 'mapbox://styles/mapbox/light-v10',
    dark: 'mapbox://styles/mapbox/dark-v10',
    satellite: 'mapbox://styles/mapbox/satellite-v9',
    satellite_streets: 'mapbox://styles/mapbox/satellite-streets-v11',
    navigation_day: 'mapbox://styles/mapbox/navigation-day-v1',
    navigation_night: 'mapbox://styles/mapbox/navigation-night-v1'

}



export const MapView = () => {
    const { userLocation, isLoading } = useContext(PlacesContext);
    const { setMap, distance, duration } = useContext(MapContext)
    const mapDiv = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {

        if (mapDiv.current) {
            const map = new Map({
                container: mapDiv.current!,
                style: styleMap.dark,
                center: userLocation,
                zoom: 15,
                accessToken: token
            });

            setMap(map)
        }

    }, [isLoading]);

    
    
    

    return (
        <>
            <div
                ref={mapDiv}
                className="container_map"
            />
            {
                (distance && duration)
                && <div className="container_data_directions">
                    <p>Distancia: <b>{distance} km.</b></p>
                    <p>Duración: <b>{duration} min.</b></p>
                </div>
            }

            <div className="container_profile">
                <img src={profile} alt="Franklin Martinez Lucas" />
                <span>Created by Franklin Martinez</span>
            </div>
        </>
    )
}
