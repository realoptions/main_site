import React, { Component } from 'react'
import '../styles/swaggerOverrides.css'
import 'swagger-ui/dist/swagger-ui.css'

import SwaggerUI from 'swagger-ui'
export default class SwaggerTest extends Component {
  componentDidMount() {
    SwaggerUI({
      dom_id: '#swaggerContainer',
      url: `https://cdn.jsdelivr.net/gh/realoptions/option_price_faas@${process
        .env.REACT_APP_TAG || 'v26'}/docs/openapi_merged.yml`
    })
  }
  render() {
    return <div id="swaggerContainer" />
  }
}
