import React from 'react';

import s from './filter.module.css';

const Filter = ({onChange, data}) => {
  return (
    <select className={s.select} onChange={onChange}>{data.map((item) => (
      <option style={{color: '#000'}} key={item.id} value={item.value}>{item.label}</option>
    ))}</select>
  )
}

export default Filter;