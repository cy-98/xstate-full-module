import { createMachine, InterpreterFrom } from "xstate";
import { Action } from "../../types/action";

export type GiftActor = InterpreterFrom<typeof giftMachine>;
export const giftMachine = createMachine<
  {},
  | {
      type: "FETCH";
    }
  | {
      type: "";
    }
>(
  {
    id: "gift",
    initial: "idle",
    states: {
      idle: {
        on: {},
      },
    },
  },
  {
    actions: {},
  }
);
