import React, { useState } from "react"

import "./UserImg.scss"
import StatusCircle from "../StatusCircle/StatusCircle"

import defaultUser from "./img/user.svg"

const UserImg = ({
  imgUrl,
  enabled,
  isBigImg,
  isMessages,
  isSettings,
  isBlueBg,
  isUpload,
}) => {
  const Image = ({ className, alt, src }) => {
    const [isLoading, setLoading] = useState(true)
    const [isError, setIsError] = useState(false)

    const handleLoad = async () => {
      setLoading(false)
      setIsError(false)
    }

    const handleError = async () => {
      setLoading(false)
      setIsError(true)
    }

    return (
      <>
        {isError && !isLoading && <img src={defaultUser} alt="default" />}
        {!isError && isLoading && (
          <div
            className={isBlueBg ? "lds-dual-ring white-ring" : "lds-dual-ring"}
          ></div>
        )}
        <img
          className={className}
          style={{
            display: isError || isLoading ? "none" : "initial",
          }}
          crossOrigin="anonymous"
          alt={alt || "Default Alt"}
          onLoad={handleLoad}
          onError={handleError}
          src={src}
        />
      </>
    )
  }
  return (
    <>
      {isBigImg && (
        <div className="row-show-img">
          <Image
            src={imgUrl ? imgUrl : defaultUser}
            className="user-img"
            alt="userPhoto"
            isNav
          >
            Image load failed!
          </Image>
          <StatusCircle enabled={enabled} isSettings={isSettings} />
        </div>
      )}

      {!isBigImg && (
        <div
          className={
            isMessages
              ? "wrap-message-img"
              : isUpload
              ? "upload-img"
              : "wrap-user-img"
          }
        >
          <Image src={imgUrl} className="user-img" alt="userPhoto">
            Image load failed!
          </Image>
        </div>
      )}
    </>
  )
}

export default UserImg
