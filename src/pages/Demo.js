import React from 'react'
import { Jumbotron, Container, Row, Col } from 'reactstrap'

const paddingTop = { paddingTop: 20 }
const flex = {
  display: 'flex',
  justifyContent: 'center'
}
const style = {
  width: 360,
  height: 740
}
const jumboStyle = {
  height: '100em'
}
export default () => [
  <Jumbotron
    fluid
    key="container"
    className="mid-background no-margin no-padding"
  >
    <Container>
      <Row>
        <Col style={paddingTop} />
      </Row>
    </Container>
  </Jumbotron>,
  <Jumbotron
    fluid
    className="no-margin mid-background"
    style={jumboStyle}
    key="demo"
  >
    <div style={flex}>
      <embed src="https://demo.finside.org" style={style} />
    </div>
  </Jumbotron>
]
