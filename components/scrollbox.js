import s from '../styles/scrollbox.module.css'
import { useState, useEffect, useCallback } from 'react'

export default function CheckboxHorizontal({ data, checkboxToggle, checkStatus }) {
  const categories = data

  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        {categories.map((i) => (
          <div key={i.spec} className={s.checkButton}>
            <span className={s.category}>{i.spec}</span>
            <input
              style={{ width: `${i.spec.length * 10}px` }}
              className={s.input}
              name='position'
              id={i.spec}
              checked={checkStatus.includes(i.spec)}
              value={i.spec}
              type='checkbox'
              onChange={checkboxToggle}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
