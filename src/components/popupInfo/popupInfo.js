import React from "react"
import "./popupInfo.scss"

const PopupInfo = ({ onClose, msg, show }) => {
  return show ? (
    <div className="overlay-popup-info">
      <div className="popup">
        <div className="popup_block">
          <div
            className={
              msg.search(/An email/i) === 0
                ? "popup_img img-sent"
                : "popup_img img-incorrect"
            }
          />
          <div className="popup_text">
            <p>{msg}</p>
          </div>
          <div className="popup_close" onClick={() => onClose()}>
            {msg.search(/An email/i) === 0 ? "Continue" : "Try again"}
          </div>
        </div>
      </div>
    </div>
  ) : null
}

export default PopupInfo
