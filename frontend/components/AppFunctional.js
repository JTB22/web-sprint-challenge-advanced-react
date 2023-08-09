import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

// Suggested initial states
const initialMessage = "";
const initialEmail = "";
const initialSteps = 0;
const initialIndex = 4; // the index the "B" is at

export default function AppFunctional(props) {
  const [message, setMessage] = useState(initialMessage);
  const [email, setEmail] = useState(initialEmail);
  const [index, setIndex] = useState(initialIndex);
  const [steps, setSteps] = useState(initialSteps);

  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.

  function getXY() {
    const x = (index % 3) + 1;
    const y = Math.floor(index / 3) + 1;

    return { x, y };
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
  }

  function getXYMessage() {
    const { x, y } = getXY();
    return `Coordinates (${x}, ${y})`;

    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
  }

  function reset() {
    setMessage(initialMessage);
    setEmail(initialEmail);
    setIndex(initialIndex);
    setSteps(initialSteps);

    // Use this helper to reset all states to their initial values.
  }

  function getNextIndex(direction) {
    const { x, y } = getXY();

    // console.log(x, y);

    switch (direction) {
      case "left":
        x === 1
          ? setMessage("You can't go left")
          : (setMessage(""), setIndex(index - 1), setSteps(steps + 1));
        break;
      case "up":
        y === 1
          ? setMessage("You can't go up")
          : (setMessage(""), setIndex(index - 3), setSteps(steps + 1));
        break;
      case "right":
        x === 3
          ? setMessage("You can't go right")
          : (setMessage(""), setIndex(index + 1), setSteps(steps + 1));
        break;
      case "down":
        y === 3
          ? setMessage("You can't go down")
          : (setMessage(""), setIndex(index + 3), setSteps(steps + 1));
        break;
      default:
        break;
    }

    return;
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
  }

  function move(evt) {
    // console.log(evt.target.id);
    getNextIndex(evt.target.id);
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
  }

  function onChange(evt) {
    setEmail(evt.target.value);
    // You will need this to update the value of the input.
  }

  function onSubmit(evt) {
    const { x, y } = getXY();
    evt.preventDefault();
    axios
      .post("http://localhost:9000/api/result", {
        x: x,
        y: y,
        steps: steps,
        email: email,
      })
      .then((res) => {
        setMessage(res.data.message);
        setEmail(initialEmail);
      })
      .catch((err) => {
        setMessage(err.response.data.message);
      }, []);
    // Use a POST request to send a payload to the server.
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">{getXYMessage()}</h3>
        <h3 id="steps">
          You moved {steps} {steps == 0 || steps > 1 ? "times" : "time"}
        </h3>
      </div>
      <div id="grid">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
          <div key={idx} className={`square${idx === index ? " active" : ""}`}>
            {idx === index ? "B" : null}
          </div>
        ))}
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={move}>
          LEFT
        </button>
        <button id="up" onClick={move}>
          UP
        </button>
        <button id="right" onClick={move}>
          RIGHT
        </button>
        <button id="down" onClick={move}>
          DOWN
        </button>
        <button id="reset" onClick={reset}>
          reset
        </button>
      </div>
      <form onSubmit={onSubmit}>
        <input
          id="email"
          type="email"
          placeholder="type email"
          onChange={onChange}
          value={email}
        ></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  );
}
