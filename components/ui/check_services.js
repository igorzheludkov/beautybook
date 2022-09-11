import s from './check_services.module.css'
import { useState, useEffect, useCallback } from 'react'

export default function CheckServices({ data, checkboxToggle, checkStatus }) {
    const checkStat = checkStatus ?? ''

    const [categories, setCategories] = useState(data ?? [])



    return (
        <div>
          <div></div>
          <div className={s.wrapper}>
            <div className={s.wrapper_category}>
                {categories.map((i) => (
                    <label key={i.id} className={s.container_category}>
                        <input
                            data-type-index={i.id}
                            data-type-field='category'
                            name='spec'
                            id={i.id}
                            checked={checkStat.includes(i.id)}
                            value={i.id}
                            type='checkbox'
                            onChange={checkboxToggle}
                        />
                        <span className={s.name_category}>{i.main_name}</span>
                        <span className={s.checkmark_category}></span>
                    </label>
                ))}
            </div>
        </div>
        </div>
    )
}
