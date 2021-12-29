import { createContext } from "react";
import { Feature } from '../../interfaces/searchmapbox';

interface PlaceContextProps {
    isLoading: boolean,
    isLoadingPlaces: boolean,
    userLocation?: [ number, number ],
    places: Feature[]
    searchPlacesByTerm: (query: string) => Promise<Feature[]>;
}

export const PlacesContext = createContext<PlaceContextProps>({} as PlaceContextProps);