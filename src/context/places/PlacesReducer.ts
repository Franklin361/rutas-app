import { PlaceState } from './PlacesProvider';
import { Feature } from '../../interfaces/searchmapbox';

type ActionTypes =
    { type: 'setUserLocation', payload: [number, number] } |
    { type: 'setLoadingPlaces' } |
    { type: 'setLoading' } |
    { type: 'setPlaces', payload: Feature[] | null }


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
        case 'setLoading':
            return {
                ...state,
                isLoading: false
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