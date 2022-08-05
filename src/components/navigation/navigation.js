import React, { useState, useRef } from "react"

import nameLogo from "./img/Logo.webp"
// import defaultUser from "./img/users.svg"
import { history } from "../../services/history"
import useOutsideClick from "../UI/useOutsideClick/useOutsideClick"
import UserImg from "../UI/UserImg/UserImg"

import "./navigation.scss"
import { Link } from "react-router-dom"

const Navigation = ({
  user: { firstName, lastName, roles = [], imageUrl },
  logout,
}) => {
  let innerWidth = window.innerWidth >= 1050 ? true : false

  const [isVisible, setVisible] = useState(innerWidth)

  const handleChangeVisible = () => {
    setVisible(!isVisible)
  }

  const handleChangeOnResize = () => {
    window.innerWidth >= 1050 ? setVisible(true) : setVisible(false)
  }

  window.onresize = () => handleChangeOnResize()

  const activeMenu = history.location.pathname.substr(1)

  const ref = useRef()

  useOutsideClick(ref, () => {
    if (isVisible === true) {
      setVisible(false)
    }
  })

  const HideMenuBtn = () => {
    return (
      <div className="logo__img hide">
        <img
          src={nameLogo}
          alt="indulgence logo"
          onClick={handleChangeVisible}
        />
      </div>
    )
  }

  return (
    <>
      {isVisible === false && <HideMenuBtn />}

      <div
        id={
          navigator.platform === "iPhone"
            ? "nav-container-iphone"
            : "nav-container-android"
        }
        className={
          isVisible === false
            ? "nav-container nav-container-hide"
            : "nav-container"
        }
        ref={ref}
      >
        <div className="logo">
          <div className="logo__img">
            <img
              src={nameLogo}
              alt="indulgence logo"
              onClick={handleChangeVisible}
            />
          </div>
          <p className="logo__title">Indulgence</p>
        </div>
        <nav className="sections">
          <ul>
            <li
              className={
                activeMenu === "administration"
                  ? "sections__title active-menu"
                  : "sections__title"
              }
            >
              <Link to={"/administration"}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="60"
                  height="60"
                  viewBox="0 0 60 60"
                  className="icon"
                >
                  <g id="Image" transform="translate(15 -237)">
                    <g
                      id="Image_Messege"
                      data-name="Image Messege"
                      transform="translate(-15 237)"
                      opacity="0"
                    >
                      <circle
                        id="Image_Messege-2"
                        data-name="Image Messege"
                        cx="30"
                        cy="30"
                        r="30"
                        fill="#6b6b6b"
                      />
                    </g>
                    <path
                      id="Icon_awesome-teamspeak"
                      data-name="Icon awesome-teamspeak"
                      d="M16.371,23.24c.161-.824-.8-2.01-2.172-3.264a22.664,22.664,0,0,0-4.25-3.123,1.981,1.981,0,0,0-3.1,1.521,6.631,6.631,0,0,0,.972,4.952,3.6,3.6,0,0,0,2.91,1.608,22.208,22.208,0,0,0,4.136-.067A2.111,2.111,0,0,0,16.371,23.24Zm13.743,1.394a.35.35,0,0,0-.556.161c-.536,1.7-3,7.539-11.538,8.142-10.036.7,5.383,2.922,9.748-.429,1.522-1.166,3.191-2.346,3.124-5.723a3.547,3.547,0,0,0-.778-2.151Zm4.156-8.2A3.013,3.013,0,0,0,32.528,13.6a.585.585,0,0,1-.4-.429A14.918,14.918,0,0,0,29.424,6.9c-.074-.1-.235-.214-.147-.335.57-.771-.02-1.206-.469-1.635A16.023,16.023,0,0,0,11.893.877,14.883,14.883,0,0,0,5.055,5.394c-.268.288-.449.61-.2.972.2.268.087.415-.067.623a15.171,15.171,0,0,0-2.635,6.146.653.653,0,0,1-.429.523A2.911,2.911,0,0,0,.054,15.936L0,17.711v1.4A3.109,3.109,0,0,0,3.473,22.4a.738.738,0,0,0,.8-.771c.134-5.194-.161-6.393.248-8.431A12.91,12.91,0,0,1,23.149,4.382a12.576,12.576,0,0,1,6.858,11.352c.054,1.89,0,3.786,0,5.669,0,.469.147.838.63.952A3.054,3.054,0,0,0,34.2,19.9a20.616,20.616,0,0,0,.067-3.465Zm-10.7,8.813a3.735,3.735,0,0,0,3.915-4.054c-.141-3.029-4.438-1.106-5.886-.536-4.907,1.883-3.017,3.679-1.488,4.075Z"
                      transform="translate(-2.645 249.995)"
                      fill="rgba(255, 255, 255, 0.5)"
                    />
                  </g>
                </svg>

                <span>Team</span>
              </Link>
            </li>
            <li
              className={
                activeMenu === "users"
                  ? "sections__title active-menu"
                  : "sections__title"
              }
            >
              <Link to={"/users"}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="60"
                  height="60"
                  viewBox="0 0 60 60"
                  className="icon"
                >
                  <g id="Image" transform="translate(15 -237)">
                    <g
                      id="Image_Messege"
                      data-name="Image Messege"
                      transform="translate(-15 237)"
                      opacity="0"
                    >
                      <circle
                        id="Image_Messege-2"
                        data-name="Image Messege"
                        cx="30"
                        cy="30"
                        r="30"
                        fill="#6b6b6b"
                      />
                    </g>
                    <g
                      id="Icon_feather-users"
                      data-name="Icon feather-users"
                      transform="translate(-4 248)"
                    >
                      <path
                        id="Path_1709"
                        data-name="Path 1709"
                        d="M27.651,32.307V29.038A6.538,6.538,0,0,0,21.113,22.5H8.038A6.538,6.538,0,0,0,1.5,29.038v3.269"
                        transform="translate(0 1.613)"
                        fill="none"
                        stroke="rgba(255, 255, 255, 0.5)"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      />
                      <path
                        id="Path_1710"
                        data-name="Path 1710"
                        d="M20.576,11.038A6.538,6.538,0,1,1,14.038,4.5,6.538,6.538,0,0,1,20.576,11.038Z"
                        transform="translate(0.538)"
                        fill="none"
                        stroke="rgba(255, 255, 255, 0.5)"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      />
                      <path
                        id="Path_1711"
                        data-name="Path 1711"
                        d="M34.9,32.289V29.02A6.538,6.538,0,0,0,30,22.7"
                        transform="translate(2.555 1.631)"
                        fill="none"
                        stroke="rgba(255, 255, 255, 0.5)"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      />
                      <path
                        id="Path_1712"
                        data-name="Path 1712"
                        d="M24,4.7a6.538,6.538,0,0,1,0,12.667"
                        transform="translate(2.017 0.017)"
                        fill="none"
                        stroke="rgba(255, 255, 255, 0.5)"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      />
                    </g>
                  </g>
                </svg>

                <span>Users</span>
              </Link>
            </li>
            <li
              className={
                activeMenu === "messages"
                  ? "sections__title active-menu"
                  : "sections__title"
              }
            >
              <Link to={"/messages"}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="60"
                  height="60"
                  viewBox="0 0 60 60"
                  className="icon"
                >
                  <g id="Icon" transform="translate(15 -237)">
                    <g
                      id="Image_Messege"
                      data-name="Image Messege"
                      transform="translate(-15 237)"
                      opacity="0"
                    ></g>
                    <g
                      id="Icon_feather-mail"
                      data-name="Icon feather-mail"
                      transform="translate(-3 249)"
                    >
                      <path
                        id="Path_1713"
                        data-name="Path 1713"
                        d="M6.067,6H30.606a3.076,3.076,0,0,1,3.067,3.067v18.4a3.076,3.076,0,0,1-3.067,3.067H6.067A3.076,3.076,0,0,1,3,27.472V9.067A3.076,3.076,0,0,1,6.067,6Z"
                        fill="none"
                        stroke="rgba(255, 255, 255, 0.5)"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      />
                      <path
                        id="Path_1714"
                        data-name="Path 1714"
                        d="M33.674,9,18.337,19.736,3,9"
                        transform="translate(0 0.067)"
                        fill="none"
                        stroke="rgba(255, 255, 255, 0.5)"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      />
                    </g>
                  </g>
                </svg>

                <span>Messages</span>
              </Link>
            </li>
            <li
              className={
                activeMenu === "publications"
                  ? "sections__title active-menu"
                  : "sections__title"
              }
            >
              <Link to={"/publications"}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="60"
                  height="60"
                  viewBox="0 0 60 60"
                  className="icon"
                >
                  <g id="Icon" transform="translate(15 -237)">
                    <g
                      id="Image_Messege"
                      data-name="Image Messege"
                      transform="translate(-15 237)"
                      opacity="0"
                    ></g>
                    <path
                      id="Icon_metro-earth"
                      data-name="Icon metro-earth"
                      d="M18.292,1.928A15.722,15.722,0,1,0,34.014,17.65,15.722,15.722,0,0,0,18.292,1.928Zm0,29.478a13.71,13.71,0,0,1-5.442-1.119l7.159-8.054a.983.983,0,0,0,.248-.653V18.632a.983.983,0,0,0-.983-.983c-3.469,0-7.13-3.607-7.166-3.643a.982.982,0,0,0-.695-.288H7.484A.983.983,0,0,0,6.5,14.7v5.9a.983.983,0,0,0,.543.879l3.387,1.694v5.769A13.765,13.765,0,0,1,5.86,11.754H9.449a.983.983,0,0,0,.695-.288l3.93-3.93a.983.983,0,0,0,.288-.695V4.464a13.795,13.795,0,0,1,9.957.817c-.127.108-.251.22-.37.339a5.9,5.9,0,0,0,4.165,10.065q.146,0,.292-.007a23.074,23.074,0,0,1-.258,11.433.98.98,0,0,0-.026.16,13.714,13.714,0,0,1-9.83,4.135Z"
                      transform="translate(-3.571 248.949)"
                      fill="rgba(255, 255, 255, 0.5)"
                    />
                  </g>
                </svg>

                <span>Publications</span>
              </Link>
            </li>
            <li
              className={
                activeMenu === "settings"
                  ? "sections__title active-menu"
                  : "sections__title"
              }
            >
              <Link to={"/settings"}>
                <div className="user-content">
                  <div className="user-logo-img">
                    <UserImg imgUrl={imageUrl} alt="UserPhoto" isBlueBg />
                  </div>
                  <div className="wrap-title">
                    <div className="user-title">
                      {firstName} {lastName}
                    </div>
                    <div className="user-role">{roles[0]}</div>
                  </div>
                </div>
              </Link>
            </li>
          </ul>
          <div className="sections__exit" onClick={logout}>
            <span>Exit</span>
          </div>
        </nav>
      </div>
    </>
  )
}

export default Navigation
