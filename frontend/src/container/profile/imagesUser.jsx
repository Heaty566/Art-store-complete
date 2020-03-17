import React from "react";

import config from "../../config/main.json";
import { userGetImages } from "../../service/imageUserService";
import ImageCreator from "../../components/imageCreator/imageCreator";
import { connect } from "../../stores/connect/global";
import { sliceItem } from "../../utils/sliceItem";

class ImagesUser extends ImageCreator {
  state = {
    images: [],
    currentPage: 0
  };

  async componentDidMount() {
    const { user } = this.props;
    if (user.token) {
      const result = await userGetImages(user.token);
      if (!result.error) {
        this.setState({ images: result.data });
      }
    }
  }

  async componentDidUpdate(prevProps) {
    const { user } = this.props;
    if (user.token && !prevProps.user.token) {
      const result = await userGetImages(user.token);
      if (!result.error) {
        this.setState({ images: result.data });
      }
    }
  }

  render() {
    const { images, currentPage } = this.state;
    const { imageUrl } = config.home.product;

    const filter = sliceItem(images, currentPage, 8);

    return (
      <React.Fragment>
        {this.renderImages(filter, imageUrl)}
        {this.renderPagination(images.length, currentPage, 8)}
      </React.Fragment>
    );
  }
}

export default connect(ImagesUser);
