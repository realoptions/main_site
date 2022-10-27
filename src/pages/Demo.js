import React from 'react'
import Jumbotron from '../components/Jumbtron'
const flex = {
  display: 'flex',
  justifyContent: 'center',
}
const style = {
  width: 360,
  height: 740,
}
const jumboStyle = {
  height: '100em',
}

export default () => (
  <Jumbotron key="demo" className="no-margin mid-background" style={jumboStyle}>
    <div style={flex}>
      <embed src="https://demo.finside.org" style={style} />
    </div>
  </Jumbotron>
)
