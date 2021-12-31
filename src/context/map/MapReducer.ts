import { Map, Marker } from "mapbox-gl"
import { MapState } from "./MapProvider"

type ActionTypes = 
{ type:'setMap', payload: Map } |
{ type:'setMarkers', payload: Marker[] } |
{ type:'setDuration-Distance', payload: { duration:number, distance:number } } |
{ type:'resetDuration-Distance'} 

export const mapReducer = (state:MapState, action:ActionTypes):MapState => {

    switch (action.type) {
        case 'setMap':
            return {
                ...state,
                isMapReady: true,
                map: action.payload
            }
        case 'setMarkers':
            return {
                ...state,
                markers: action.payload
            }
        case 'setDuration-Distance':
            return {
                ...state,
                distance: action.payload.distance,
                duration: action.payload.duration,
            }
    
        case 'resetDuration-Distance':
            return {
                ...state,
                distance: undefined,
                duration: undefined,
            }
    
        default: return state
    }
}
