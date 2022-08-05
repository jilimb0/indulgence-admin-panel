import React from "react"
import "./inputFile.scss"
import account from "./img/account.svg"
import UserImg from "../UserImg/UserImg"

const InputFile = ({ label, imgUrl, setFile }) => {
  const imgSrc = imgUrl ? imgUrl : account
  return (
    <div className="wrap-upload">
      <label className="wrap-upload-img" htmlFor="upload-button">
        <UserImg isUpload imgUrl={imgSrc} alt="User" />
      </label>
      <input
        name="file"
        id="upload-button"
        type="file"
        accept="image/*"
        className="upload-file"
        onChange={(e) => setFile(e)}
      />
      <div className="wrap-label">
        <div className="label-upload">{label}</div>
      </div>
    </div>
  )
}

export default InputFile
