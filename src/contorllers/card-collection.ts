import { FunctionComponent, ReactNode } from "react";
import {
  assign,
  createSchema,
  DoneEvent,
  DoneEventObject,
  DoneInvokeEvent,
} from "xstate";
import { createModel } from "xstate/lib/model";
import { Card, fetchOwnCards } from "../services/fetchcard";

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
    schema: {
      context: model.initialContext,
    },
    initial: "ready",
    states: {
      ready: {
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
      fetchOwnCards: () => new Promise(r => r(1)),
    },
  }
);
