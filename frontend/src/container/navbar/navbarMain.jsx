import React from "react";

import { connect } from "../../stores/connect/global";
import config from "../../config/main.json";
import { getCookie } from "../../utils/cookie";
import { getImagesSearch, getImagesGenre } from "../../service/imageService";
import { getMe } from "../../service/userService";
import { getGenres } from "../../service/genreService";
import NavbarCreator from "../../components/navbar/navbarCreator";

class NavbarMain extends NavbarCreator {
  state = {
    genres: []
  };

  async componentDidMount() {
    const { data: genres } = await getGenres();

    this.setState({ genres });
  }

  async componentDidUpdate() {
    if (getCookie("x-auth-token") && !this.props.user.token) {
      const { data } = await getMe(getCookie("x-auth-token"));
      const { loginUser } = this.props;

      loginUser(getCookie("x-auth-token"), data);
    }
  }

  render() {
    const { navbarMain } = config.navbar;
    const { genres } = this.state;
    const { user, logoutUser } = this.props;
    return (
      <React.Fragment>
        {this.renderBrand(
          navbarMain.navbarBrand.urlImage,
          navbarMain.navbarBrand.label,
          navbarMain.navbarBrand.url
        )}
        {this.renderSearchBox(getImagesSearch)}
        {user.token
          ? this.renderUser(user.user, logoutUser)
          : this.renderBtnGroup(navbarMain.btnGroup)}

        {this.renderBurgerMenu(
          getImagesSearch,
          navbarMain.btnGroup,
          genres,
          logoutUser,
          getImagesGenre
        )}
      </React.Fragment>
    );
  }
}

export default connect(NavbarMain);
