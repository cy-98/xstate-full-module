import { ActorRef, State } from "xstate";

export type ActionActor = ActorRef<
  { type: "PLAY" },
  | "start"
  | "done"
  | State<
      unknown,
      { type: "PLAY" },
      {
        states: {
          start: {};
          done: {};
        };
      }
    >
>;

export type ModuleActor = ActorRef<any, unknown>;
