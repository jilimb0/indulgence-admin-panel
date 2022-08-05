import React from "react"
import "./searchItemMessage.scss"
import UserImg from "../UserImg/UserImg"
import { timeStandartDateFormat } from "../../../services/utils"

const SearchItemMessage = ({
  idx,
  name,
  imgUrl,
  msg,
  date,
  status,
  active = false,
  selectItem,
  ...props
}) => {
  const renderStatus = () => {
    if (status === "new") return <div className="status status-read"></div>
    else return <div className="status status-new"></div>
  }

  function get_time_diff(_datetime) {
    var datetime = new Date(_datetime).getTime()
    var now = new Date().getTime()

    const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

    if (isNaN(datetime)) {
      return " on " + _datetime
    }

    if (datetime < now) {
      var milisec_diff = now - datetime
    } else {
      milisec_diff = datetime - now
    }

    var days = Math.floor(milisec_diff / 1000 / 60 / (60 * 24))

    let a = new Date(date * 1000)
    var postHours = a.getHours()
    var postMinutes = a.getMinutes()
    var day = a.getDay()

    let postYear = a.getFullYear()
    let postMonth = a.getMonth()
    let postDateDay = a.getDate()

    let postDate =
      postDateDay +
      "." +
      (postMonth <= 9 ? "0" + postMonth : postMonth) +
      "." +
      postYear

    var respvalue = ""

    days < 1
      ? (respvalue +=
          postHours +
          ":" +
          (postMinutes <= 9 ? "0" + postMinutes : postMinutes))
      : days >= 1 && days <= 7
      ? (respvalue += weekdays[day])
      : days > 7
      ? (respvalue += postDate)
      : (respvalue += weekdays[day])

    return respvalue
  }

  return (
    <div
      className={active ? "wrap-item-message active" : "wrap-item-message"}
      onClick={() => selectItem(idx)}
    >
      <div className="item">
        <UserImg imgUrl={imgUrl} isMessages isBlueBg={active ? true : false} />
        <div className="wrap-params">
          <div className="item-name">{name}</div>
          <div className="item-msg content">{msg}</div>
          <div className={status === "new" ? "date date-new" : "date date-new"}>
            {get_time_diff(timeStandartDateFormat(date))}
          </div>
          {renderStatus()}
        </div>
      </div>
    </div>
  )
}

export default SearchItemMessage
