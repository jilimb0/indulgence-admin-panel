import React from "react"
import { Router, Route, Switch, Redirect } from "react-router-dom"
import { history } from "../../services/history"

import Login from "../login/loginContainer"
import HomePage from "../homePage/homePageContainer"
import { PrivateRoute } from "../privateRoute/privateRoute"
import SettingsDetails from "../settingsDetails/settingsDetailsContainer"
import PageAdministration from "../ADMIN/pageAdministration/pageAdministrationContainer"
import MessageConfirm from "../messageConfirm/messageConfirmContainer"
import PageUser from "../USERS/pageUser/pageUserContainer"
import PageMessage from "../MESSAGES/pageMessage/pageMessageContainer"
import PagePublication from "../PUBLICATIONS/pagePublication/pagePublicationContainer"
import PopupInfo from "../popupInfo/popupInfoContainer"

const App = () => {
  return (
    <div className="main-container">
      <div className="wrap-content">
        <Router history={history}>
          <MessageConfirm />
          <PopupInfo />
          <Switch>
            <PrivateRoute exact path="/" component={HomePage} />
            <PrivateRoute
              exact
              path="/administration"
              component={PageAdministration}
            />
            <PrivateRoute exact path="/users" component={PageUser} />
            <PrivateRoute exact path="/messages" component={PageMessage} />
            <PrivateRoute
              exact
              path="/publications"
              component={PagePublication}
            />
            <PrivateRoute exact path="/settings" component={SettingsDetails} />
            <Route path="/login" component={Login} />
            <Redirect from="*" to="/" />
          </Switch>
        </Router>
      </div>
    </div>
  )
}

export default App
