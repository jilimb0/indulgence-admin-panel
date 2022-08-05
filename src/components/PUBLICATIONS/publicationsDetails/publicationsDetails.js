import React, { Component } from "react"
import "./publicationsDetails.scss"
import bucket from "./img/bucket.svg"
import comments from "./img/comments.svg"
import backArrow from "./img/back.png"
import { timeStampToDateFormat } from "../../../services/utils"
// import DateTimePicker from "react-datetime-picker/dist/entry.nostyle"
import DateTimePicker from "react-datetime-picker/dist/entry"
import ModalLauncher from "../../Modal/ModalLauncher"

export default class PublicationsDetails extends Component {
  constructor(props) {
    super(props)
    this.handleToggleModal = this.handleToggleModal.bind(this)
    this.state = {
      showModal: this.props.publication.id === null ? true : false,
      status: this.props.publication.status,
      posted_at: this.props.publication.posted_at,
    }
  }

  handleToggleModal() {
    this.setState({ showModal: !this.state.showModal })
  }

  render() {
    const {
      publication,
      publicationChanges,
      publication: { created_by },
      deletePublication,
      savePublication,
      back,
      handleInput,
      showComments,
      setDateAction,
    } = this.props

    const renderPublication = { ...publication, ...publicationChanges }

    const { id, status, full_text, posted_at, poll_enabled } = renderPublication

    return (
      <div
        id={
          navigator.platform === "iPhone"
            ? "details-container-iphone"
            : "details-container-android"
        }
        className={
          id === null
            ? "publications-details-container-disabled"
            : "publications-details-container details-container"
        }
      >
        <div className="wrap-detail">
          <div className="main-block">
            <button className="cancel" onClick={() => back()}>
              <img src={backArrow} alt="" />
              <span>Back</span>
            </button>
            <div className="wrap-details-container-header">
              <div className="text">
                <span className="title">Publication</span>
              </div>
            </div>

            <div className="publication__block">
              <div className="user block">
                <div className="title responsible">User:</div>
                <div className="content user-name">
                  {created_by ? created_by.username : "New author"}
                </div>
              </div>

              <div className="id block">
                <div className="title label-id">ID:</div>
                <div className="content id-content">{id}</div>
              </div>

              <div className="date block">
                <div className="title label-date">Publication Date: </div>
                <div className="content publication-date">
                  {timeStampToDateFormat(posted_at)}
                </div>
              </div>

              <div className="message block">
                <div className="content text">
                  <div className="title label-text">Text:</div>
                  {full_text}
                </div>
              </div>

              <div className="poll block">
                <div className="title label-poll">Enable Poll:</div>
                <div className="content poll__status">
                  {poll_enabled ? "Yes" : "No"}
                </div>
              </div>

              <div className="status block">
                <div className="title label-status">Status:</div>
                <div
                  id="status-content"
                  className={
                    status === "Posted By"
                      ? "content status-posted"
                      : status === "Pending"
                      ? "content status-pending"
                      : "content status-no-date"
                  }
                >
                  {status}
                </div>
              </div>

              <div className="comments block" onClick={() => showComments(id)}>
                <img src={comments} alt="" />
                <button className="content comments-link">Comments</button>
              </div>

              {deletePublication && (
                <div
                  className="delete block"
                  onClick={() => deletePublication(id)}
                >
                  <img src={bucket} alt="" />
                  <button>Delete Publication</button>
                </div>
              )}

              {/* <div className="status block">
              <div className="title label-status">Reports:</div>
              <div
                id="status-content"
                className={
                  status === "Posted By"
                    ? "content status-posted"
                    : status === "Pending"
                    ? "content status-pending"
                    : "content status-no-date"
                }
              >
                {status}
              </div>
            </div> */}
            </div>
          </div>
        </div>
        <ModalLauncher
          buttonLabel={publication.id === null ? "" : "Edit"}
          classNameBtn={publication.id === null ? "item-plus-new" : "edit"}
          classNameContainer="modal-edit modal-edit-post"
          modalState={this.state.showModal}
          handleModalState={this.handleToggleModal}
          isNull={publication.id === null ? true : false}
        >
          <div className="main__block main__block_publication">
            <div className="row-edit-header block">
              <span>
                {publication.id === null
                  ? "Create publication"
                  : "Edit publication"}
              </span>
            </div>

            <div className="row-edit-date block">
              <div className="title label-date">Publication Date: </div>
              <div className="publication-date content">
                <DateTimePicker
                  disableClock={true}
                  format="MMMMd, y HH:mm"
                  onChange={(date) => {
                    setDateAction(date)
                  }}
                  value={new Date(this.props.publication.posted_at * 1000)}
                  minDate={new Date("January 1, 2020 00:00")}
                  maxDate={new Date("December 31, 2025 00:00")}
                />
                <div className="switch-container">
                  <label className="switch">
                    <input
                      id="checkbox-date"
                      type="checkbox"
                      checked={
                        this.props.publication.posted_at !== null ? true : false
                      }
                      onChange={() => {
                        posted_at === null
                          ? this.setState({
                              posted_at: (this.props.publication.posted_at = Math.floor(
                                Date.now() / 1000
                              )),
                              // status: (this.props.publication.status =
                              //   "Posted By"),
                            })
                          : this.setState({
                              posted_at: (this.props.publication.posted_at = null),
                              // status: (this.props.publication.status =
                              //   "No date assigned"),
                            })
                      }}
                    />
                    <span className="slider round"></span>
                  </label>
                </div>
              </div>
            </div>

            <div className="row-edit-message block">
              <div className="title label-text">Text:</div>
              <textarea
                className="text content"
                name="full_text"
                value={full_text}
                onChange={(e) => handleInput(e)}
              />
            </div>

            <div className="row-edit-poll block">
              <div className="title label-poll">Enable Poll:</div>
              <div className="poll__status content">
                <input
                  id="checkboxPoll"
                  name="poll_enabled"
                  type="checkbox"
                  checked={poll_enabled}
                  onChange={(e) => handleInput(e)}
                />
                <label
                  htmlFor="poll_enabled"
                  className={poll_enabled ? "poll-yes" : "poll-no"}
                >
                  {poll_enabled ? "Yes" : "No"}
                </label>
              </div>
            </div>

            <div className="row-edit-buttons-container block">
              {deletePublication && (
                <button
                  className="delete-modal"
                  onClick={() => deletePublication(id)}
                >
                  Delete Publication
                </button>
              )}
              <button className="cancel-modal" onClick={this.handleToggleModal}>
                Cancel
              </button>
              <button
                className="save"
                onClick={() => savePublication(renderPublication)}
              >
                Save
              </button>
            </div>
          </div>
        </ModalLauncher>
      </div>
    )
  }
}
