import React, { Fragment, useState, useEffect } from "react"
import "./pageUser.scss"

import Navigation from "../../navigation/navigationContainer"
import Search from "../../searchList/search"
import SearchItemUser from "../../UI/SearchItemUser/SearchItemUser"
import UserDetails from "../userDetails/userDetails"

const PageUser = ({
  users,
  userChanges,
  userErrors,
  activeUserIdx,
  toggleSelectUser,
  handleInput,
  handleBlur,
  handleSelect,
  putUser,
  userSetFile,
  blockUser,
  unBlockUser,
  deleteUser,
  selectUser,
  getProfile,
  getUsers,
}) => {
  const [isVisibleSearchPage, setVisibleSearchPage] = useState(
    window.innerWidth >= 851 ? true : false
  )

  useEffect(() => {
    getProfile()
    getUsers()
  }, [getProfile, getUsers])

  window.addEventListener("resize", () => {
    window.innerWidth >= 851
      ? setVisibleSearchPage(true)
      : setVisibleSearchPage(false)
  })

  const UserList = () => {
    return users.map(
      (
        {
          id,
          username,
          firstName,
          lastName,
          createdAt,
          imageUrl,
          enabled,
          email,
        },
        idx
      ) => (
        <SearchItemUser
          key={id}
          idx={idx}
          name={
            (firstName + lastName).length
              ? `${firstName} ${lastName}`
              : `${username}`
          }
          email={email}
          date={createdAt}
          status={enabled ? "Active" : "Blocked"}
          imgUrl={imageUrl}
          active={activeUserIdx === idx}
          selectItem={selectUser}
        />
      )
    )
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
          (activeUserIdx === 0 || activeUserIdx > 0) &&
          users[activeUserIdx] !== undefined &&
          isVisibleSearchPage === false
            ? { display: "none" }
            : { display: "block" }
        }
      >
        <Search
          listName={"Users"}
          searchName={"user"}
          searchClass={"user-search"}
          activeUserIdx={activeUserIdx}
          selectItem={selectUser}
        >
          <>{UserList()}</>
        </Search>
      </div>

      {(activeUserIdx === 0 || activeUserIdx > 0) && (
        <UserDetails
          user={users[activeUserIdx] ? users[activeUserIdx] : userChanges}
          errors={userErrors}
          handleInput={handleInput}
          handleBlur={handleBlur}
          userChanges={userChanges}
          handleSelect={handleSelect}
          userSetFile={userSetFile}
          back={toggleSelectUser}
          blockUser={blockUser}
          unBlockUser={unBlockUser}
          deleteUser={deleteUser}
          submit={putUser}
        />
      )}
    </Fragment>
  )
}

export default PageUser
