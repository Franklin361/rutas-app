import { useContext, useState } from "react"
import { PlacesContext } from '../context/places/PlacesContext';
import { Feature } from '../interfaces/searchmapbox';
import { MapContext } from '../context/map/MapContext';

export const SearchResults = () => {

    const { places, isLoadingPlaces, userLocation } = useContext(PlacesContext);
    const { map, getRouteBetweenRoutes } = useContext(MapContext);

    const [active, setActive] = useState('');

    const handleClick = (place:Feature) => {
        const [lng, lat] = place.center;
        setActive(place.id)
        map?.flyTo({
            zoom: 17,
            center: [lng, lat]
        })
    };

    const getRoute = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>,place:Feature) => {
        e.stopPropagation();
        if(!userLocation) return;
        const [lng, lat] = place.center;
        getRouteBetweenRoutes(userLocation, [lng, lat])     
    };

    return (
        <>
            {
                isLoadingPlaces
                    ? <p>Cargando resultados...</p>
                    :  places.map(place => (
                        <div 
                            key={place.id} 
                            className={`my-2 ${active === place.id && 'bg-yellow-400'}`}
                            onClick={()=>handleClick(place)}
                        >
                            <p>{place.place_name}</p>
                            <button 
                                className="rounded bg-indigo-500 text-white p-1 px-5"
                                onClick={(e)=>getRoute(e,place)}
                            >Trazar ruta</button>
                        </div>
                    ))
            }
        </>
    )
}
