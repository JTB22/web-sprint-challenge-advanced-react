import React from "react";
import axios from "axios";

// Suggested initial states
const initialMessage = "";
const initialEmail = "";
const initialSteps = 0;
const initialIndex = 1; // the index the "B" is at

const initialState = {
  message: initialMessage,
  email: initialEmail,
  index: initialIndex,
  steps: initialSteps,
};

export default class AppClass extends React.Component {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.
  constructor() {
    super();
    this.state = initialState;
  }

  placeGrid = () => {};

  getXY = () => {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.

    const y = Math.ceil(this.state.index / 3);
    const x = this.state.index % 3 === 0 ? 3 : this.state.index % 3;

    return { x, y };
  };

  getXYMessage = () => {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
    const { x, y } = this.getXY();
    return `Coordinates (${x}, ${y})`;
  };

  reset = () => {
    // Use this helper to reset all states to their initial values.

    this.setState(initialState);
  };

  getNextIndex = (direction) => {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.

    const { x, y } = this.getXY();

    switch (direction) {
      case "left":
        x === 1
          ? this.setState({ message: "You can't move left" })
          : this.setState({
              message: "",
              index: this.state.index - 1,
              steps: this.state.steps + 1,
            });
        break;
      case "up":
        y === 1
          ? this.setState({ message: "You can't move up" })
          : this.setState({
              message: "",
              index: this.state.index - 3,
              steps: this.state.steps + 1,
            });
        break;
      case "right":
        x === 3
          ? this.setState({ message: "You can't move right" })
          : this.setState({
              message: "",
              index: this.state.index + 1,
              steps: this.state.steps + 1,
            });
        break;
      case "down":
        y === 3
          ? this.setState({ message: "You can't move down" })
          : this.setState({
              message: "",
              index: this.state.index + 3,
              steps: this.state.steps + 1,
            });
        break;
      default:
        break;
    }

    return;
  };

  move = (evt) => {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.

    this.getNextIndex(evt.target.id);
    console.log(this.state);
  };

  onChange = (evt) => {
    // You will need this to update the value of the input.

    this.setState({ email: evt.target.value });
  };

  onSubmit = (evt) => {
    // Use a POST request to send a payload to the server.

    evt.preventDefault();
    axios
      .post("http://localhost:9000/api/result", {
        x: this.getXY().x,
        y: this.getXY().y,
        steps: this.state.steps,
        email: this.state.email,
      })
      .then((res) => {
        this.setState({ message: res.data.message });
      })
      .catch((err) => this.setState({ message: err.message }));
  };

  render() {
    console.log(this.state);
    const { className } = this.props;
    const { message, index, steps } = this.state;

    console.log(this.getXY());
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">{this.getXYMessage()}</h3>
          <h3 id="steps">You moved {steps} times</h3>
        </div>
        <div id="grid">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
            <div
              key={idx}
              className={`square${idx === index - 1 ? " active" : ""}`}
            >
              {idx === 4 ? "B" : null}
            </div>
          ))}
        </div>
        <div className="info">
          <h3 id="message">{message}</h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={this.move}>
            LEFT
          </button>
          <button id="up" onClick={this.move}>
            UP
          </button>
          <button id="right" onClick={this.move}>
            RIGHT
          </button>
          <button id="down" onClick={this.move}>
            DOWN
          </button>
          <button id="reset" onClick={this.reset}>
            reset
          </button>
        </div>
        <form onSubmit={this.onSubmit}>
          <input
            id="email"
            type="email"
            placeholder="type email"
            onChange={this.onChange}
          ></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    );
  }
}
