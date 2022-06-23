import { createMachine, ActorRefFrom } from "xstate";
import { Action } from "../../types/action";

export type EduVideoActor = ActorRefFrom<typeof eduMachine>;
export const eduMachine = createMachine<
  {
    actions: unknown[];
  },
  | {
      type: "TOGGLE";
    }
  | {
      type: "PAUSE";
    }
>({
  id: "edu-video",
  context: { actions: [] },
  initial: "done",
  states: {
    done: {
      on: {
        TOGGLE: "start",
      },
    },
    start: {
      on: {
        TOGGLE: "done",
      },
      initial: "pause",
      states: {
        play: {},
        pause: {},
      },
    },
  },
});
