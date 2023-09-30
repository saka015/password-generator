import React, { useState, useCallback, useEffect, useRef } from "react";

const App = () => {
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [char, setChar] = useState(false);

  const [pswd, setPswd] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (number) str += "0123456789";
    if (char) str += "!@#$%^&*()_₹~{}[]`";

    for (let i = 1; i <= length; i++) {
      let charIndex = Math.floor(Math.random() * str.length);
      pass += str.charAt(charIndex);
    }

    setPswd(pass);
  }, [length, number, char, setPswd]);

  useEffect(() => {
    passwordGenerator();
  }, [length, number, char, passwordGenerator]);

  const copyToClipboard = useCallback(() => {
    passwordRef.current?.focus();
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,8);
    window.navigator.clipboard.writeText(pswd);
  }, [pswd]);

  return (
    <>
      <div className="p-4 text-center bg-white border main w-full max-w-md mx-auto shadow-sm  px-4 my-8 text-white bg-gary-400">
        <h1> PASSWORD GENERATOR</h1>
        <div className="my-4 flex shadow  overflow-hidden mb-4">
          <input
            type="text"
            value={pswd}
            ref={passwordRef}
            className="oultine-none w-full py-1 px-3 input"
            placeholder="Password"
            readOnly
          />
          <button
            onClick={copyToClipboard}
            className="bg-black p-2 text-white hover:bg-gray-700 shrink-0"
          >
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer "
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label htmlFor="">Length : {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={number}
              name=""
              id="numberInput"
              onChange={() => {
                setNumber((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
            <input
              type="checkbox"
              defaultChecked={char}
              name=""
              id="charInput"
              onChange={() => {
                setChar((prev) => !prev);
              }}
            />

            <label htmlFor="charInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
