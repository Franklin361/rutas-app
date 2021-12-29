// import { autocomplete } from '@algolia/autocomplete-js';
import { ChangeEvent, useContext, useEffect, useRef, useState } from 'react';
import { BiSearchAlt } from 'react-icons/bi';
import { PlacesContext } from '../context/places/PlacesContext';
import { SearchResults } from './SearchResults';

export const InputSearch = () => {
    const { searchPlacesByTerm, places } = useContext(PlacesContext)
    const [showInput, setShowInput] = useState(false);
    const input = useRef<HTMLInputElement>(null);

    const debounceRef = useRef<number>();

    useEffect(() => {
        if (showInput && input.current) input.current.focus();
    }, [showInput])

    const onQueryChanged = (e: ChangeEvent<HTMLInputElement>) => {

        if (debounceRef.current) clearTimeout(debounceRef.current);

        debounceRef.current = setTimeout(() => {
            searchPlacesByTerm(e.target.value)
        }, 1000);

    };



    return (
        <>
            <input
                ref={input}
                className={`h-10 fixed z-10 right-20 top-5 outline-none bg-white transition-all rounded-l-full text-lg  ${showInput ? 'w-96  pl-3 duration-500' : 'w-0 duration-300'}`}
                type="text"
                placeholder='Search Place'
                onChange={onQueryChanged}
            />

            <BiSearchAlt
                onClick={() => setShowInput(!showInput)}
                className={`h-10 bg-white fixed z-10 right-10 top-5 w-10 p-2 cursor-pointer ${showInput ? 'rounded-r-full' : 'rounded-full duration-500 delay-200'}`}
            />

            <div className={`fixed z-10 right-16 top-16 w-96 bg-gray-500 transition-all duration-200 text-white rounded ${showInput ? 'opacity-100 h-80 p-3 overflow-y-scroll' : 'opacity-0 h-0 overflow-hidden'}`}>
                <SearchResults />

            </div>

        </>

    )
}
