import { InputSearch } from '../components/InputSearch';
import { MapView } from '../components/MapView';
import { BtnMyLocation } from '../components/BtnMyLocation';

export const HomePage = () => {
    return (
        <>
            <InputSearch/>
            <MapView/>
            <BtnMyLocation/>
        </>
    )
}
