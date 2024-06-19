// this is a password generator

import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8); //for length of  text
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  //useRef
  const passwordRef = useRef(null);

  const copytoClipBoard = useCallback(() => {
    passwordRef.current?.select();
    ``;
    window.navigator.clipboard.writeText(password);
  }, [password]);

  // password generator
  const passwordgenerator = useCallback(() => {
    //it only memoized
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  //run the function
  useEffect(() => {
    passwordgenerator();
  }, [length, numberAllowed, charAllowed, passwordgenerator]);
  return (
    <div className="card-body">
      <h1>Strong Password Generator</h1>
      <div className="section-1">
        {" "}
        <input type="text" value={password} readOnly ref={passwordRef}></input>
        <button className="copy-btn" onClick={copytoClipBoard}>
          Copy to Clipboard
        </button>
      </div>
      <div className="pass-length">
        <label>Password Length: {length}</label>
        <input
          type="range"
          min={6}
          max={100}
          value={length}
          onChange={(e) => {
            setLength(e.target.value);
          }}
        ></input>
      </div>
      <h2>Include:</h2>
      <div className="checkbox">
        <input
          type="checkbox"
          defaultChecked={numberAllowed}
          id="numberinput"
          onChange={() => {
            setNumberAllowed((prev) => !prev);
          }}
        ></input>
        <label htmlFor="numberInput">Numbers</label>
      </div>
      <div className="checkbox">
        <input
          type="checkbox"
          defaultChecked={charAllowed}
          id="charinput"
          onChange={() => {
            setCharAllowed((prev) => !prev);
          }}
        ></input>
        <label htmlFor="charInput">Character</label>
      </div>
    </div>
  );
}
export default App;
