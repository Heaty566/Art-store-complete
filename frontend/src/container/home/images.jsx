import React from "react";
import { withRouter } from "react-router-dom";

import config from "../../config/main.json";
import imageCreator from "../../components/imageCreator/imageCreator";
import {
  getImages,
  getImagesSearch,
  getImagesGenre
} from "../../service/imageService";
import { sliceItem } from "../../utils/sliceItem";

class Images extends imageCreator {
  state = {
    products: [],
    currentPage: 0
  };

  setUpImages = async (value = {}) => {
    if (value.genreId) {
      const { data } = await getImagesGenre(value.genreId);
      return data;
    } else if (value.search) {
      const { data } = await getImagesSearch(value.search);
      return data;
    } else {
      const { data } = await getImages();
      return data;
    }
  };

  async componentDidMount() {
    const { params } = this.props.match;

    this.setState({ products: await this.setUpImages(params) });
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.match.url !== this.props.match.url) {
      const { params } = this.props.match;

      this.setState({
        products: await this.setUpImages(params),
        currentPage: 0
      });
    }
  }

  render() {
    const { products, currentPage } = this.state;
    const images = products || [];
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

export default withRouter(Images);
