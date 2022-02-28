import { interpret, EventObject, StateMachine, StateSchema } from "xstate";
import { spawnBehavior  } from "xstate/lib/behaviors";

export * from "./render-implement";
export * from "./render-machine";

export type Renderer = StateMachine<unknown, StateSchema, EventObject, any>;
export type Controller = StateMachine<unknown, unknown, EventObject, any>;

export const register = <T extends Renderer, P extends Controller>(
  renderer: T,
  controller: P
) => {
  return () => {
    interpret(renderer).start();
  };
};
