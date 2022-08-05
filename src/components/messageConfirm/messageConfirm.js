import React from "react"
import "./messageConfirm.scss"
import del from "./img/bucket.svg"
import save from "./img/arrow.svg"
import unblock from "./img/unblock.svg"
import block from "./img/block.svg"
import exit from "./img/exit.svg"
// import error from "./img/error.svg"

const MessageConfirm = ({
  msg,
  show,
  onConfirm,
  onCancel,
  pendingAction,
  onCheck,
  options = "",
}) => {
  return (
    <div
      className={
        msg.search(/exit/i) === 25
          ? "wrap-message-confirm wrap-message-confirm-exit"
          : msg.search(/Save/i) === 0 &&
            window.location.pathname === "/settings"
          ? "wrap-message-confirm wrap-message-confirm-save"
          : msg.search(/block/i) === 25 &&
            window.location.pathname === "/publications"
          ? "wrap-message-confirm wrap-message-confirm-block"
          : "wrap-message-confirm"
      }
      style={{ display: show ? "flex" : "none" }}
    >
      <div className="message-confirm">
        <div className="msg-block">
          <img
            src={
              msg.search(/delete/i) === 25
                ? del
                : msg.search(/Save/i) === 0
                ? save
                : msg.search(/move/i) === 25
                ? save
                : msg.search(/Unblock/i) === 0
                ? unblock
                : msg.search(/exit/i) === 25
                ? exit
                : block
            }
            alt="icon"
            className="icon"
          />
          <div
            className={
              msg.search(/Save/i) === 0
                ? "message-text message-save"
                : "message-text"
            }
          >
            {msg}
          </div>
        </div>

        {msg.search(/block/i) === 25 &&
          window.location.pathname === "/publications" && (
            <div className="checkbox-block">
              <input
                id="checkbox-delete"
                type="checkbox"
                onChange={() => onCheck(pendingAction, options)}
              />
              <label htmlFor="checkbox-delete">
                <div className="title">Delete all comments</div>
                <div className="subtitle">
                  To remove all comments from the user you want to block, check
                  the box
                </div>
              </label>
            </div>
          )}

        <div className="wrap-btn">
          <button className="btn success" onClick={() => onCancel()}>
            Cancel
          </button>

          <button
            className={
              msg.search(/delete/i) === 25
                ? "btn delete"
                : msg.search(/Save/i) === 0
                ? "btn save"
                : msg.search(/move/i) === 25
                ? "btn move"
                : msg.search(/Unblock/i) === 0
                ? "btn unblock"
                : msg.search(/exit/i) === 25
                ? "btn exit"
                : "btn block"
            }
            onClick={() => onConfirm(pendingAction, options)}
          >
            {msg.search(/delete/i) === 25
              ? "Delete"
              : msg.search(/Save/i) === 0
              ? "Save"
              : msg.search(/move/i) === 25
              ? "Move"
              : msg.search(/Unblock/i) === 0
              ? "Unblock"
              : msg.search(/exit/i) === 25
              ? "Exit"
              : msg.search(/not/i) === 17
              ? "Yes"
              : "Block"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default MessageConfirm
