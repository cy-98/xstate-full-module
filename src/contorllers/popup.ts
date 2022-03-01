import { hasPopupRequest, Popup } from "./../services/popup";
import { DoneInvokeEvent } from "xstate";
import { createModel } from "xstate/lib/model";
import { Card } from "../services/fetchcard";

export type RenderFrames = Record<string, React.FC[]>;

const model = createModel(
  {
    // 数据模型
    data: {
      ownCards: [] as Card[],
      taskList: [],
      userInfo: [],
      invitedList: [],
      transactions: [],
      popupList: [],
    },
    // 场景
    frames: {
      ready: [],
      collected: [],
      redeem: [],
    } as RenderFrames,
  },
  {
    events: {
      SHARE: () => ({}),
      FETCH: () => ({}),
      CHECK: () => ({}),
    },
  }
);

export const popupActivity = model.createMachine(
  {
    id: "cardAct",
    initial: "collecting",
    type: "parallel",
    states: {
      popup: {
        initial: "idle",
        on: { CHECK: ".fetching" },

        states: {
          idle: {},
          fetching: {
            invoke: {
              src: "hasPopup",
              onDone: [
                {
                  target: "popup.age",
                  cond: (_, event: DoneInvokeEvent<Popup>) =>
                    event.type === "age",
                },
                {
                  target: "popup.version",
                  cond: (_, event: DoneInvokeEvent<Popup>) =>
                    event.type === "version",
                },
                {
                  target: "popup.receive",
                  cond: (_, event: DoneInvokeEvent<Popup>) =>
                    event.type === "receive",
                },
                {
                  target: "popup.bonus",
                  cond: (_, event: DoneInvokeEvent<Popup>) =>
                    event.type === "bonus",
                },
              ],
              onError: "..idle",
            },
          },
          popup: {
            states: {
              age: {
                invoke: {
                  src: 'ageDialogConfirm',
                  onDone: '..idle'
                }
              },
              version: {
                invoke: {
                  src: 'versionDialogConfirm',
                  onDone: '..idle'
                }
              },
              receive: {
                invoke: {
                  src: 'receiveDialogConfirm',
                  onDone: '..idle'
                }
              },
              bonus: {
                invoke: {
                  src: 'bonusDialogConfirm',
                  onDone: '..idle'
                }
              },
            },
          },
        },
      },

      activity: {
        initial: "collecting",
        states: {
          collecting: {
            on: { FETCH: { actions: "requireCard" } },
          },
          receiveAll: {
            on: { FETCH: { actions: "shareHaveAllCard" } },
          },
        },
      },
    },
  },
  {
    services: {
      hasPopup: () => {
        return new Promise(async (r) => {
          const popup = await hasPopupRequest();
          if (popup.type === "receive") {
            r(popup);
          }
        });
      },
    },
    actions: {
      requireCard: () => {
        alert("share link for requiring card");
      },
      shareHaveAllCard: () => {
        alert("I collected all cards hah");
      },
    },
  }
);
