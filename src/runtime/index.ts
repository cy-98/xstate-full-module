import { interpret, EventObject, StateMachine, StateSchema } from "xstate";

export * from "./render-implement";
export * from "./render-machine";

export type Renderer = StateMachine<unknown, StateSchema, EventObject, any>;
export type Controller = StateMachine<unknown, unknown, EventObject, any>;
