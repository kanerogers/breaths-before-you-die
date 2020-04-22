import createPersistedState from "use-persisted-state";
const useBreathState = createPersistedState("breathsBeforeYouDie");

const BREATHS_PER_SECOND = 0.3;

interface BreathState {
  lastTime: number;
  breaths: number | null;
}

const useBreaths = () => {
  const [breathState, setBreathState] = useBreathState<BreathState>({
    lastTime: new Date().getTime(),
    breaths: null,
  });

  return {
    breaths: breathState.breaths,
    setBreaths: (breaths: number | null) => {
      if (breaths)
        window.document.title = `You have ${breaths.toLocaleString()} breaths left.`;
      setBreathState({
        lastTime: new Date().getTime(),
        breaths,
      });
    },
    decrement: () =>
      setBreathState((currentState) => {
        if (!currentState.breaths) return currentState;
        const currentTime = new Date().getTime();
        const timeDeltaInSeconds = (currentTime - currentState.lastTime) / 1000;
        const breathsDelta = Math.round(
          timeDeltaInSeconds * BREATHS_PER_SECOND
        );
        const breaths = currentState.breaths - breathsDelta;

        window.document.title = `You have ${breaths.toLocaleString()} breaths left.`;

        return {
          lastTime: currentTime,
          breaths,
        };
      }),
  };
};

export default useBreaths;
