import { ContextProvider } from "./context";
import { createElement } from "react";
import { createModel } from "xstate/lib/model";
import { render } from "react-dom";
import {
  StateMachine,
  EventObject,
  interpret,
} from "xstate";
import { RenderFrames } from "./../contorllers/card-collection";
import { ErrorView } from "../components/Error/Error";

const model = createModel(
  {
    root: {} as HTMLElement,
    currentView: createElement(ErrorView),
    controller: {} as StateMachine<any, any, EventObject, any>,
  },
  {
    events: {
      fetch: () => ({}),
    },
  }
);

export const renderer = model.createMachine({
  initial: "load",
  states: {
    // 配置层
    load: {
      entry: [
        ({ currentView, root, controller }) =>
          render(currentView, root, () => {
            const frames = controller.context.frames as RenderFrames;
            let curFrame: RenderFrames[number];

            interpret(controller)
              .onChange((context) => {
                if (!curFrame) return;
                const provider = ContextProvider(context);
                renderFrame(provider as unknown as "div", curFrame, root);
              })
              .onTransition((state) => {
                const key = Object.keys(frames).find((k) => state.matches(k));
                const frame = frames[key];
                const provider = ContextProvider(state.machine.context);
                renderFrame(provider as unknown as "div", frame, root);
              })
              .start();
          }),
      ],
    },
  },
});

function renderFrame(provider: string, frame, root, cb = () => {}) {
  return render(
    createElement(provider, {
      children: frame.map(createElement),
    }),
    root,
    cb
  );
}
