import Image from 'next/image'

export default function Avatar({ w, h, src }) {
    let styles = {
        width: w,
        height: h,
        borderRadius: '50%',
    }

    return (
        <div style={styles}>
            <Image style={styles} layout='responsive' objectFit='cover' width={w} height={h} src={src ? src : '/images/userplaceholder.png'} alt='avatar' />
        </div>
    )
}
