import Link from 'next/link'

export default function Title({ children, size, url }) {
  const style = {
    margin: 0,
    paddingBottom: 8,
    textTransform: 'uppercase',
    fontSize: 18
  }
  return <Link href={`/category/${url}`}><a><h2 style={style}>{children}</h2></a></Link>
}
