import s from '../styles/check.module.css'
import { useState, useEffect, useCallback } from 'react'

export default function CheckboxHorizontal({ data, checkboxToggle, checkStatus }) {

  const categories = data

  return (
    <div>
      {categories.map((i) => (
        <label key={i.spec} htmlFor={i.spec}>
          <input className={s.input} name='position' id={i.spec} checked={checkStatus.includes(i.spec)} value={i.spec} type='checkbox' onChange={checkboxToggle} />
          <span className={s.checkmark}></span>
          {i.spec}
        </label>
      ))}
    </div>
  )
}
