import { waitFor } from "xstate/lib/waitFor";
import { Action } from "../types/action";
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
        on: {
          ACTION: {
            target: "consume",
            actions: "assignAction",
          },
        },
      },
      // 可插入 可中断
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
            { target: "consume", cond: "isActionWaiting" },
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
      isCloseActionWaiting: ({ actions: [action] }) => action?.key === "close",
      isUpdateActionWaiting: ({ actions: [action] }) =>
        action?.key === "update",
    },
    services: {
      consume({ currentAction, actors }) {
        console.log(actors);

        let actor;
        if (!currentAction) return Promise.resolve();
        if (typeof currentAction.actor === "string")
          actor = actors.find(({ id }) => id === currentAction.actor);
        if (!actor) return Promise.resolve("no actor found"); // if development throw new Error("no actor found");

        actor.send({ type: "PLAY" });
        return waitFor(actor, (state) => {
          return typeof state === "string"
            ? state === "done"
            : state.matches("done");
        });
      },
    },
    actions: {
      assignAction: assign((context, event) => {
        if (event.type === "ACTION") {
          return {
            ...context,
            actions: [...context.actions, event.data].sort(
              (a, b) => a.priority - b.priority
            ),
          };
        }
        return { ...context };
      }),
    },
  }
);
