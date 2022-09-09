export default function Wrapper({ maxWidth, children }) {
  const style = {
    display: 'flex',
    flexWrap: 'wrap',
    margin: '20px 0',
    padding: '5px',
    maxWidth: maxWidth,
  }
  return <div style={ style }>{children}</div>
}
