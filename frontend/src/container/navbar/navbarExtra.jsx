import React from "react";

import NavbarCreator from "../../components/navbar/navbarCreator";
import { getGenres } from "../../service/genreService";

class NavbarExtra extends NavbarCreator {
  state = {
    genres: []
  };

  async componentDidMount() {
    const { data } = await getGenres();

    this.setState({ genres: data });
  }

  render() {
    const { genres } = this.state;

    return <React.Fragment>{this.renderBtnList(genres)}</React.Fragment>;
  }
}

export default NavbarExtra;
