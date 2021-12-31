import { useContext, useState } from "react"
import { PlacesContext } from '../context/places/PlacesContext';
import { Feature } from '../interfaces/searchmapbox';
import { MapContext } from '../context/map/MapContext';
import { BiCar } from "react-icons/bi";
import { AiOutlineEye } from "react-icons/ai";

export const SearchResults = () => {

    const { places, isLoadingPlaces, userLocation } = useContext(PlacesContext);
    const { map, getRouteBetweenRoutes } = useContext(MapContext);

    const [active, setActive] = useState('');

    const handleClick = (place: Feature) => {
        const [lng, lat] = place.center;
        setActive(place.id)
        map?.flyTo({
            zoom: 17,
            center: [lng, lat]
        })
    };

    const getRoute = (place: Feature) => {
        if (!userLocation) return;
        const [lng, lat] = place.center;
        getRouteBetweenRoutes(userLocation, [lng, lat])
    };

    if (isLoadingPlaces) {
        return <div className="loading_result"><p>Cargando resultados...</p></div>
    }
    
    if (!places) {
        return <div className="loading_result"><p>No resultados...</p></div>
    }


    return (
        <div className={` ${places?.length !== 0 && 'container_results_places'} `}>
            {
                
                places.map(place => (
                    <div
                        key={place.id}
                        className={`container_place ${active === place.id && 'active_place'}`}
                    >
                        <p>{place.place_name}</p>
                        <div className="container_btn_route">

                            <label htmlFor="show"
                                className="btn_trazar_ruta"
                                onClick={() => handleClick(place)}
                            >
                                ver lugar
                                <AiOutlineEye className="icon_btn" />
                            </label>

                            <label htmlFor="show"
                                className="btn_trazar_ruta"
                                onClick={() => getRoute(place)}
                            >
                                Trazar ruta
                                <BiCar className="icon_btn" />
                            </label>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}
