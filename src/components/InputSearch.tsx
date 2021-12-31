// import { autocomplete } from '@algolia/autocomplete-js';
import { ChangeEvent, useContext, useEffect, useRef, useState } from 'react';
import { BiSearchAlt } from 'react-icons/bi';
import { PlacesContext } from '../context/places/PlacesContext';
import { SearchResults } from './SearchResults';

export const InputSearch = () => {
    const { searchPlacesByTerm, places } = useContext(PlacesContext)


    const debounceRef = useRef<number>();


    const onQueryChanged = (e: ChangeEvent<HTMLInputElement>) => {

        if (debounceRef.current) clearTimeout(debounceRef.current);

        debounceRef.current = setTimeout(() => {
            searchPlacesByTerm(e.target.value)
        }, 1000);

    };



    return (
        <div>
            <input type="checkbox" id="show" defaultChecked={true} />

            <div className='container_input-search'>
                <input
                    className={`text_input`}
                    type="text"
                    placeholder='Search Place'
                    onChange={onQueryChanged}
                />

                <label htmlFor="show">
                    <BiSearchAlt
                        className={`icon`}
                    />
                </label>
            </div>


            <SearchResults />

        </div>
    )
}
