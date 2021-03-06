import { useContext } from "react";
import { AiOutlineEnvironment } from "react-icons/ai";
import { MapContext } from '../context/map/MapContext';
import { PlacesContext } from '../context/places/PlacesContext';
export const BtnMyLocation = () => {

    const { isMapReady, map } = useContext(MapContext)
    const { userLocation } = useContext(PlacesContext)

    const handleClick = () => (isMapReady && userLocation && map) && map.flyTo({ center: userLocation, zoom: 17 })

    return (
        <button
            className="btn_my_location"
            onClick={handleClick}
        >

            <span>My location</span>

            <AiOutlineEnvironment className="icon" />
        </button>
    )
}
