import React, { Component } from "react"
import PropTypes from "prop-types"
import "./ModalLauncher.scss"
import Modal from "../Modal"

class ModalLauncher extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: this.props.modalState,
    }
  }

  handleToggleModal() {
    this.setState({ showModal: !this.state.showModal })
  }

  render() {
    const {
      buttonLabel,
      children,
      classNameBtn,
      classNameContainer,
      modalState,
      handleModalState,
      isNull,
    } = this.props

    return (
      <div
        className={classNameContainer ? classNameContainer : "modal-container"}
      >
        <button
          type="button"
          className={classNameBtn ? classNameBtn : "modal-button"}
          id="modal-button"
          onClick={() => handleModalState()}
        >
          {buttonLabel}
        </button>

        {modalState && (
          <Modal onCloseRequest={() => handleModalState()} isNull={isNull}>
            {children}
          </Modal>
        )}
      </div>
    )
  }
}

ModalLauncher.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  sheet: PropTypes.object,
  classes: PropTypes.object,
}

export default ModalLauncher
