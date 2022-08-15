import s from './togglebuttons.module.css'
import { useState, useEffect, useCallback } from 'react'

export default function ToggleButtons({ data, inputHandler, value }) {

  console.log('togglebuttons',data);
  console.log('togglebuttons',value);

  return (
  <div className={s.wrapper}>
  <form className={s.wrapper_category}>
      {data.label.map((i) => (
        <label key={i.name} className={s.container_category}>
            {console.log(i)}
              <input
                  data-type-index={data.id}
                  data-type-field='work'
                  name='work_begin'
                  id={data.id}
                  checked={i.value == value ? true : false}
                  value={i.value}
                  onChange={inputHandler}
                  type='radio'
              />
              <span className={s.name_category}>{i.name}</span>
              <span className={s.checkmark_category}></span>
          </label>
      ))}
  </form>
</div>
)
}
