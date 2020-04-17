import React, { useState } from "react";
import "./App.css";
import Fade from "react-reveal/Fade";
import animationData from "./lungs.json";
import { useLottie, Lottie } from "react-lottie-hook";

type Sex = "male" | "female";

function BreathsLeft({ breaths }: { breaths: number | null }) {
  const [lottieRef, { isPaused, isStopped }, controls] = useLottie({
    segments: [0, 105],
    renderer: "svg",
    rendererSettings: {
      // preserveAspectRatio: "xMidYMid slice",
      progressiveLoad: false,
    },
    animationData,
  });

  if (!breaths) return null;

  if (breaths > 600000000) {
    return (
      <Fade key={breaths}>
        <h1>Seriously?</h1>
      </Fade>
    );
  }

  if (breaths > 0) {
    return (
      <div className="breathsContainer">
        <Fade key={breaths}>
          <div className="breathsInnerContainer">
            <section>
              <span>You have only:</span>
            </section>
            <section>
              <h1>{breaths.toLocaleString()}</h1>
            </section>
            <section>
              <p>Breaths left in your futile existence.</p>
              <p>Use them wisely.</p>
            </section>
          </div>
        </Fade>
        <Lottie lottieRef={lottieRef} />
      </div>
    );
  }

  return (
    <Fade key={breaths}>
      <h1>Smart arse.</h1>
    </Fade>
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

function App() {
  const [sex, setSex] = useState("");
  const [age, setAge] = useState<number | undefined>(undefined);

  const maleSelected = sex === "male";
  const femaleSelected = sex === "female";
  const breathsLeft = calculateBreaths(sex as Sex, age);

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
              onChange={(e) => setAge(parseInt(e.target.value))}
            ></input>
          </div>
          <div className="formContainer">
            <p>Your sex:</p>
            <div className="selectors">
              <div
                className={`selector ${maleSelected ? "selected" : ""}`}
                onClick={() => setSex("male")}
              >
                <span>Male</span>
              </div>
              <div
                className={`selector ${femaleSelected ? "selected" : ""}`}
                onClick={() => setSex("female")}
              >
                <span>Female</span>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div id="right" className="container">
        <BreathsLeft breaths={breathsLeft} key={breathsLeft || "empty"} />
      </div>
    </div>
  );
}

export default App;
