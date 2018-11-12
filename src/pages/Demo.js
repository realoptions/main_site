import React from 'react'
import { Jumbotron, Container, Row, Col } from 'reactstrap'
import ApiModal from '../components/ApiModal'

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
const modalStyle = { float: 'left' }
export default () => [
  <Jumbotron
    fluid
    key="container"
    className="mid-background no-margin no-padding"
  >
    <Container>
      <Row>
        <Col style={paddingTop}>
          <ApiModal style={modalStyle} />
        </Col>
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
      <embed src="https://realoptions.github.io/demo-api-app" style={style} />
    </div>
  </Jumbotron>
]
