import React from "react"
import "./StatusCircle.scss"

const StatusCircle = ({ enabled, isSettings = false }) => {
  return (
    <div
      className={
        enabled ? "status-circle status-active" : "status-circle status-blocked"
      }
      id={isSettings && "status-settings"}
    />
  )
}

export default StatusCircle
