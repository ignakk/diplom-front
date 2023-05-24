import React from 'react';

import s from './filter.module.css';

const Filter = ({onChange, data}) => {
  return (
    <select className={s.select} onChange={onChange}>{data.map((item) => (
      <option key={item.id} value={item.value}>{item.label}</option>
    ))}</select>
  )
}

export default Filter;