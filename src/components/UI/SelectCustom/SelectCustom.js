import React, { useState } from "react"
import "./selectCustom.scss"

const SelectCustom = ({
  title,
  name,
  activeValue,
  options = [],
  handleChange,
}) => {
  const activeTitle = options.filter((item) => item.name === activeValue)[0]
    .title
  const [visible, setVisible] = useState(false)
  const [input, setInput] = useState(activeTitle)
  const handleInput = (item) => {
    setInput(item.title)
    handleChange({ name, value: item.name })
    setVisible(!visible)
  }
  return (
    <label className="label-select-custom">
      <span className="label-text label-text-active">
        {title.charAt(0).toUpperCase()}
        {title.substr(1)}
      </span>
      <div className="custom-select" name={name}>
        <div
          className={
            visible ? "select-selected select-arrow-active" : "select-selected"
          }
          onClick={() => setVisible(!visible)}
        >
          {input}
        </div>
        <ul className={visible ? "select-items" : "select-items select-hide"}>
          {options.map((item) => (
            <li key={item.name} onClick={() => handleInput(item)}>
              {item.title}
            </li>
          ))}
        </ul>
      </div>
    </label>
  )
}

export default SelectCustom
