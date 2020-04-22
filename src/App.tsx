import React, { useState, useRef, useEffect } from "react";
import BreathsLeft from "./BreathsLeft";
import useBreaths from "./breathsState";
import "./App.css";

type Sex = "male" | "female";
const scrollToRef = (ref: React.MutableRefObject<any>) =>
  window.scrollTo(0, ref.current.offsetTop);

export default function App() {
  const [sex, setSex] = useState("");
  const [age, setAge] = useState<number | undefined>(undefined);
  const { breaths, setBreaths, decrement } = useBreaths();

  const maleSelected = sex === "male";
  const femaleSelected = sex === "female";

  const myRef = useRef(null);
  const executeScroll = () => scrollToRef(myRef);

  useEffect(() => {
    if (breaths) {
      decrement();
      executeScroll();
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("Hello?");
      decrement();
    }, 3000);
    return () => clearTimeout(timer);
  });

  return (
    <div className="App">
      <div id="left" className="container">
        <section>
          <h1>
            How many breaths left before you <em>die?</em>
          </h1>
        </section>
        <section>
          <p>
            Enter your details into our friendly calculator and grasp the
            reality of your impending demise.
          </p>
        </section>
        <form>
          <div className="formContainer">
            <p>Your age:</p>
            <input
              name="age"
              type="number"
              onChange={(e) => {
                setAge(parseInt(e.target.value));
              }}
            ></input>
          </div>
          <div className="formContainer">
            <p>Your sex:</p>
            <div className="selectors">
              <div
                className={`selector ${maleSelected ? "selected" : ""}`}
                onClick={() => {
                  setSex("male");
                  const breathsLeft = calculateBreaths("male", age);
                  setBreaths(breathsLeft);
                  executeScroll();
                }}
              >
                <span>Male</span>
              </div>
              <div
                className={`selector ${femaleSelected ? "selected" : ""}`}
                onClick={() => {
                  setSex("female");
                  const breathsLeft = calculateBreaths("female", age);
                  setBreaths(breathsLeft);
                  executeScroll();
                }}
              >
                <span>Female</span>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div id="right" className="container" ref={myRef}>
        <BreathsLeft breaths={breaths} key={sex} />
      </div>
    </div>
  );
}

function calculateBreaths(sex: "" | Sex, age?: number): number | null {
  if (sex === "" || age === undefined) return null;
  const BREATHS_PER_YEAR = 8409600;
  const LIFE_EXPECTANCY = {
    male: 80.5,
    female: 84.6,
  };
  const yearsLeft = LIFE_EXPECTANCY[sex] - age;
  const breathsLeft = yearsLeft * BREATHS_PER_YEAR;
  return breathsLeft;
}
