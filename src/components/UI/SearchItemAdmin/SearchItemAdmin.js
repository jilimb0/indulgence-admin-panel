import React from "react"
import UserImg from "../UserImg/UserImg"
import "./searchItemAdmin.scss"

const SearchItemAdmin = ({
  name,
  imgUrl,
  role,
  date,
  status,
  active = false,
  selectItem,
  idx,
  ...props
}) => {
  return (
    <div
      className={active ? "wrap-item active" : "wrap-item"}
      onClick={() => selectItem(idx)}
    >
      <div className="item-user">
        <UserImg imgUrl={imgUrl} isBlueBg={active ? true : false} />
        <div className="wrap-params">
          <div className="item-name">{name}</div>
          <div className="item-subtitle">{role}</div>
        </div>
        <div className="params">
          <div
            className={
              status === "Active"
                ? "status status-active"
                : "status status-blocked"
            }
          >
            {status}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchItemAdmin
