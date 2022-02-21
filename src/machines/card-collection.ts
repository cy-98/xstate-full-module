import { assign } from "xstate";
import { createModel } from "xstate/lib/model";

export const cardCollectionMachine =
  createModel({
    data: {
      ownCards: [],
      taskList: [],
      userInfo: [],
      invitedList: [],
      transactions: [],
    },
    frames: {},
  })
  .createMachine({
    initial: "ready",
    states: {
      ready: {
        data ({ data }) {},
        entry: () => assign(() => {

        })
      }
    },
  });
