import s from './radiobuttons.module.css'
import { useState, useEffect, useCallback } from 'react'

export default function CheckboxButtons({ data, inputHandler, value }) {


  return (
    <div className={s.wrapper}>
    <form className={s.wrapper_category}>
        {data.label.map((i) => (
            <label key={i} className={s.container_category}>
                <input
                    data-type-index={data.id}
                    data-type-field='work'
                    name='work_begin'
                    id={data.id}
                    checked={value == i ? true : false}
                    value={i}
                    type='radio'
                    onChange={inputHandler}
                />
                <span className={s.name_category}>{i}</span>
                <span className={s.checkmark_category}></span>
            </label>
        ))}
    </form>
</div>
  )
}
