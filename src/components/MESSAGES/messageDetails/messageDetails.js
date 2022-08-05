import React from "react"
import "./messageDetails.scss"
import account from "./img/account.svg"
import bucket from "./img/bucket.svg"
import backArrow from "./img/back.png"
import { timeStampToDateFormat } from "../../../services/utils"

const MessageDetails = ({ message, back, deleteMessage, moveToPost }) => {
  if (!message) return null

  const {
    id,
    author,
    created_at,
    // viewed,
    content,
  } = message

  let firstName = "",
    lastName = "",
    username = "",
    imageUrl = ""
  if (author) {
    username = author.username
    firstName = author.firstName
    lastName = author.lastName
    imageUrl = author.imageUrl
  }
  return (
    <div
      id={
        navigator.platform === "iPhone"
          ? "details-container-iphone"
          : "details-container-android"
      }
      className="message-details-container details-container"
    >
      <div className="wrap-detail">
        <div className="row-user">
          <div className="wrap-content">
            <div className="wrap-message-details-container-header">
              {window.innerWidth <= 851 && (
                <button className="cancel" onClick={() => back()}>
                  <img src={backArrow} alt="" />
                  <span>Back</span>
                </button>
              )}
              <span className="user-title">Message</span>
              <div className="info-block">
                <div className="text">
                  <div className="user-name">
                    {(firstName + lastName).length
                      ? `${firstName} ${lastName}`
                      : `${username}`}
                  </div>

                  <div className="row-date">
                    <div className="date-value">
                      {timeStampToDateFormat(created_at)}
                    </div>
                  </div>
                </div>
                <img
                  className="user-img"
                  crossOrigin="anonymous"
                  src={imageUrl ? imageUrl : account}
                  alt="user"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="row-text">
          <div className="text-value">{content}</div>
        </div>

        <deleteMessage className="row-link" onClick={() => moveToPost(id)}>
          <div className="icon-link" />
          <div className="link-title">Send text to publication</div>
        </deleteMessage>

        {deleteMessage && (
          <button className="delete" onClick={() => deleteMessage(id)}>
            <img src={bucket} alt="" />
            <span>Delete message</span>
          </button>
        )}

        {/* <div className="row-status">
          <div className="status-title">Status:</div>
          <div className="status-value">{viewed ? "Read" : "New"}</div>
        </div> */}
      </div>
    </div>
  )
}
export default MessageDetails
