import { ActorRefFrom, Behavior } from "xstate";

export type AgeActor = ActorRefFrom<typeof fromToggle>;

export const fromToggle: Behavior<{ type: "PLAY" }, "done" | "start"> = {
  initialState: "done",
  transition(state, event) {
    const e = typeof event === "string" ? event : event.type;
    if (e !== "PLAY") return state;
    return state === "done" ? "start" : "done";
  },
};
