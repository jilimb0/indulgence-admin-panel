import React from "react"
import "./userDetails.scss"
import { userTimeStampToDateFormat } from "../../../services/utils"
import UserImg from "../../UI/UserImg/UserImg"
import defaultUser from "../../navigation/img/users.svg"
import backArrow from "./img/back.png"

const UserDetails = ({
  user = {},
  userChanges,
  back,
  blockUser,
  unBlockUser,
}) => {
  const renderUser = { ...user, ...userChanges }
  return (
    <div
      id={
        navigator.platform === "iPhone"
          ? "details-container-iphone"
          : "details-container-android"
      }
      className="user-details-container details-container"
    >
      <div className="wrap-detail">
        <div className="main-block">
          <button className="cancel" onClick={() => back()}>
            <img src={backArrow} alt="" />
            <span>Back</span>
          </button>
          <div className="wrap-details-container-header">
            <span className="title">User</span>
            <div className="row-date subtitle-header">
              <div className="date-value">
                Registred {userTimeStampToDateFormat(renderUser.createdAt)}
              </div>
            </div>
          </div>

          <div className="row-info">
            <UserImg
              isBigImg
              imgUrl={renderUser.imageUrl ? renderUser.imageUrl : defaultUser}
              enabled={renderUser.enabled}
            />

            <div className="row-user-name">{renderUser.username}</div>

            <div className="row-email">{renderUser.email}</div>
          </div>

          <button
            className={
              renderUser.enabled
                ? "status status-blocked"
                : "status status-active"
            }
            onClick={() =>
              renderUser.enabled === true
                ? blockUser(renderUser.id)
                : unBlockUser(renderUser.id)
            }
          >
            {renderUser.enabled ? "Block account" : "Activate account"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserDetails
