import React, { Fragment, useState, useEffect } from "react"
import "./pagePublication.scss"

import Navigation from "../../navigation/navigationContainer"
import Search from "../../searchList/search"
import SearchItemPublication from "../../UI/SearchItemPublication/SearchItemPublication"
import PublicationsDetails from "../publicationsDetails/publicationsDetails"
import PublicationsDetailsComments from "../publicationsDetailsComments/publicationsDetailsCommentsContainer"
import Replies from "../replies/repliesContainer"
import AddNewButton from "../../UI/addNewButton/addNewButton"

const PagePublication = ({
  publications = [],
  publicationChanges,
  activePublicationIdx,
  toggleSelectPublication,
  publicationSetFile,
  publicationHandleInput,
  deletePublication,
  savePublication,
  isShowComments,
  isShowReplies,
  showComments,
  showReplies,
  setTimeAction,
  setDateAction,
  addNewPublication,
  selectPublication,
  getProfile,
  getPublications,
}) => {
  const [isVisibleSearchPage, setVisibleSearchPage] = useState(
    window.innerWidth >= 851 ? true : false
  )

  useEffect(() => {
    getProfile()
    getPublications()
  }, [getProfile, getPublications])

  window.addEventListener("resize", () => {
    window.innerWidth >= 851
      ? setVisibleSearchPage(true)
      : setVisibleSearchPage(false)
  })

  const MessagesList = () => {
    return publications.map(({ id, posted_at, full_text, status }, idx) => {
      return (
        <SearchItemPublication
          key={id}
          id={id}
          idx={idx}
          msg={full_text}
          date={posted_at}
          status={status}
          active={activePublicationIdx === idx}
          selectItem={selectPublication}
        />
      )
    })
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
          (activePublicationIdx === 0 || activePublicationIdx > 0) &&
          publications[activePublicationIdx] !== undefined &&
          isVisibleSearchPage === false
            ? { display: "none" }
            : { display: "block" }
        }
      >
        <AddNewButton
          addNew={addNewPublication}
          isActive={activePublicationIdx === 0 || activePublicationIdx > 0}
        />
        <Search
          listName={"Publications"}
          searchName={"publication"}
          activeUserIdx={activePublicationIdx}
          selectItem={selectPublication}
        >
          <>{MessagesList()}</>
        </Search>
      </div>
      {(activePublicationIdx === 0 || activePublicationIdx > 0) &&
        !isShowComments &&
        !isShowReplies && (
          <PublicationsDetails
            publication={
              publications[activePublicationIdx]
                ? publications[activePublicationIdx]
                : publicationChanges
            }
            publicationChanges={publicationChanges}
            back={toggleSelectPublication}
            setFile={publicationSetFile}
            handleInput={publicationHandleInput}
            deletePublication={deletePublication}
            savePublication={savePublication}
            showComments={showComments}
            setTimeAction={setTimeAction}
            setDateAction={setDateAction}
          />
        )}
      {window.innerWidth <= 500
        ? !isShowReplies &&
          isShowComments && (
            <PublicationsDetailsComments showReplies={showReplies} />
          )
        : isShowComments && (
            <PublicationsDetailsComments showReplies={showReplies} />
          )}
      {isShowReplies && (
        // isShowComments &&
        <Replies />
      )}
    </Fragment>
  )
}

export default PagePublication
