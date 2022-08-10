import Link from 'next/link'
import dash from '../styles/dash.module.css'
import { signIn, signOut, useSession } from 'next-auth/react'

export default function DashNav() {
    return (
        <div>
            <>
                <div>
                    <button className={dash.nav_button}>
                        <Link href='/user'>Профіль клієнта</Link>
                    </button>
                    <button className={dash.nav_button}>
                        <Link href='/master'>Профіль майстра</Link>
                    </button>
                    <button className={dash.nav_button}>
                        <Link href='/api/auth/signout'>
                            <a
                                onClick={(e) => {
                                    e.preventDefault()
                                    signOut()
                                }}
                            >
                                Вийти
                            </a>
                        </Link>
                    </button>
                </div>
            </>
        </div>
    )
}
