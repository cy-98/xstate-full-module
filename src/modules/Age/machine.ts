import { ActorRefFrom, Behavior } from "xstate";

export type AgeActor = ActorRefFrom<typeof fromToggle>;

export const fromToggle: Behavior<{ type: "TOGGLE" }, "done" | "start"> = {
  initialState: "done",
  transition(state, event) {
    const e = typeof event === "string" ? event : event.type;
    if (e !== "TOGGLE") return state;
    return state === "done" ? "start" : "done";
  },
};
