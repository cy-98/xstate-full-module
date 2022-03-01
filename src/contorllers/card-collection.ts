import { FunctionComponent, ReactNode } from "react";
import { assign, DoneInvokeEvent, actions } from "xstate";
import { log } from "xstate/lib/actions";
import { createModel } from "xstate/lib/model";
import { Card } from "../services/fetchcard";

export type RenderFrames = Record<string, React.FC[]>;

const model = createModel({
  // 数据模型
  data: {
    ownCards: [] as Card[],
    taskList: [],
    userInfo: [],
    invitedList: [],
    transactions: [],
  },
  // 场景
  frames: {
    ready: [],
    collected: [],
    redeem: [],
  } as RenderFrames,
});

export const cardCollection = model.createMachine(
  {
    id: "cardAct",
    initial: "collecting",

    states: {
      collecting: {
        on: { FETCH: ".drawing" },
        always: [
          {
            target: "collected",
            cond: (ctx) => ctx.data.ownCards.length === 6,
          },
        ],
        invoke: {
          src: "fetchOwnCards",
          onDone: {
            actions: [
              assign({
                data({ data }, event: DoneInvokeEvent<Card[]>) {
                  return {
                    ...data,
                    ownCards: event.data,
                  };
                },
              }),
            ],
          },
        },
        initial: "idle",
        states: {
          idle: {
            always: [
              {
                target: "#cardAct.collected",
                cond: (ctx) => ctx.data.ownCards.length === 6,
              },
            ],
          },
          drawing: {
            invoke: {
              src: "fetchNewCard",
              onDone: {
                target: ["idle"],
                actions: [
                  assign({
                    data({ data }, event: DoneInvokeEvent<Card>) {
                      return data.ownCards.length !== 6
                        ? { ...data, ownCards: [...data.ownCards, event.data] }
                        : data;
                    },
                  }),
                ],
              },
            },
          },
        },
      },
      collected: {},
    },
  },
  {
    services: {
      fetchNewCard: () => new Promise<Card>((r) => r({} as Card)),
      fetchOwnCards: () => new Promise((r) => r([{} as Card])),
      popup: () => new Promise((r) => {
        console.log('popup')
      }),
    },
  }
);
