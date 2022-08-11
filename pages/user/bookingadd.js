import { getSession } from 'next-auth/react'


export async function getServerSideProps(context) {
    const session = await getSession(context)
    if (!session) {
        context.res.writeHead(302, { Location: '/login' })
        context.res.end()
        return {}
    }

    return {
        props: {
            user: session.user,
        },
    }
}


export default function BookingAdd({user}) {

    console.log(user);
}