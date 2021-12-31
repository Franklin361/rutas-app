import { Map } from "mapbox-gl";
import { createContext } from "react";

interface MapContextProps {
    isMapReady: boolean;
    map?:Map;
    distance?: number;
    duration?:number;
    setMap: (map:Map)=>void;
    getRouteBetweenRoutes: (start: [number, number], end: [number, number]) => Promise<void>;
}

export const MapContext = createContext<MapContextProps>({} as MapContextProps);

