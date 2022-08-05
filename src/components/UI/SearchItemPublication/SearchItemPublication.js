import React from "react"
import "./searchItemPublication.scss"
import { timeStampToDateFormat } from "../../../services/utils"

const SearchItemPublication = ({
  id,
  idx,
  msg,
  date,
  status,
  active = false,
  selectItem,
}) => {
  let setStatus
  switch (status) {
    case "Pending":
      setStatus = (
        <div className="status-publication status-pending">{status}</div>
      )
      break
    case "Posted By":
      setStatus = (
        <div className="status-publication status-active">{status}</div>
      )

      break
    case "No date assigned":
      setStatus = (
        <div className="status-publication status-no-date">{status}</div>
      )
      break
    default:
      setStatus = ""
  }

  return (
    <div
      className={
        active
          ? "wrap-item wrap-item-publication active"
          : "wrap-item wrap-item-publication"
      }
      onClick={() => selectItem(idx)}
    >
      <div className="item">
        <div className="params params-post">
          {setStatus}
          <div className="date">{timeStampToDateFormat(date)}</div>
        </div>
        <div className="item-info">
          <div className="content">
            <div className="number">#{id}</div>
            {msg}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchItemPublication
