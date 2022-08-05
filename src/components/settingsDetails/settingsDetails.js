import React, { Component, Fragment } from "react"
import "./settingsDetails.scss"
import Input from "../UI/Input/Input"
import InputFile from "../UI/InputFile/InputFile"

import Navigation from "../navigation/navigationContainer"
import { timeStampToDateFormat } from "../../services/utils"
import ModalLauncher from "../Modal/ModalLauncher"

import UserImg from "../UI/UserImg/UserImg"
import defaultUser from "../navigation/img/users.svg"

export default class SettingsDetails extends Component {
  componentDidMount() {
    this.props.getProfile()
  }

  constructor(props) {
    super(props)
    this.handleToggleModal = this.handleToggleModal.bind(this)
    this.handleToggleModalPass = this.handleToggleModalPass.bind(this)
    this.state = {
      showModal: false,
      showModalPass: false,
    }
  }

  handleToggleModal() {
    this.setState({ showModal: !this.state.showModal })
  }
  handleToggleModalPass() {
    this.setState({ showModalPass: !this.state.showModalPass })
  }

  render() {
    const {
      self,
      changeSelf,
      saveUser,
      setFile,
      handleInput,
      handleBlur,
      updatePass,
    } = this.props

    const renderSelf = { ...self, ...changeSelf }

    const { roles = [] } = renderSelf

    const position = roles[0]

    return (
      <Fragment>
        <Navigation />
        <div
          id={
            navigator.platform === "iPhone"
              ? "details-container-iphone"
              : "details-container-android"
          }
          className="details-container settings-details-container"
        >
          <div className="wrap-detail">
            <div className="main-block">
              <div className="wrap-details-container-header ">
                <span className="title">My Page</span>

                <div className="row-date">
                  <div className="date-value">
                    Registered {timeStampToDateFormat(renderSelf.createdAt)}
                  </div>
                </div>
              </div>

              <div className="row-info">
                <UserImg
                  isBigImg
                  imgUrl={
                    renderSelf.imageUrl ? renderSelf.imageUrl : defaultUser
                  }
                  enabled={renderSelf.enabled}
                  isSettings
                />

                <div className="row-user-name">
                  {renderSelf.firstName} {renderSelf.lastName}
                </div>

                <div className="row-position">
                  {position === "admin" ? "Administrator" : "Moderator"}
                </div>

                <div className="row-email">{renderSelf.email}</div>
              </div>

              <div className="buttons-container-settings row-edit-buttons-container block">
                <ModalLauncher
                  buttonLabel="Profile"
                  classNameBtn="settingsBtn"
                  classNameContainer="modal-edit modal-settings modal-settings-profile"
                  modalState={this.state.showModal}
                  handleModalState={this.handleToggleModal}
                >
                  <div className="main__block main__block_profile">
                    <div className="header">
                      <span>Edit your profile</span>
                    </div>

                    <div className="row-upload-img block">
                      <InputFile
                        label="Person image"
                        imgUrl={renderSelf.imageUrl}
                        setFile={setFile}
                      />
                    </div>

                    <div className="row-user-name block">
                      <div className="wrap-first-name">
                        <Input
                          name="firstName"
                          type="text"
                          placeholder="First name"
                          value={renderSelf.firstName}
                          handleInput={handleInput}
                          onBlur={handleBlur}
                          style={{ color: "black" }}
                        />
                      </div>
                      <div className="wrap-last-name">
                        <Input
                          name="lastName"
                          type="text"
                          placeholder="Last name"
                          value={renderSelf.lastName}
                          handleInput={handleInput}
                          onBlur={handleBlur}
                          style={{ color: "black" }}
                        />
                      </div>
                    </div>

                    <div className="row-email block">
                      <Input
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={renderSelf.email}
                        handleInput={handleInput}
                        onBlur={handleBlur}
                        style={{ color: "black" }}
                      />
                    </div>

                    <div className="buttons-container block">
                      <button
                        className="cancel-modal"
                        onClick={this.handleToggleModal}
                      >
                        Cancel
                      </button>

                      {saveUser && (
                        <button
                          className="save"
                          onClick={() => saveUser(renderSelf)}
                        >
                          Save
                        </button>
                      )}
                    </div>
                  </div>
                </ModalLauncher>

                <ModalLauncher
                  buttonLabel="Password"
                  classNameBtn="settingsBtn"
                  classNameContainer="modal-edit modal-settings modal-settings-pass"
                  modalState={this.state.showModalPass}
                  handleModalState={this.handleToggleModalPass}
                >
                  <div className="main__block main__block_pass">
                    <div className="header">
                      <span>Change Password</span>
                    </div>

                    <div className="row-password-old block">
                      <label className="label-inp">
                        <Input
                          name="passwordOld"
                          type="password"
                          placeholder="Current password"
                          value={renderSelf.passwordOld}
                          handleInput={handleInput}
                          onBlur={handleBlur}
                          style={{ color: "black" }}
                        />
                      </label>
                    </div>
                    <div className="row-password block">
                      <label className="label-inp">
                        <Input
                          name="password"
                          type="password"
                          placeholder="Password"
                          value={renderSelf.password}
                          handleInput={handleInput}
                          onBlur={handleBlur}
                          style={{ color: "black" }}
                        />
                      </label>
                    </div>
                    {/* <div className="row-password-replay block">
                      <label className="label-inp">
                        <Input
                          name="passwordReplay"
                          type="password"
                          placeholder="Replay password"
                          value={renderSelf.passwordReplay}
                          handleInput={handleInput}
                          onBlur={handleBlur}
                          style={{ color: "black" }}
                        />
                      </label>
                    </div> */}

                    <div className="buttons-container block">
                      <button
                        className="cancel-modal"
                        id="saveBtn"
                        onClick={this.handleToggleModalPass}
                      >
                        Cancel
                      </button>

                      {saveUser && (
                        <button
                          className="save"
                          onClick={() => {
                            updatePass(
                              renderSelf.passwordOld,
                              renderSelf.password
                            )
                          }}
                        >
                          Save
                        </button>
                      )}
                    </div>
                  </div>
                </ModalLauncher>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}
