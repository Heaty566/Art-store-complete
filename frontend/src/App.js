import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "./App.scss";

import ProtectRouter from "./components/protectedRouter/protectRoute";
import PrivateRoute from "./components/protectedRouter/privateRoute";

import NavbarMain from "./container/navbar/navbarMain";
import NavbarExtra from "./container/navbar/navbarExtra";
import Home from "./container/home/home";
import Login from "./container/login/login";
import Register from "./container/register/register";
import FormImage from "./container/formImage/formImage";
import ImageShow from "./container/imageShow/imageShow";
import Profile from "./container/profile/profile";
import Order from "./container/order/order";
import Invalid from "./container/order/invalid";

function App() {
  return (
    <div className="App">
      <div className="navbar__container">
        <div className="navbar__container-main">
          <NavbarMain />
        </div>
        <div className="navbar__container-extra">
          <NavbarExtra />
        </div>
      </div>
      <div className="main__container">
        <Switch>
          <ProtectRouter path="/user/login" component={Login} />
          <ProtectRouter path="/user/register" component={Register} />
          <PrivateRoute path="/user/profile" component={Profile} />
          <PrivateRoute path="/user/image/addImage" component={FormImage} />
          <PrivateRoute
            path="/user/image/update/:imageId"
            component={FormImage}
          />
          <Route path="/image/search/:search" component={Home} />
          <Route path="/image/genre/:genreId" component={Home} />
          <PrivateRoute path="/image/:imageId/order" component={Order} />
          <Route path="/invalid" component={Invalid} />
          <Route path="/image/:imageId" component={ImageShow} />
          <Route path="/image" component={Home} />
          <Redirect from="/" to="/image" />
        </Switch>
      </div>
    </div>
  );
}

export default App;
