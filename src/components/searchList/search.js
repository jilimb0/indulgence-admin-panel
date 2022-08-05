import React, { useState } from "react"
import "./search.scss"
import SearchItemAdmin from "../UI/SearchItemAdmin/SearchItemAdmin"
import SearchItemUser from "../UI/SearchItemUser/SearchItemUser"
import SearchItemPublication from "../UI/SearchItemPublication/SearchItemPublication"
import SearchItemMessage from "../UI/SearchItemMessage/SearchItemMessage"
import SearchItemComments from "../UI/SearchItemComments/SearchItemComments"
import backArrow from "./img/back.png"

const Search = ({
  searchClass,
  listName,
  children,
  selectItem,
  activeUserIdx,
  back,
  cancel,
}) => {
  const [searchTerm, setSearchTerm] = useState("")

  let itemsStack = children.props.children
  let itemKey = itemsStack.map((val) => {
    return val.key
  })
  let itemProps = itemsStack.map((val) => {
    return val.props
  })

  return (
    <div className={searchClass ? `wrap-search ${searchClass}` : "wrap-search"}>
      <span>{listName ? listName : "List"}</span>
      {back || cancel ? (
        <div className="search-comments">
          <button
            className="back"
            onClick={back}
          >
            <img src={backArrow} alt="" />
            <span>{back ? "Back" : "Cancel"}</span>
          </button>
          <input
            name="search"
            type="text"
            maxLength="30"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
            }}
          />
        </div>
      ) : (
        <input
          name="search"
          type="text"
          maxLength="30"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value)
          }}
        />
      )}

      <div
        id={
          navigator.platform === "iPhone"
            ? "item-list-iphone"
            : "item-list-android"
        }
        className="item-list"
      >
        {searchTerm === ""
          ? children
          : window.location.pathname === "/administration"
          ? itemProps
              .filter((val) => {
                return val.name.toLowerCase().includes(searchTerm.toLowerCase())
              })
              .map((val) => {
                return (
                  <SearchItemAdmin
                    key={itemKey[val.idx]}
                    idx={val.idx}
                    name={val.name}
                    role={val.role}
                    date={val.date}
                    status={val.status ? "Active" : "Blocked"}
                    imgUrl={val.imgUrl}
                    active={activeUserIdx === val.idx}
                    selectItem={selectItem}
                  />
                )
              })
          : window.location.pathname === "/users"
          ? itemProps
              .filter((val) => {
                return val.name.toLowerCase().includes(searchTerm.toLowerCase())
              })
              .map((val) => {
                return (
                  <SearchItemUser
                    key={itemKey[val.idx]}
                    idx={val.idx}
                    name={val.name}
                    email={val.email}
                    date={val.date}
                    status={val.status ? "Active" : "Blocked"}
                    imgUrl={val.imgUrl}
                    active={activeUserIdx === val.idx}
                    selectItem={selectItem}
                  />
                )
              })
          : window.location.pathname === "/publications"
          ? itemProps
              .filter((val) => {
                return val.msg.toLowerCase().includes(searchTerm.toLowerCase())
              })
              .map((val) => {
                return (
                  <SearchItemPublication
                    key={itemKey[val.idx]}
                    idx={val.idx}
                    msg={val.msg}
                    date={val.date}
                    status={val.status}
                    active={activeUserIdx === val.idx}
                    selectItem={selectItem}
                  />
                )
              })
          : window.location.pathname === "/messages"
          ? itemProps
              .filter((val) => {
                return val.msg.toLowerCase().includes(searchTerm.toLowerCase())
              })
              .map((val) => {
                return (
                  <SearchItemMessage
                    key={itemKey[val.idx]}
                    id={val.id}
                    idx={val.idx}
                    name={val.name}
                    msg={val.msg}
                    date={val.date}
                    status={val.status}
                    imgUrl={val.imgUrl}
                    active={activeUserIdx === val.idx}
                    selectItem={selectItem}
                  />
                )
              })
          : itemProps
              .filter((val) => {
                return val.name.toLowerCase().includes(searchTerm.toLowerCase())
              })
              .map((val) => {
                return (
                  <SearchItemComments
                    key={itemKey[val.idx]}
                    idx={val.idx}
                    name={val.name}
                    role={val.role}
                    date={val.date}
                    status={val.status ? "Active" : "Blocked"}
                    imgUrl={val.imgUrl}
                    active={activeUserIdx === val.idx}
                    selectItem={selectItem}
                  />
                )
              })}
      </div>
    </div>
  )
}

export default Search
