import React from "react";
import "./App.css";

function App() {
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
            <input name="age"></input>
          </div>
          <div className="formContainer">
            <p>Your sex:</p>
            <div className="selectors">
              <div className="selector">
                <span>Male</span>
              </div>
              <div className="selector">
                <span>Female</span>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div id="right" className="container">
        <section>
          <span>You have only:</span>
        </section>
        <section>
          <h1>500,000,000</h1>
        </section>
        <section>
          <p>Breaths left in your futile existence.</p>
          <p>Use them wisely.</p>
        </section>
      </div>
    </div>
  );
}

export default App;
