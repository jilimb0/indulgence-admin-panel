import React from "react"
import "./mainAdmin.scss"
import Input from "../UI/Input/Input"
import InputFile from "../UI/InputFile/InputFile"
import SelectCustom from "../UI/SelectCustom/SelectCustom"
import { userTimeStampToDateFormat } from "../../services/utils"
import ModalLauncher from "../Modal/ModalLauncher"
import UserImg from "../UI/UserImg/UserImg"
import defaultUser from "../navigation/img/users.svg"
import backArrow from "./img/back.png"

class MainAdmin extends React.Component {
  constructor(props) {
    super(props)
    this.handleToggleModal = this.handleToggleModal.bind(this)
    this.state = {
      showModal: this.props.user.id === null ? true : false,
    }
  }

  handleToggleModal() {
    this.setState({ showModal: !this.state.showModal })
  }

  render() {
    const {
      user = {},
      userChanges,
      userErrors,
      adminHandleInput,
      adminHandleBlur,
      adminHandleSelect,
      adminSetFile,
      deleteAdmin,
      submit,
      blockUser,
      unBlockUser,
      back,
    } = this.props

    const renderUser = { ...user, ...userChanges }

    // let Password = {
    //   _pattern: /[a-zA-Z0-9_]/,

    //   _getRandomByte: function () {
    //     if (window.crypto && window.crypto.getRandomValues) {
    //       var result = new Uint8Array(1)
    //       window.crypto.getRandomValues(result)
    //       return result[0]
    //     } else if (window.msCrypto && window.msCrypto.getRandomValues) {
    //       result = new Uint8Array(1)
    //       window.msCrypto.getRandomValues(result)
    //       return result[0]
    //     } else {
    //       return Math.floor(Math.random() * 256)
    //     }
    //   },

    //   generate: function (length) {
    //     return Array.apply(null, { length: length })
    //       .map(function () {
    //         var result
    //         while (true) {
    //           result = String.fromCharCode(this._getRandomByte())
    //           if (this._pattern.test(result)) {
    //             return result
    //           }
    //         }
    //       }, this)
    //       .join("")
    //   },
    // }

    return (
      <div
        id={
          navigator.platform === "iPhone"
            ? "details-container-iphone"
            : "details-container-android"
        }
        className={
          user.id === null
            ? "main-admin-container-disabled"
            : "main-admin-container details-container"
        }
      >
        <div className="wrap-detail">
          <div className="main-block">
            <button className="cancel" onClick={() => back()}>
              <img src={backArrow} alt="" />
              <span>Back</span>
            </button>
            <div
              // className="main-admin-container-header details-container-header wrap-details-container-header"
              className="wrap-details-container-header"
            >
              <span className="title">Person</span>
              <div className="row-date subtitle-header">
                <div className="date-value">
                  Registered {userTimeStampToDateFormat(renderUser.createdAt)}
                </div>
              </div>
            </div>

            <div className="row-info">
              <UserImg
                isBigImg
                imgUrl={renderUser.imageUrl ? renderUser.imageUrl : defaultUser}
                enabled={renderUser.enabled}
              />
              <div className="row-user-name">
                {renderUser.firstName} {renderUser.lastName}
              </div>

              <div className="row-position">
                {renderUser.roles[0] === "admin"
                  ? "Administrator"
                  : "Moderator"}
              </div>

              <div className="row-email">{renderUser.email}</div>
            </div>

            <button
              className={
                renderUser.enabled
                  ? "status status-blocked"
                  : "status status-active"
              }
              onClick={() => {
                renderUser.enabled === true
                  ? blockUser(user.id)
                  : unBlockUser(user.id)
              }}
            >
              {renderUser.enabled ? "Block account" : "Activate account"}
            </button>
          </div>
        </div>
        <ModalLauncher
          buttonLabel={user.id === null ? "" : "Edit"}
          classNameBtn={user.id === null ? "item-plus-new" : "edit"}
          classNameContainer="modal-edit modal-edit-admin"
          modalState={this.state.showModal}
          handleModalState={this.handleToggleModal}
          isNull={user.id === null ? true : false}
        >
          <div className="main__block">
            <div className="row-edit-header block">
              <span>
                {user.id === null ? "Create profile" : "Edit profile"}
              </span>
            </div>

            <div className="row-edit-upload-img block">
              <InputFile
                label="Person image"
                imgUrl={renderUser.imageUrl}
                setFile={adminSetFile}
              />
            </div>

            <div className="row-edit-user-name block">
              <div className="wrap-first-name">
                <Input
                  name="firstName"
                  type="text"
                  placeholder="First name"
                  value={renderUser.firstName}
                  handleInput={adminHandleInput}
                  onBlur={adminHandleBlur}
                  error={userErrors.firstName}
                  style={{ color: "black" }}
                />
              </div>
              <div className="wrap-last-name">
                <Input
                  name="lastName"
                  type="text"
                  placeholder="Last name"
                  value={renderUser.lastName}
                  handleInput={adminHandleInput}
                  onBlur={adminHandleBlur}
                  error={userErrors.lastName}
                  style={{ color: "black" }}
                />
              </div>
            </div>

            <div className="row-edit-email block">
              <Input
                name="email"
                type="text"
                placeholder="Email"
                value={renderUser.email}
                handleInput={adminHandleInput}
                onBlur={adminHandleBlur}
                error={userErrors.email}
                style={{ color: "black" }}
              />
            </div>

            {user.id === null && (
              <div className="row-edit-password block">
                <Input
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={
                    // user.id === null ? Password.generate(8) :
                    renderUser.password
                  }
                  handleInput={adminHandleInput}
                  onBlur={adminHandleBlur}
                  // error={userErrors.password}
                  style={{ color: "black" }}
                />
              </div>
            )}

            <div
              className="row-position block"
              activevalue={renderUser.roles[0]}
            >
              <SelectCustom
                name="roles"
                title="Role"
                activeValue={renderUser.roles[0]}
                options={[
                  {
                    name: "admin",
                    title: "Administrator",
                  },
                  {
                    name: "content",
                    title: "Moderator",
                  },
                  {
                    name: "user",
                    title: "User",
                  },
                ]}
                handleChange={adminHandleSelect}
              />
            </div>

            <div className="row-edit-buttons-container block">
              {deleteAdmin && (
                <button
                  className="delete-modal"
                  onClick={() => deleteAdmin(user.id)}
                >
                  Delete profile
                </button>
              )}

              <button className="cancel-modal" onClick={this.handleToggleModal}>
                Cancel
              </button>

              {submit && (
                <button
                  className="save"
                  id="saveBtn"
                  onClick={() => submit({ id: user.id, ...userChanges }, user)}
                >
                  Save
                </button>
              )}
            </div>
          </div>
        </ModalLauncher>
      </div>
    )
  }
}

export default MainAdmin
