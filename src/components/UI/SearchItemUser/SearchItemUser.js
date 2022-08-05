import React from "react"
import "./searchItemUser.scss"
import UserImg from "../UserImg/UserImg"
// import { timeStampToDateFormat } from "../../../services/utils"

const SearchItemUser = ({
  idx,
  name,
  imgUrl,
  //   date,
  status,
  active = false,
  selectItem,
  email,
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
          <div className="item-subtitle">{email}</div>
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

export default SearchItemUser
