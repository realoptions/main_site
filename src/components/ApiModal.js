import React from 'react'
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap'
import { connect } from 'react-redux'
import { toggleOpen } from '../actions/modal'
import AsyncLoad from './AsyncLoad'
import { showApiKey } from '../services/api-catalog'
import Loading from './Loading'
import PropTypes from 'prop-types'
import { updateApiKey, apiError, noApiError } from '../actions/signIn'
const mapStateToProps = ({
  modal: { isOpen },
  auth: { apiKey, isSignedIn }
  //client
}) => ({
  isOpen,
  apiKey,
  //client,
  isSignedIn
})
const mapDispatchToProps = dispatch => ({
  toggleOpen: toggleOpen(dispatch),
  onLoad: () =>
    showApiKey()
      .then(updateApiKey(dispatch))
      .then(noApiError(dispatch))
      .catch(apiError(dispatch))
})
export const ApiModal = ({
  style,
  isOpen,
  toggleOpen,
  apiKey,
  client,
  onLoad,
  isSignedIn
}) => [
  isSignedIn ? (
    <Button onClick={toggleOpen} key="button" style={style}>
      View API Key
    </Button>
  ) : null,
  <Modal key="modal" isOpen={isOpen} toggle={toggleOpen}>
    <ModalHeader>API Key</ModalHeader>
    <AsyncLoad
      requiredObject={apiKey}
      onLoad={() => onLoad(client)}
      loading={Loading}
      render={() => <ModalBody>{apiKey}</ModalBody>}
    />
  </Modal>
]
ApiModal.propTypes = {
  style: PropTypes.object,
  isOpen: PropTypes.bool.isRequired,
  toggleOpen: PropTypes.func.isRequired,
  apiKey: PropTypes.string,
  //client: PropTypes.object,
  onLoad: PropTypes.func.isRequired,
  isSignedIn: PropTypes.bool
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApiModal)
