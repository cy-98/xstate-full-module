import { createMachine, ActorRefFrom } from "xstate";
import { Action } from "../../types/action";

export type DollarsActor = ActorRefFrom<typeof dollarsMachine>;
export const dollarsMachine = createMachine<
  {
    actions: unknown[];
  },
  | {
      type: "ACTION";
      data: Action;
    }
  | {
      type: "CLOSE";
    }
>(
  {
    id: "dollars",
    context: { actions: [] },
    initial: "before",
    on: {
      ACTION: {
        actions: "assignAction",
      },
    },
    states: {
      before: {
        always: "idle",
      },
      idle: {},
      block: {},
      update: {},
      close: {},
    },
  },
  {
    actions: {
      assignAction(context, event) {
        if (event.type === "ACTION") {
          return { ...context, actions: [...context.actions, event.data] };
        }
        return { ...context };
      },
    },
  }
);
