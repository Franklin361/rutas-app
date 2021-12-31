import { AnySourceData, LngLatBounds, Map, Marker, Popup } from 'mapbox-gl';
import { useContext, useEffect, useReducer } from 'react';
import { MapContext } from './MapContext';
import { mapReducer } from './MapReducer';
import { PlacesContext } from '../places/PlacesContext';
import { direcionsApi } from '../../api/directionsApi';
import { ResponseDirections } from '../../interfaces/directionmapbosx';
import { showAlert } from '../../helpers/showAlert';

export interface MapState {
    isMapReady: boolean;
    map?: Map;
    markers: Marker[];
    distance?: number;
    duration?: number;
}

const INITIAL_STATE: MapState = {
    isMapReady: false,
    markers: []
}

export const MapProvider: React.FC = ({ children }) => {

    const [state, dispatch] = useReducer(mapReducer, INITIAL_STATE);
    const { places } = useContext(PlacesContext);


    useEffect(() => {

        state.markers.forEach(marker => marker.remove());
        const newMarkers: Marker[] = [];
        if (places) {
            for (const place of places) {
                const [lng, lat] = place.center;
                const popUp = new Popup({ closeButton: false }).setHTML(` 
            <div class="text-black text-center">
                <h5 class="text-lg">${place.place_name_es}</h5>
                <p>${place.text}</p>
            </div> `);
                const marker = new Marker({ color: '#c2367c' }).setPopup(popUp).setLngLat([lng, lat]).addTo(state.map!)

                newMarkers.push(marker)
            }

            dispatch({ type: 'setMarkers', payload: newMarkers });

            if (places.length === 0) {
                deletePolylineOfMap();
                dispatch({ type: 'resetDuration-Distance' })
            }
        }
    }, [places])

    const setMap = (map: Map) => {

        const popup = new Popup({ closeButton: false, anchor: 'left', })
            .setHTML(` 
            <div class="text-black text-center">
                <p class="text-md">Aqui es donde estoy actualmente</p>
            </div>
        `)

        new Marker({
            color: '#63df29',
            scale: 1.5
        })
            .setLngLat(map.getCenter())
            .setPopup(popup)
            .addTo(map);

        dispatch({ type: 'setMap', payload: map })
    };


    const getRouteBetweenRoutes = async (start: [number, number], end: [number, number]) => {

        const res = await direcionsApi.get<ResponseDirections>(`${start.join(',')};${end.join(',')}`);

        if (res.data.routes.length === 0) {
            showAlert({ icon: 'warning', title: 'Ruta no encontrada', text: 'No se pudo trazar una ruta al lugar que desea' });
            return;
        }

        const { distance, duration, geometry } = res.data.routes[0];

        const { coordinates } = geometry

        const bounds = new LngLatBounds(start, start);

        for (const coord of coordinates) {
            const newCors: [number, number] = [coord[0], coord[1]];
            bounds.extend(newCors);
        }

        state.map?.fitBounds(bounds, {
            padding: 200
        });

        const sourceData: AnySourceData = {
            type: 'geojson',
            data: {
                type: 'FeatureCollection',
                features: [
                    {
                        type: 'Feature',
                        properties: {},
                        geometry: {
                            type: 'LineString',
                            coordinates
                        }
                    }
                ]
            },
        };

        deletePolylineOfMap();

        state.map?.addSource('route', sourceData);
        state.map?.addLayer({
            id: 'route',
            type: 'line',
            source: 'route',
            layout: {
                'line-cap': 'round',
                'line-join': 'round'
            },
            paint: {
                'line-color': '#7a63e0',
                'line-width': 5
            }
        })

        // distancia en metros - duration en segundos
        const newDistance = +(distance / 1000).toFixed(2)
        const newDuration = +(duration / 60).toFixed(2)
        dispatch({ type: 'setDuration-Distance', payload: { distance: newDistance, duration: newDuration } });


    };

    const deletePolylineOfMap = () => {
        if (state.map?.getLayer('route')) {
            state.map?.removeLayer('route');
            state.map?.removeSource('route');
        }
    };

    return (
        <MapContext.Provider
            value={{
                ...state,
                setMap,
                getRouteBetweenRoutes
            }}
        >
            {children}
        </MapContext.Provider>
    )
}
