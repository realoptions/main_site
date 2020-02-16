import React from 'react'
import { Row, Col, Container } from 'reactstrap'
import SwaggerUI from 'swagger-ui-react'
import 'swagger-ui-react/swagger-ui.css'
import ApiModal from '../components/ApiModal'

const paddingTop = { paddingTop: 20 }
const style = { float: 'left' }
export default () => (
  <Container key="container">
    <Row>
      <Col style={paddingTop}>
        <ApiModal style={style} />
        <SwaggerUI
          url={`https://cdn.jsdelivr.net/gh/realoptions/option_price_faas@${process
            .env.REACT_APP_TAG || 'v26'}/docs/openapi_merged.yml`}
        />
      </Col>
    </Row>
  </Container>
)
