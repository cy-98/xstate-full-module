import { ActorRef, EventType, State } from "xstate";

export type ActionActor = ActorRef<
  { type: "TOGGLE" },
  | "start"
  | "done"
  | State<
      unknown,
      { type: "TOGGLE" },
      {
        states: {
          start: {};
          done: {};
        };
      }
    >
>;

export type ModuleActor = ActorRef<any, unknown>;
