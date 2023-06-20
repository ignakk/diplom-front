import React from 'react';

import s from './filter.module.css';

const Filter = ({onChange, data, selected}) => {
  return (
    <select className={s.select} onChange={onChange}>{data.map((item) => (
      <option selected={item.value === selected} style={{color: '#000'}} key={item.id} value={item.value}>{item.label}</option>
    ))}</select>
  )
}

export default Filter;