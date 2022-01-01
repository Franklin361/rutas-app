// import { autocomplete } from '@algolia/autocomplete-js';
import { ChangeEvent, useContext, useEffect, useRef, useState } from 'react';
import { BiSearchAlt } from 'react-icons/bi';
import { PlacesContext } from '../context/places/PlacesContext';
import { SearchResults } from './SearchResults';

export const InputSearch = () => {
    const { searchPlacesByTerm } = useContext(PlacesContext);

    const input = useRef<HTMLInputElement>(null);
    const [check, setCheck] = useState(false)

    const debounceRef = useRef<number>();


    const onQueryChanged = (e: ChangeEvent<HTMLInputElement>) => {

        if (debounceRef.current) clearTimeout(debounceRef.current);

        debounceRef.current = setTimeout(() => {
            searchPlacesByTerm(e.target.value)
        }, 1000);

    };

    useEffect(() => {
        
        (check) && input.current?.focus()

    }, [check])

    return (
        <div>
            <input type="checkbox" id="show" defaultChecked={true} onChange={()=> setCheck(!check)} />

            <div className='container_input-search'>
                <input
                    ref={input}
                    className={`text_input`}
                    type="text"
                    placeholder='Search for a place'
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
