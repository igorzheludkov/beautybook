import s from './checkboxbuttons.module.css'
import { useState, useEffect, useCallback } from 'react'

export default function CheckboxButtons({ data, handler, status }) {
  return (
    <div className={s.wrapper}>
      <div className={s.wrapper_category}>
        {Object.values(data).map((data) => (
          <label key={data.label} className={s.container_category}>
            <input
              name={data.label}
              id={data.id}
              // value={status[i.id]}
              checked={data.checked}
              type='checkbox'
              onChange={handler}
            />
            <span className={s.name_category}>{data.label}</span>
            <span className={s.checkmark_category}></span>
          </label>
        ))}
      </div>
    </div>
  )
}
export function CheckboxPublicButtons({ data, handler, boxType }) {
  return (
    <div className={s.wrapper}>
      <div className={s.wrapper_category}>
        {/* <form> */}
          {data.map((i) => (
            <label key={i.id} className={s.container_category}>
              <input
                name={i.url}
                id={i.type}
                value={i.id}
                // checked={i.checked}
                type={boxType}
                onChange={handler}
              />
              <span className={s.name_category}>{i.short_name}</span>
              <span className={s.checkmark_category}></span>
            </label>
          ))}
        {/* </form> */}
      </div>
    </div>
  )
}
