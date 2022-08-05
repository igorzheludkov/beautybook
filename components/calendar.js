import s from './calendar.module.css'
import { useState, useEffect, useCallback } from 'react'

export default function CheckboxHorizontal({ data, checkboxToggle, checkStatus }) {
    const categories = data

    return (
        <form className={s.wrapper}>
            {categories.map((i) => (
                <div key={i}>
                    <label htmlFor={i} className={s.container}>
                        <input type='radio' id={i} name='drone' value='huey' />
                        <span className={s.name}>{i}</span>
                        <span className={s.checkmark}></span>
                    </label>
                </div>
            ))}
        </form>
    )
}
