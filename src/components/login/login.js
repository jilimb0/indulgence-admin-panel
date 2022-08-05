import React, { Component } from "react"
import "./login.scss"
import logo from "./img/Logo.webp"
import Input from "../UI/Input/Input"

export default class Login extends Component {
  state = {
    form: {
      login: "",
      password: "",
    },
    errors: {
      login: "",
      password: "",
    },
  }

  handleInput = (e) => {
    const { name, value } = e.currentTarget
    this.setState(({ form, errors }) => ({
      form: { ...form, [name]: value },
      errors: { ...errors, [name]: false },
    }))
  }

  isNotEmptyValue = (name, value) => {
    if (!value.trim()) {
      this.setState(({ errors }) => ({
        errors: {
          ...errors,
          [name]: "Поле не должно быть пустым",
        },
      }))
      return false
    }
    return true
  }

  validateForm = (name, value) => {
    const isEmpty = this.isNotEmptyValue(name, value)
    return isEmpty
  }

  handleBlur = (e) => {
    const { value, name } = e.currentTarget
    this.validateForm(name, value)
  }

  submit = (e, dispatch) => {
    e.preventDefault()
    const { eLogin, ePassword } = this.state.errors
    if (!eLogin && !ePassword) {
      const { login, password } = this.state.form
      this.props.authorize(login, password)
    }
  }

  render() {
    const { form, errors } = this.state
    const { inputValue, handleInputPopup, sendPassRepair } = this.props

    return (
      <div className="main-login">
        <div className="wrap-content">
          <img className="main-login__logo" src={logo} alt="Logo" />
          <h1>Indulgence</h1>

          <form>
            <div id="form_login">
              <Input
                name="login"
                type="email"
                placeholder="Email"
                value={form.login}
                handleInput={this.handleInput}
                onBlur={this.handleBlur}
                error={errors.login}
              />
              <Input
                name="password"
                type="password"
                id="password"
                value={form.password}
                handleInput={this.handleInput}
                onBlur={this.handleBlur}
                x3
                placeholder="Password"
                error={errors.password}
              />
              <button className="submit" label="Login" onClick={this.submit}>
                Login
              </button>

              <div
                className="recover-password"
                onClick={(login, recover) => {
                  login = document.getElementById("form_login").style
                  recover = document.getElementById("form_recover").style

                  login.display = "none"
                  recover.display = "grid"
                }}
              >
                Forgot your password?
              </div>
            </div>

            <div id="form_recover">
              <div
                className="popup_back"
                onClick={(login, recover) => {
                  login = document.getElementById("form_login").style
                  recover = document.getElementById("form_recover").style

                  login.display = "block"
                  recover.display = "none"
                }}
              ></div>
              <div className="text">
                Enter your email so <br />
                that we send your password to it:
              </div>
              <Input
                type="email"
                name="email"
                placeholder="Your email"
                value={inputValue}
                onChange={handleInputPopup}
              />
              <div className="submit_block">
                <button
                  className="submit"
                  label="Send password"
                  onClick={(event) => {
                    event.preventDefault()
                    sendPassRepair(inputValue)
                  }}
                >
                  Send password
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
