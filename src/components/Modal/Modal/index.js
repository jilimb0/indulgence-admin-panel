import React, { Component } from "react"
import PropTypes from "prop-types"
import isNil from "lodash/fp/isNil"
import "./Modal.scss"

class Modal extends Component {
  constructor(props) {
    super(props)

    this.handleKeyUp = this.handleKeyUp.bind(this)
    this.handleOutsideClick = this.handleOutsideClick.bind(this)
  }

  componentDidMount() {
    window.addEventListener("keyup", this.handleKeyUp, false)
    document.addEventListener("click", this.handleOutsideClick, false)
  }

  componentWillUnmount() {
    window.removeEventListener("keyup", this.handleKeyUp, false)
    document.removeEventListener("click", this.handleOutsideClick, false)
  }

  handleKeyUp(e) {
    const { onCloseRequest } = this.props
    const keys = {
      27: () => {
        e.preventDefault()
        onCloseRequest()
        window.removeEventListener("keyup", this.handleKeyUp, false)
      },
    }

    if (keys[e.keyCode]) {
      keys[e.keyCode]()
    }
  }

  handleOutsideClick(e) {
    const { onCloseRequest } = this.props

    if (!isNil(this.modal)) {
      if (!this.modal.contains(e.target)) {
        onCloseRequest()
        document.removeEventListener("click", this.handleOutsideClick, false)
      }
    }
  }

  render() {
    const { children, isNull } = this.props

    return (
      <div
        className={
          isNull ? "modal-overlay modal-overlay-null" : "modal-overlay"
        }
      >
        <div className="modal-simple" ref={(node) => (this.modal = node)}>
          <>{children}</>
        </div>
      </div>
    )
  }
}

Modal.propTypes = {
  onCloseRequest: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  sheet: PropTypes.object,
  classes: PropTypes.object,
}

export default Modal
