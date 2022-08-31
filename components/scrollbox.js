import s from './scrollbox.module.css'
import { useState, useEffect, useCallback } from 'react'

export default function CheckboxHorizontal({ data, checkboxToggle, checkStatus }) {
    const categories = data ?? []
    const checkStat = checkStatus ?? ''

    return (
        <div className={s.wrapper}>
            <div className={s.wrapper_category}>
                {categories.map((i) => (
                    <label key={i.spec} className={s.container_category}>
                        <input
                            data-type-index={i.index}
                            data-type-field='category'
                            name='spec'
                            id={i.spec}
                            checked={checkStat.includes(i.spec)}
                            value={i.spec}
                            type='checkbox'
                            onChange={checkboxToggle}
                        />
                        <span className={s.name_category}>{i.spec}</span>
                        <span className={s.checkmark_category}></span>
                    </label>
                ))}
            </div>
        </div>
    )
}
