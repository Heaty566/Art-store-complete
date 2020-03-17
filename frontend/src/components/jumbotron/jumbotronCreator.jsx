import React, { Component } from "react";
import "./jumbotronCreator.scss";

class JumbotronCreator extends Component {
  state = {
    slices: [],
    currentSlice: 0,

    interval: ""
  };

  componentDidMount = () => {
    const { slices } = this.props;
    let { transform, currentSlice } = this.state;
    const interval = setInterval(() => {
      if (currentSlice > slices.length - 1) currentSlice = 0;

      this.setState({ currentSlice, transform });
      currentSlice++;
    }, 5000);
    this.setState({ slices, currentSlice, transform, interval });
  };

  componentWillUnmount = () => {
    const { interval } = this.state;
    clearInterval(interval);
  };

  handleOnClickSlice = index => {
    let { currentSlice } = this.state;
    const { interval } = this.state;
    currentSlice = index;

    clearInterval(interval);
    this.setState({ currentSlice });
  };

  render() {
    const { slices, currentSlice } = this.state;

    const style = {
      opacity: "1",
      transition: "1s ease-in-out"
    };

    return (
      <div className="jumbotron__container">
        <ul className="sliceShow__container sliceShow__container-desktop">
          {slices.map((item, index) => (
            <li key={item.desktop} style={currentSlice === index ? style : {}}>
              <img src={item.desktop} alt="slice" />
            </li>
          ))}
        </ul>

        <ul className="sliceShow__container sliceShow__container-mobile">
          {slices.map((item, index) => (
            <li key={item.mobile} style={currentSlice === index ? style : {}}>
              <img src={item.mobile} alt="slice" />
            </li>
          ))}
        </ul>

        <ul className="indicator__container">
          {slices.map((item, index) => (
            <li
              key={item.desktop}
              className={index === currentSlice ? "indicator__current" : ""}
              onClick={() => this.handleOnClickSlice(index)}
            >
              <span></span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default JumbotronCreator;
