import React from 'react'
const flex = {
  display: 'flex',
  justifyContent: 'center',
  height: '100em'
}
const style = {
  width: 360,
  height: 740,
}
/*const jumboStyle = {
  height: '100em',
}*/

export default () => (
  <div style={flex}>
    <embed src="https://demo.finside.org" style={style} />
  </div>
)
