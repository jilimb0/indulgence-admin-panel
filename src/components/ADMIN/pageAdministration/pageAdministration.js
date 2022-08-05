import React, { Fragment, useState, useEffect } from "react"
import "./pageAdministration.scss"

import Navigation from "../../navigation/navigationContainer"
import Search from "../../searchList/search"
import SearchItemAdmin from "../../UI/SearchItemAdmin/SearchItemAdmin"
import AddNewButton from "../../UI/addNewButton/addNewButton"
import MainAdmin from "../mainAdmin"

const PageAdministration = ({
  users,
  userChanges,
  userErrors,
  activeUserIdx,
  toggleSelectAdminUser,
  adminHandleInput,
  adminHandleBlur,
  adminHandleSelect,
  putAdmin,
  adminSetFile,
  addNewAdmin,
  deleteAdmin,
  blockUser,
  unBlockUser,
  selectAdminUser,
  getProfile,
  getAdmins,
}) => {
  let innerWidth = window.innerWidth >= 851 ? true : false

  const [isVisibleSearchPage, setVisibleSearchPage] = useState(innerWidth)

  window.addEventListener("resize", () => {
    window.innerWidth >= 851
      ? setVisibleSearchPage(true)
      : setVisibleSearchPage(false)
  })

  useEffect(() => {
    getProfile()
    getAdmins()
  }, [getProfile, getAdmins])

  const UserList = () => {
    return users.map(
      (
        {
          id,
          username,
          firstName,
          lastName,
          roles,
          imageUrl,
          enabled,
          createdAt,
        },
        idx
      ) => (
        <SearchItemAdmin
          key={id}
          idx={idx}
          name={
            (firstName + lastName).length
              ? `${firstName} ${lastName}`
              : `${username}`
          }
          role={`${roles[0] === "admin" ? "Administrator" : "Moderator"}`}
          date={createdAt}
          status={enabled ? "Active" : "Blocked"}
          imgUrl={imageUrl}
          active={activeUserIdx === idx}
          selectItem={selectAdminUser}
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
        className={"search-container"}
        style={
          (activeUserIdx === 0 || activeUserIdx > 0) &&
          // users[activeUserIdx] !== undefined &&
          isVisibleSearchPage === false
            ? { display: "none" }
            : { display: "block" }
        }
      >
        <AddNewButton
          addNew={addNewAdmin}
          isActive={activeUserIdx === 0 || activeUserIdx > 0}
        />

        <Search
          listName={"Team"}
          searchName={"administrations"}
          activeUserIdx={activeUserIdx}
          selectItem={selectAdminUser}
        >
          <>{UserList()}</>
        </Search>
      </div>
      {(activeUserIdx === 0 || activeUserIdx > 0) && (
        <MainAdmin
          user={users[activeUserIdx] ? users[activeUserIdx] : userChanges}
          userChanges={userChanges}
          userErrors={userErrors}
          back={toggleSelectAdminUser}
          submit={putAdmin}
          adminHandleInput={adminHandleInput}
          adminHandleBlur={adminHandleBlur}
          adminHandleSelect={adminHandleSelect}
          adminSetFile={adminSetFile}
          deleteAdmin={deleteAdmin}
          blockUser={blockUser}
          unBlockUser={unBlockUser}
          enabled
        />
      )}
    </Fragment>
  )
}

export default PageAdministration
