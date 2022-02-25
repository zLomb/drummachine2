import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';

function App() {

  const bankOne = [
    {
      keyCode: 81,
      keyTrigger: "Q",
      id: "Heater-1",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
    },
    {
      keyCode: 87,
      keyTrigger: "W",
      id: "Heater-2",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"
    },
    {
      keyCode: 69,
      keyTrigger: "E",
      id: "Heater-3",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"
    },
    {
      keyCode: 65,
      keyTrigger: "A",
      id: "Heater-4",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"
    },
    {
      keyCode: 83,
      keyTrigger: "S",
      id: "Clap",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"
    },
    {
      keyCode: 68,
      keyTrigger: "D",
      id: "Open-HH",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"
    },
    {
      keyCode: 90,
      keyTrigger: "Z",
      id: "Kick-n'-Hat",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"
    },
    {
      keyCode: 88,
      keyTrigger: "X",
      id: "Kick",
      url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"
    },
    {
      keyCode: 67,
      keyTrigger: "C",
      id: "Closed-HH",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
    }
  ];

  const [power, setPower] = useState(false);
  const [disp, setDisp] = useState("");

  const updateDisplay = (newValue) => {
    setDisp(newValue);
  };

  const powerButton = () => {
    setPower(!power);
    setDisp("");
    const button = document.getElementById("power-btn");
    if (power === true) {
      button.style.backgroundColor = "#f01a50";
    } else {
      button.style.backgroundColor = "#2cdb58";
    }
  };

  return (
    <div className="container">
      <div className="row" id="drum-machine">
        <div className="col-xs-12 d-flex justify-content-center">
          <h1 id="title" className="d-flex align-items-center">Drum Machine</h1>
          <button
            id="power-btn"
            style={{ backgroundColor: "#f01a50" }}
            onClick={() => powerButton()}
          >
            On/Off
          </button>
        </div>
        <div className="col-xs-12 d-flex justify-content-center">
          <div id="display">{disp}</div>
        </div>
        <div className="col-xs-12 d-flex justify-content-center">
          <Soundboard
            soundlist={bankOne}
            power={power}
            update={updateDisplay}
          />
        </div>
      </div>
    </div>
  );
}

function Soundboard({ soundlist, power, update }) {
  const buttons = soundlist.map((sound, index) => {
    return (
      <DrumPad
        audio={sound.url}
        keycode={sound.keyCode}
        keytrigger={sound.keyTrigger}
        id={sound.id}
        power={power}
        key={index}
        update={update}
      />
    );
  });

  return <div id="soundboard">{buttons}</div>;
}

function DrumPad({ audio, keycode, keytrigger, id, power, update }) {
  const changeStyle = () => {
    const drumpad = document.getElementById(id);
    drumpad.style.backgroundColor = "white";
    drumpad.style.color = "black";
    drumpad.style.border = "none";
    setTimeout(() => restoreStyle(drumpad), 500);
  };

  const restoreStyle = (drumpad) => {
    drumpad.style.backgroundColor = "black";
    drumpad.style.color = "white";
    drumpad.style.border = "solid 2px white";
  };

  const playAudio = () => {
    const audio = document.getElementById(keytrigger);
    audio.play();
    update(id);
  };

  const handleClick = () => {
    if (power === true) {
      playAudio();
      changeStyle();
    }
  };

  const handleKeypress = (e) => {
    if (e.keyCode === keycode && power === true) {
      playAudio();
      changeStyle();
    }
  };

  useEffect(() => {
    document.addEventListener("keyup", handleKeypress);
    return () => {
      document.removeEventListener("keyup", handleKeypress);
    };
  });

  return (
    <div className="drum-pad" onClick={handleClick} id={id}>
      {keytrigger}
      <audio src={audio} id={keytrigger} className="clip" />
    </div>
  );
}


export default App;