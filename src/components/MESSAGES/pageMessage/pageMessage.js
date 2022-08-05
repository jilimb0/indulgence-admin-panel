import React, { Fragment, useState, useEffect } from "react"
import "./pageMessage.scss"

import Navigation from "../../navigation/navigationContainer"
import Search from "../../searchList/search"
import SearchItemMessage from "../../UI/SearchItemMessage/SearchItemMessage"
import MessageDetails from "../messageDetails/messageDetails"

const PageMessage = ({
  messages,
  activeMessageIdx,
  toggleSelectMessage,
  deleteMessage,
  saveMessage,
  moveToPost,
  selectMessage,
  getProfile,
  getMessage,
}) => {
  const [isVisibleSearchPage, setVisibleSearchPage] = useState(
    window.innerWidth >= 851 ? true : false
  )

  useEffect(() => {
    getProfile()
    getMessage()
  }, [getProfile, getMessage])

  window.addEventListener("resize", () => {
    window.innerWidth >= 851
      ? setVisibleSearchPage(true)
      : setVisibleSearchPage(false)
  })

  const MessagesList = () => {
    return messages.map(
      ({ id, author, created_at, viewed = false, content }, idx) => {
        let username = "",
          firstName = "",
          lastName = "",
          imageUrl = ""
        if (author) {
          username = author.username
          firstName = author.firstName
          lastName = author.lastName
          imageUrl = author.imageUrl
        }
        return (
          <SearchItemMessage
            key={id}
            idx={idx}
            name={
              (firstName + lastName).length
                ? `${firstName} ${lastName}`
                : `${username}`
            }
            imgUrl={imageUrl}
            msg={content}
            date={created_at}
            status={viewed}
            active={activeMessageIdx === idx}
            selectItem={selectMessage}
          />
        )
      }
    )
  }

  return (
    <Fragment>
      <Navigation />

      <div
        id={
          navigator.platform === "iPhone"
            ? "search-container-iphone"
            : "search-container-android"
        }
        className="search-container"
        style={
          (activeMessageIdx === 0 || activeMessageIdx > 0) &&
          messages[activeMessageIdx] !== undefined &&
          isVisibleSearchPage === false
            ? { display: "none" }
            : { display: "block" }
        }
      >
        <Search
          listName={"Messages"}
          searchName={"message"}
          searchClass={"messages-search"}
          activeUserIdx={activeMessageIdx}
          selectItem={selectMessage}
        >
          <>{MessagesList()}</>
        </Search>
      </div>

      {(activeMessageIdx === 0 || activeMessageIdx > 0) && (
        <MessageDetails
          message={messages[activeMessageIdx]}
          back={toggleSelectMessage}
          deleteMessage={deleteMessage}
          saveMessage={saveMessage}
          moveToPost={moveToPost}
        />
      )}
    </Fragment>
  )
}

export default PageMessage
