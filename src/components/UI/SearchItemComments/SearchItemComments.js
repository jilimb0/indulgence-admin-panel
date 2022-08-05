import React from "react"
import "./searchItemComments.scss"
// import { timeStampToDateFormat } from "../../../services/utils"
import UserImg from "../UserImg/UserImg"

const SearchItemPublication = ({
  id,
  likes,
  replies_count,
  blockUser,
  authorId,
  deleteComment,
  publicationId,
  name,
  date,
  imgUrl,
  msg,
  showReplies,
  setActiveCommentId,
  activeCommentId,
  closeComments,
}) => {
  return (
    <div
      className={activeCommentId === id ? "wrap-row active" : "wrap-row"}
      onClick={
        setActiveCommentId
          ? () => showReplies(publicationId, setActiveCommentId(id))
          : ""
      }
    >
      <div className="row">
        <div className="wrap-img">
          <UserImg
            imgUrl={imgUrl}
            alt="user avatar"
            isBlueBg={activeCommentId === id ? true : false}
          />
        </div>
        <div className="wrap-content">
          <div className="user-detail">{name}</div>

          <div className="date">{date}</div>

          <div className="comment-text">{msg}</div>

          <div className="reactions">
            <div className={likes.count > 0 ? "likes" : "disabled-reaction"}>
              <div className="title title-comments">Likes:</div>
              <div className="comments-value">{likes.count}</div>
            </div>
            <div
              className={
                replies_count > 0 ? "comments-forward" : "disabled-reaction"
              }
            >
              <div className="title title-forwards">Replies:</div>
              <div className="comments-forward-value">{replies_count}</div>
            </div>
            {/* <div className="reports">
                <div className="title title-comments">Reports:</div>
                <div className="comments-value">{"0"}</div>
              </div> */}
          </div>

          <div className="buttons">
            <div
              className="block"
              id="block"
              onClick={() => blockUser(authorId)}
            >
              Block user
              {/* <input type="checkbox" onChange={handleDeleteChange} /> */}
            </div>
            <div
              className="remove"
              id="remove"
              onClick={() => deleteComment({ id, publicationId })}
            >
              Delete comment
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchItemPublication
