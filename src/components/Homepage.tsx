import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  Link,
} from "react-router-dom";
import User from "./User";
import UserProfile from "./UserProfile";
import NavBar from "./NavBar/NavBar";
import HomepageBanner from "../../assets/images/homepage_banner.svg";
import "../../static/styles/Homepage.scss";
import ImageModal from "./ImageModal/ImageModal";

const Homepage = () => {
  const renderHomepage = () => {
    return <div></div>;
  };

  return (
    <Router>
      <NavBar current={window.location.pathname} />
      <Switch>
        <Route exact path="/" render={renderHomepage} />
        <Route path="/user" component={User} />
        <Route path="/profile" component={UserProfile} />
        <Route path="/img" component={ImageModal} />
        <Route render={() => <h1>404: page not found</h1>} />
      </Switch>
    </Router>
  );
};

export default Homepage;
