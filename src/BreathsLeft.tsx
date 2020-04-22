import React from "react";
import Fade from "react-reveal/Fade";
import animationData from "./lungs.json";
import { useLottie, Lottie } from "react-lottie-hook";

export default function BreathsLeft({ breaths }: { breaths: number | null }) {
  const [lottieRef] = useLottie({
    loop: true,
    renderer: "svg",
    rendererSettings: {
      progressiveLoad: false,
    },
    animationData,
    speed: 0.5,
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
        <Fade key={0}>
          <div className="breathsInnerContainer">
            <section>
              <span>You have only:</span>
            </section>
            <h1>{breaths.toLocaleString()}</h1>
            <section>
              <p id="sadWords">breaths left in your futile existence.</p>
              <p>Use them wisely.</p>
            </section>
          </div>
        </Fade>
        <Lottie className="lottieContainer" lottieRef={lottieRef} />
      </div>
    );
  }

  return (
    <Fade key={breaths}>
      <h1>Smart arse.</h1>
    </Fade>
  );
}
