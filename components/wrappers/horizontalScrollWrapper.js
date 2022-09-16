import s from './horizontalScrollWrapper.module.css'

export function HScrollWrapper({ children }) {
    return (
      <div className={s.wrapper}>
        {children}
        {/* <div className={s.wrapper_category}>
          
        </div> */}
      </div>
    )
  }
  