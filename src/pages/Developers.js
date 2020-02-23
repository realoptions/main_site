import React from 'react'
import { Row, Col, Container } from 'reactstrap'
import SwaggerUI from 'swagger-ui-react'
import 'swagger-ui-react/swagger-ui.css'

const paddingTop = { paddingTop: 20 }
export default () => (
  <Container key="container">
    <Row>
      <Col style={paddingTop}>
        <SwaggerUI
          url={`https://cdn.jsdelivr.net/gh/realoptions/option_price_faas@${process
            .env.REACT_APP_TAG || 'v67'}/docs/openapi_v2.yml`} //change this to openapi_v2.yml
        />
      </Col>
    </Row>
  </Container>
)
