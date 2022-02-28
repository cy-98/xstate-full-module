import { FunctionComponent, ReactNode } from "react";
import { assign, DoneInvokeEvent } from "xstate";
import { createModel } from "xstate/lib/model";
import { Card } from "../services/fetchcard";

export type RenderFrames = Record<string, React.FC[]>;

const model = createModel({
  render: (() => {}) as VoidFunction,
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
    collecting: [],
    redeem: [],
  } as RenderFrames,
});
export const cardCollection = model.createMachine(
  {
    initial: "playing",
    states: {
      playing: {
        initial: "silent",
        on: {
          fetch: [
            { target: ".drawing", cond: (ctx) => ctx.data.ownCards.length < 6 },
            { target: "collecting" },
          ],
        },
        states: {
          silent: {},
          drawing: {
            invoke: {
              src: "fetchNewCard",
              onDone: {
                target: 'silent',
                actions: [
                  assign({
                    data({ data }, event: DoneInvokeEvent<Card>) {
                      if (data.ownCards.length === 6) return data;
                      return {
                        ...data,
                        ownCards: [...data.ownCards, event.data],
                      };
                    },
                  }),
                ],
              },
            },
          },
        },
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
      },
      collecting: {},
    },
  },
  {
    services: {
      fetchNewCard: () => new Promise<Card>((r) => r({} as Card)),
      fetchOwnCards: () => new Promise((r) => r(1)),
    },
  }
);
