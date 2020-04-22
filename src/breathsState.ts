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

        return {
          lastTime: currentTime,
          breaths: currentState.breaths - breathsDelta,
        };
      }),
  };
};

export default useBreaths;
