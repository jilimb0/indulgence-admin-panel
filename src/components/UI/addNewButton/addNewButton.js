import React from "react"
import "./addNewButton.scss"

const AddNewButton = ({ addNew, item }) => {
  return (
    <div className="wrap-new-item">
      <div className="new-item" onClick={() => addNew(item)}>
        <div
          className="item-plus"
          id="item-plus"
          // onClick={() =>
          //   (document.getElementById("item-plus").style.visibility = "hidden")
          // }
        />
      </div>
    </div>
  )
}

export default AddNewButton
