import React, { useEffect } from "react"
import "./replies.scss"
import { timeStampToDateFormat } from "../../../services/utils"
import Search from "../../searchList/search"
import SearchItemComments from "../../UI/SearchItemComments/SearchItemComments"

const Replies = ({
  publicationId,
  replies,
  activeCommentId,
  blockUser,
  closeReplies,
  deleteRepliesComment,
  getCommentsReplies,
  setActiveCommentId,
}) => {
  useEffect(() => {
    getCommentsReplies(publicationId, activeCommentId)
  }, [publicationId, activeCommentId, getCommentsReplies])

  const repliesList = replies.map((rep) => {
    const {
      id,
      content,
      createdAt,
      likes,
      author: { firstName, lastName, username, imageUrl },
    } = rep

    const authorId = rep.author.id

    return (
      <SearchItemComments
        name={
          (firstName + lastName).length
            ? `${firstName} ${lastName}`
            : `${username}`
        }
        date={timeStampToDateFormat(createdAt)}
        id={id}
        imgUrl={imageUrl}
        msg={content}
        likes={likes}
        blockUser={() => blockUser(authorId)}
        authorId={authorId}
        deleteComment={() => deleteRepliesComment({ id, publicationId })}
        publicationId={publicationId}
      />
    )
  })

  return (
    <div
      id={
        navigator.platform === "iPhone"
          ? "details-container-iphone"
          : "details-container-android"
      }
      className="publications-details-comments publications-details-replies"
    >
      <Search
        listName={"Replies"}
        searchName={"replies"}
        activeUserIdx={activeCommentId}
        selectItem={setActiveCommentId}
        back={closeReplies}
      >
        <>{repliesList}</>
      </Search>
    </div>
  )
}
export default Replies
