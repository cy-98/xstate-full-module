import { waitFor } from "xstate/lib/waitFor";
import { Action } from "../types/action";
import { isString } from "./../utils/index";
import { ActorRefFrom, assign, createMachine } from "xstate";
import { ActionActor, ModuleActor } from "../types/actor";

export type CenterActor = ActorRefFrom<typeof centerMachine>;
export const centerMachine = createMachine<
  {
    currentAction: Action | undefined;
    actions: Action[]; // stream
    actors: Array<ActionActor>;
    modules: Array<ModuleActor>;
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
    id: "controller",
    context: { actions: [], currentAction: undefined, actors: [], modules: [] },
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
      idle: {
        always: {
          target: "consume",
          cond: "isActionWaiting",
        },
        on: {
          ACTION: {
            target: "consume",
            actions: "assignAction",
          },
        },
      },
      // 可插入
      consume: {
        entry: assign(({ actions }) => {
          const [current, ...rest] = actions;
          return {
            actions: rest,
            currentAction: current,
          };
        }),
        invoke: {
          id: "consumeService",
          src: "consume",
          onDone: [
            { target: "close", cond: "isCloseActionWaiting" },
            { target: "update", cond: "isUpdateActionWaiting" },
            { target: "consume", cond: "isActionWaiting", internal: false },
            { target: "idle" },
          ],
        },
      },
      update: {
        invoke: {
          id: "updateService",
          src: "updateService",
          onDone: [
            {
              target: "consume",
              cond: "isActionWaiting",
            },
            { target: "idle" },
          ],
        },
      },
      close: {},
    },
  },
  {
    guards: {
      isActionWaiting: ({ actions }) => actions.length > 0,
      isCloseActionWaiting: ({ actions: [action] }) =>
        action?.actor === "close",
      isUpdateActionWaiting: ({ actions: [action] }) =>
        action?.actor === "update",
    },
    services: {
      consume({ currentAction, actors }) {
        let actor;
        if (!currentAction) return Promise.resolve();

        actor = isString(currentAction.actor)
          ? actors.find(({ id }) => id === currentAction.actor)
          : currentAction.actor;

        if (!actor) return Promise.resolve("no actor found"); // if development throw new Error("no actor found");

        actor.send({ type: "TOGGLE" });

        return waitFor(
          actor,
          (state) =>
            isString(state) ? state === "done" : state.matches("done"),
          { timeout: Infinity }
        );
      },
    },
    actions: {
      assignAction: assign((context, event) => {
        return event.type === "ACTION"
          ? {
              ...context,
              actions: [...context.actions, event.data].sort(
                (a, b) => a.priority - b.priority
              ),
            }
          : { ...context };
      }),
    },
  }
);
