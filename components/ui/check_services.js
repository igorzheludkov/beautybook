import s from './check_services.module.css'
import { useState, useEffect, useCallback } from 'react'

export default function CheckServices({ data, checkboxToggle, checkStatus = '' }) {

  const [categories, setCategories] = useState(data ?? [])

  return (
    <div>
      <div>
        {categories.map((e) => (
          <>
            <label>
              <input type='checkbox' value={e.id} onClick={checkboxToggle} checked={checkStatus.includes(e.id)} />
              {e.main_name}
            </label>
            <div className={s.wrapper}>
              <div className={s.wrapper_category}>
                {e.serv_types.map((i) => (
                  <label key={i.id} className={s.container_category}>
                    <input
                      data-type-index={i.id}
                      data-type-field='category'
                      data-type-mainCategory={e.id}
                      name='spec'
                      id={i.id}
                      checked={checkStatus.includes(i.id)}
                      value={i.id}
                      type='checkbox'
                      onChange={checkboxToggle}
                    />
                    <span className={s.name_category}>{i.short_name}</span>
                    <span className={s.checkmark_category}></span>
                  </label>
                ))}
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  )
}
