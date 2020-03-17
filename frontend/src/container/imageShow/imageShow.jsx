import React from "react";
import { withRouter } from "react-router-dom";

import config from "../../config/main.json";
import ImageCreator from "../../components/imageCreator/imageCreator";
import { getImage } from "../../service/imageService";
import { getUserName } from "../../service/userService";
import { getGenre } from "../../service/genreService";
import Image from "../../components/imageShow/imageShow";

class ImageShow extends ImageCreator {
  state = {
    image: {}
  };

  async componentDidMount() {
    const { match, history } = this.props;
    const { data } = await getImage(match.params.imageId);
    if (!data) return history.push("/invalid");

    const { data: user } = await getUserName(data.authorId);
    const { data: genre } = await getGenre(data.genreId);
    data.author = user.name;
    data.genre = genre.name;

    this.setState({ image: data });
  }

  render() {
    const { image } = this.state;
    const { imageShow } = config;

    return (
      <div className="imageShow__container">
        <Image data={image} url={imageShow} />
      </div>
    );
  }
}

export default withRouter(ImageShow);
