import s from './scrollbox.module.css'
import { useState, useEffect, useCallback } from 'react'

export default function CheckboxHorizontal({ data, checkboxToggle, checkStatus }) {
    const categories = data

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
                            checked={checkStatus?.includes(i.spec)}
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

        // <div className={s.wrapper}>
        //     <div className={s.container}>
        //         {categories.map((i) => (
        //             <div key={i.spec} className={s.checkButton}>
        //                 <span className={s.category}>{i.spec}</span>
        //                 <input
        //                     style={{ width: `${i.spec.length * 10}px` }}
        //                     className={s.input}
        //                     name='spec'
        //                     id={i.spec}
        //                     checked={checkStatus?.includes(i.spec)}
        //                     value={i.spec}
        //                     type='checkbox'
        //                     onChange={checkboxToggle}
        //                 />
        //             </div>
        //         ))}
        //     </div>
        // </div>
    )
}
