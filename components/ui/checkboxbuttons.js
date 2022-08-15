import s from './checkboxbuttons.module.css'
import { useState, useEffect, useCallback } from 'react'

export default function CheckboxButtons({ data, handler, status }) {
  console.log(data);
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
        {/* {categories.map((i) => (
                     

                    <labelkey={data.label} className={s.container_category}>
                    
                        <input
                            name={i.label}
                            id={i.id}
                            // value={status[i.id]}
                            // checked={status[i.id]}
                            type='checkbox'
                            onChange={settingsHandler}
                        />
                        <span className={s.name_category}>{i.label}</span>
                        <span className={s.checkmark_category}></span>
                    </label>
                ))} */}
      </div>
    </div>
  )
}
