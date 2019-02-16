import React, { useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap'
import { connect } from 'react-redux'
import AsyncLoad from './AsyncLoad'
import { getUsage } from '../services/apiMiddleware'
import { getCurrentMonth } from '../services/dateHandlers'
import Loading from './Loading'
import PropTypes from 'prop-types'
import { convertUsage } from '../services/usagePlan'
const mapStateToProps = ({
  clientInformation: { email, provider, token },
  usagePlan,
  apiKey
}) => ({
  email,
  provider,
  token,
  usagePlan,
  apiKey
})

export const ApiModal = ({
  style,
  email,
  provider,
  token,
  apiKey,
  usagePlan
}) => {
  const [isOpen, toggleOpen] = useState(false)
  const [usage, setUsage] = useState('')
  return [
    email && usagePlan && apiKey ? (
      <Button onClick={() => toggleOpen(!isOpen)} key="button" style={style}>
        View API Key
      </Button>
    ) : null,
    <Modal key="modal" isOpen={isOpen} toggle={() => toggleOpen(!isOpen)}>
      <ModalHeader>API Key</ModalHeader>
      <ModalBody>
        {apiKey}
        <AsyncLoad
          requiredObject={usage}
          onLoad={() =>
            getUsage({
              email,
              usagePlanId: usagePlan.id,
              provider,
              token,
              ...getCurrentMonth()
            }).then(data => {
              setUsage(
                `Used ${convertUsage(data.items)} out of ${
                  usagePlan.quota.limit
                } per ${usagePlan.quota.period.toLowerCase()}.`
              )
            })
          }
          loading={Loading}
          render={() => (
            <>
              <br />
              <span>{usage}</span>
            </>
          )}
        />
      </ModalBody>
    </Modal>
  ]
}
ApiModal.propTypes = {
  style: PropTypes.object,
  email: PropTypes.string,
  apiKey: PropTypes.string,
  usagePlan: PropTypes.shape({
    id: PropTypes.string.isRequired,
    quota: PropTypes.shape({
      limit: PropTypes.number.isRequired,
      period: PropTypes.string.isRequired
    }).isRequired
  })
}
export default connect(mapStateToProps)(ApiModal)
