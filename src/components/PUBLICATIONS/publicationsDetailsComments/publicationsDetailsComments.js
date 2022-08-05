import React, { useEffect } from "react"
import "./publicationsDetailsComments.scss"
import { timeStampToDateFormat } from "../../../services/utils"
import Search from "../../searchList/search"
import SearchItemComments from "../../UI/SearchItemComments/SearchItemComments"

const PublicationsDetailsComments = ({
  publicationId,
  comments,
  closeComments,
  closeReplies,
  getCommentsPublication,
  setActiveCommentId,
  showReplies,
  activeCommentId,
  blockUser,
  deleteComment,
  delete_comments = false,
}) => {
  useEffect(() => {
    getCommentsPublication(publicationId)
  }, [getCommentsPublication, publicationId])

  const commentsList = comments.map((comment) => {
    const {
      id,
      content,
      createdAt,
      likes,
      // reports,
      replies_count,
      author: { firstName, lastName, username, imageUrl },
    } = comment
    const authorId = comment.author.id

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
        replies_count={replies_count}
        blockUser={() => blockUser({ authorId, delete_comments })}
        authorId={authorId}
        deleteComment={() => deleteComment({ id, publicationId })}
        publicationId={publicationId}
        showReplies={showReplies}
        closeComments={closeComments}
        setActiveCommentId={setActiveCommentId}
        activeCommentId={activeCommentId}
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
      className="publications-details-comments"
    >
      <Search
        listName={"Comments"}
        searchName={"comments"}
        activeUserIdx={activeCommentId}
        selectItem={setActiveCommentId}
        back={closeComments}
      >
        <>{commentsList}</>
      </Search>
    </div>
  )
}
export default PublicationsDetailsComments
