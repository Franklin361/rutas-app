import { useEffect, useReducer } from 'react';
import { PlacesContext } from './PlacesContext';
import { placesReducer } from './PlacesReducer';
import { getUserLocation } from '../../helpers/getLoaction';
import { searchApi } from '../../api/searchApi';
import { ResponseSearchPlace, Feature } from '../../interfaces/searchmapbox';


export interface PlaceState {
    isLoading: boolean,
    isLoadingPlaces: boolean,
    userLocation?: [ number, number ],
    places: Feature[] | null
}

const INITIAL_STATE: PlaceState = {
    isLoading: true,
    isLoadingPlaces: false,
    places: []
}

export const PlacesProvider: React.FC = ({children}) => {

    const [state, dispatch] = useReducer(placesReducer,INITIAL_STATE);

    useEffect(() => {
        getUserLocation().then( lnglat => dispatch({ type: 'setUserLocation', payload:lnglat})).catch(e => {
            dispatch({type:'setLoading'})
        })
    }, []);

    const searchPlacesByTerm = async(query:string) => {
        if(query.length === 0 ) {
            dispatch({type: 'setPlaces', payload: []})
            return [];
        }
        if(!state.userLocation) throw new Error("Error de ubi");
        
        dispatch({ type: 'setLoadingPlaces' })

        const res = await searchApi.get<ResponseSearchPlace>(`/${query}.json`,{
            params: {
                proximiy: state.userLocation.join(',')
            }
        })

        dispatch({ type: 'setPlaces', payload: (res.data.features.length === 0) ? null : res.data.features  });
    };

    return (
        <PlacesContext.Provider 
            value={{
                ...state,
                searchPlacesByTerm
            }}
        >
            { children }
        </PlacesContext.Provider>
    )
}
