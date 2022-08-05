import React, { useState } from "react"
import "./input.scss"
import eye from "./img/eye.svg"

const Input = ({
  name,
  type,
  labelImg,
  value = "",
  handleInput,
  placeholder,
  error,
  inputWidth,
  labelInpWidth,
  ...props
}) => {
  const [visible, setVisible] = useState(false)
  const [inpType, setInpType] = useState(type)
  return (
    <label className={"label-inp"} style={{ width: labelInpWidth }}>
      {type === "checkbox" ? (
        <span className="label-text" style={{ opacity: 1, color: "#8F95A1" }}>
          {placeholder}
        </span>
      ) : (
        <span
          className={!value ? "label-text" : "label-text label-text-active"}
        >
          {placeholder}
        </span>
      )}

      <input
        name={name}
        type={inpType}
        maxLength="30"
        placeholder={placeholder}
        value={value}
        onChange={(e) => handleInput(e)}
        className={type !== "text" ? `input input-${type}` : ""}
        {...props}
      />

      {type === "checkbox" && <span className="checkmark" />}
      {type === "password" && (
        <img
          src={eye}
          alt="eye"
          className="eyeIcon"
          style={visible ? { opacity: "1" } : { opacity: "0.2" }}
          onClick={() => {
            setVisible(!visible)
            !visible ? setInpType("text") : setInpType("password")
          }}
        />
      )}
      {error && <span className="input-error">{error}</span>}
    </label>
  )
}

export default Input
