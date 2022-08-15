// import s from './checkboxbuttons.module.css'
import { useState, useEffect, useCallback } from 'react'
import s from './input.module.css'
import Image from 'next/image'

export default function Input({ data, inputHandler, value, state }) {
  return (
    <div>
      <form className={s.input_wrapper}>
        {data.label.map((i) => (
          <div className={s.input_container} key={i}>
            {data.icon && <Image src={data.icon} width={20} height={20} alt='social profile' />}
            <span className={s.input_item}>
              <input
                className={s.input_text}
                data-type-index={data.id}
                data-type-field='work'
                name='work_begin'
                id={data.id}
                checked={value == i ? true : false}
                value={state[data.id]}
                type={data.tp}
                onChange={inputHandler}
                placeholder={data.label}
              />
            </span>
          </div>
        ))}
      </form>
    </div>
  )
}
