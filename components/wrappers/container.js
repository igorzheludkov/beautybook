export default function Container({ width, maxWidth, display, children }) {
  const style = {
    width: width ?? 'inherit',
    display: display ?? 'block',
    flexWrap: 'wrap',
    maxWidth: maxWidth,
    
  }
  return <div style={style}>{children}</div>
}
