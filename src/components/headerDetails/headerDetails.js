import React from "react"
import "./headerDetails.scss"

const HeaderDetails = ({ title, back, del, submit, search = "" }) => {
  return (
    <header className="wrap-search">
      <span>{title}</span>

      <div className="flex-block">
        <button className="cancel-modal" onClick={() => back()}>
          <div className="back-arrow"></div>
          <span>Back</span>
        </button>

        <input
          name="search"
          type="text"
          maxLength="30"
          placeholder="Search"
          value={search}
          // onChange={(e) => this.handleInput(e)}
        />
      </div>
    </header>
  )
}

export default HeaderDetails
