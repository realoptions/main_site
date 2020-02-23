import React, { useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap'
import { connect } from 'react-redux'
import AsyncLoad from './AsyncLoad'
import { getCurrentMonth } from '../services/dateHandlers'
import Loading from './Loading'
import PropTypes from 'prop-types'
import { convertUsage } from '../services/usagePlan'
import { copyToClipboard } from '../services/copyToClipboard'
const mapStateToProps = ({ clientInformation: { token } }) => ({
  token
})

export const ApiModal = ({ style, token }) => {
  const [isOpen, toggleOpen] = useState(false)
  const [copyText, setCopied] = useState('Copy to clipboard')
  const toggle = () => {
    toggleOpen(!isOpen)
  }
  const copyKey = () => {
    copyToClipboard(token)
    setCopied('Copied!')
  }
  return [
    token ? (
      <Button onClick={toggle} key="button" style={style}>
        View API Key
      </Button>
    ) : null,
    <Modal key="modal" isOpen={isOpen} toggle={toggle}>
      <ModalHeader>API Key</ModalHeader>
      <ModalBody>
        {token}
        <br />
        <Button onClick={copyKey}>{copyText}</Button>
      </ModalBody>
    </Modal>
  ]
}
ApiModal.propTypes = {
  style: PropTypes.object,
  token: PropTypes.string
}
export default connect(mapStateToProps)(ApiModal)
