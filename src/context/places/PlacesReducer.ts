import { PlaceState } from './PlacesProvider';
import { Feature } from '../../interfaces/searchmapbox';

type ActionTypes =
    { type: 'setUserLocation', payload: [number, number] } |
    { type: 'setLoadingPlaces' } |
    { type: 'setPlaces', payload: Feature[] }


export const placesReducer = (state: PlaceState, action: ActionTypes): PlaceState => {

    switch (action.type) {
        case 'setUserLocation':
            return {
                ...state,
                isLoading: false,
                userLocation: action.payload
            }
        case 'setLoadingPlaces':
            return {
                ...state,
                isLoadingPlaces: true
            }
        case 'setPlaces':
            return {
                ...state,
                isLoadingPlaces: false,
                places: action.payload
            }

        default: return state
    }
};