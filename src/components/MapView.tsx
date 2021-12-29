import { useContext, useLayoutEffect, useRef } from "react";
import { Map } from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
import { PlacesContext } from '../context/places/PlacesContext';
import { MapContext } from '../context/map/MapContext';
import { token } from '../api/searchApi';

const styleMap = {
    street: 'mapbox://styles/mapbox/streets-v11',
    outdoors: 'mapbox://styles/mapbox/outdoors-v11',
    light: 'mapbox://styles/mapbox/light-v10',
    dark: 'mapbox://styles/mapbox/dark-v10',
    satellite: 'mapbox://styles/mapbox/satellite-v9',
    satellite_streets: 'mapbox://styles/mapbox/satellite-streets-v11',
    navigation_day:'mapbox://styles/mapbox/navigation-day-v1',
    navigation_night:'mapbox://styles/mapbox/navigation-night-v1'

}



export const MapView = () => {
    const { userLocation, isLoading } = useContext(PlacesContext);
    const { setMap } = useContext(MapContext)
    const mapDiv = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {

        if(mapDiv.current){
            const map = new Map({
                container: mapDiv.current!,
                style: styleMap.dark,
                center: userLocation,
                zoom: 15,
                accessToken: token
            });
            
            setMap(map)
        }

    }, [ isLoading ]);

    if(isLoading){
        return <h1>cargando...</h1>
    }

    return (
        <div
            ref={mapDiv}
            className="w-screen h-screen bg-gray-800 text-white fixed top-0 left-0"
        >

        </div>
    )
}
