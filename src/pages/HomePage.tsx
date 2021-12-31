import { InputSearch } from '../components/InputSearch';
import { MapView } from '../components/MapView';
import { BtnMyLocation } from '../components/BtnMyLocation';
import { PlacesContext } from '../context/places/PlacesContext';
import { useContext } from 'react';
import { Loading } from '../components/Loading';
import { ErrorAlert } from '../components/ErrorAlert';

export const HomePage = () => {
    const { isLoading,userLocation } = useContext(PlacesContext);

    if (isLoading) {
        return <Loading />
    }

    if(!userLocation){
        return <ErrorAlert/>
    }

    return (
        <>
            <InputSearch/>
            <MapView/>
            <BtnMyLocation/>
        </>
    )
}
