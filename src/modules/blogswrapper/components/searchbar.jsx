import React from 'react'
import { useState } from 'react'

import s from './searchbar.module.css';


export const Searchbar = ({onChange, value = null, className = '', label = null, controlled}) => {
    const [inputValue, setInputValue] = useState(value);

    const changeHandler = (e) => {
        const val = e.target.value;

        if(typeof value !== 'null') {
            onChange(val);
        } else {
            onChange(val);
            setInputValue(val)
        }
    }
    
  return (
    <>
        {label && (
            <label htmlFor='search-input'>
                {label}
            </label>
        )}
        <input id="search-input" className={s.input} value={controlled ? value : inputValue} onChange={changeHandler} type={"search"} placeholder="Поиск по статьям" />
    </>
  );
}