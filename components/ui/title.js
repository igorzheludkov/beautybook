export default function Title({ children, size }) {
  const style = {
    margin: 0,
    paddingBottom: 8,
    textTransform: 'uppercase',
    fontSize: 18
  }
  return <h2 style={style}>{children}</h2>
}
