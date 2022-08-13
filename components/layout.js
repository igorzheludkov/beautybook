import styles from './layout.module.css'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from './navbar'

export default function Layout({ children }) {
  return (
    
      <div className={styles.container}>
        <Navbar />
        <div className='padding-top'></div>
        <div>{children}</div>
      </div>
  
  )
}
