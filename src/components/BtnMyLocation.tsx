import { useContext } from "react";
import { AiOutlineRightCircle, AiOutlineEnvironment } from "react-icons/ai";
import { MapContext } from '../context/map/MapContext';
import { PlacesContext } from '../context/places/PlacesContext';
export const BtnMyLocation = () => {

    const { isMapReady, map } = useContext(MapContext)
    const { userLocation } = useContext(PlacesContext)
    
    const handleClick = () => (isMapReady && userLocation && map) && map.flyTo({center: userLocation, zoom: 17 })

    return (
        <button 
            className="fixed z-50 bottom-10 left-20 bg-indigo-500 p-3 rounded-full text-white font-bold flex gap-2 items-center transition-colors shadow-lg shadow-indigo-500/40 hover:bg-indigo-600 active:bg-indigo-500 group"
            onClick={handleClick}
        >
            <div onClick={(e)=>e.stopPropagation()} className="bg-gray-900 font-light p-2 z-50 text-white absolute -right-32 top-auto rounded opacity-0 transition-opacity duration-300 text-sm group-hover:opacity-100">
                <span>Ir a mi ubicación</span>
                <div className="bg-gray-900 w-5 h-5 -z-10 -left-1 top-1/4 transform rotate-45 absolute"></div>
            </div>

            <AiOutlineEnvironment className="text-2xl"/>
        </button>
    )
}
