import React from "react";
import logo from "./logo.svg";
import "./App.css";

const sound = {
  Q: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
  W: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
  E: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
  A: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
  S: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
  D: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
  Z: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
  X: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
  C: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
};

const keyCodes = {
  Q: 81,
  W: 87,
  E: 69,
  A: 65,
  S: 83,
  D: 68,
  Z: 90,
  X: 88,
  C: 67,
};

const audioName = {
  Q: "Heater 1",
  W: "Heater 2",
  E: "Heater 3",
  A: "Heater 4",
  S: "Clap",
  D: "Open HH",
  Z: "Kick n Hat",
  X: "Kick",
  C: "Closed HH",
};

// const audioName = {
//   Q: "Q",
//   W: "W",
//   E: "E",
//   A: "A",
//   S: "S",
//   D: "D",
//   Z: "Z",
//   X: "X",
//   C: "C",
// };
class App extends React.Component {
  render() {
    return (
      <div className="App">
        <DrumPad />
      </div>
    );
  }
}

class DrumPad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keys: ["Q", "W", "E", "A", "S", "D", "Z", "X", "C"],
      text: "hola",
      keyPressed: false,
    };
    this.displayClipName = this.displayClipName.bind(this);
    this.handleKeyPress2 = this.handleKeyPress2.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress2);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress2);
  }
  handleKeyPress2(event) {
    for (let playKey in keyCodes) {
      if (event.keyCode === keyCodes[playKey]) {
        this.setState({ text: audioName[playKey], keyPressed: true });
      }
    }
  }

  displayClipName(name) {
    this.setState({
      text: name,
    });
  }

  render() {
    var buttons = this.state.keys.map((e) => (
      <DrumKey
        playKey={e}
        keyCode={keyCodes[e]}
        updateDisplay={this.displayClipName}
      />
    ));
    return (
      <div id="drum-machine">
        {/* <div id="display">
          {this.state.keyPressed && <p>{this.state.text}</p>}
          {!this.state.keyPressed && <p>default</p>}
        </div> */}
        <div id="display">
          <p>{this.state.text}</p>
        </div>
        {/* <DisplayKey id="display" /> */}
        <div id="buttons">
          {buttons}
          {/* <DisplayKey /> */}
        </div>
      </div>
    );
  }
}

class DrumKey extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pressed: false };
    this.playSound = this.playSound.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress);
  }
  handleKeyPress(e) {
    if (e.keyCode === this.props.keyCode) {
      this.playSound();
      this.setState({ pressed: true });
    }
  }
  playSound(e) {
    // let audio = new Audio(sound[this.props.playKey]);
    // audio.play();
    const sound = document.getElementById(this.props.playKey);
    sound.currentTime = 0;
    sound.play();
    this.setState({ pressed: true });
    this.props.updateDisplay(audioName[this.props.playKey]);
  }

  render() {
    // if (this.state.pressed) {
    //   var displayMessage = audioName[this.props.playKey];
    // } else {
    //   var displayMessage = "None";
    // }
    return (
      <div
        id={"key_" + this.props.playKey}
        onClick={this.playSound}
        className="drum-pad"
      >
        <audio
          className="clip"
          id={this.props.playKey}
          src={sound[this.props.playKey]}
        ></audio>
        {this.props.playKey}
        {/* <div>{displayMessage}</div> */}
      </div>

      // <div id={"key_" + this.props.playKey} className="drum-pad">
      //   <button onClick={this.playSound}>{this.props.playKey}</button>
      // </div>
    );
  }
}

// class DisplayKey extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { text: "None" };
//     this.handleKeyPress3 = this.handleKeyPress3.bind(this);
//   }
//   componentDidMount() {
//     document.addEventListener("keydown", this.handleKeyPress3);
//   }
//   componentWillUnmount() {
//     document.removeEventListener("keydown", this.handleKeyPress3);
//   }
//   handleKeyPress3(event) {
//     for (let playKey in keyCodes) {
//       if (event.keyCode === keyCodes[playKey]) {
//         this.setState({ text: audioName[playKey] });
//       }
//     }
//   }
//   render() {
//     return <p>{this.state.text}</p>;
//   }
// }

export default App;
