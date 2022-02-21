import { createElement } from "react";
import { createModel } from "xstate/lib/model";
import { ErrorView } from "../components/Error/Error";
import { renderDOM, RenderImplement } from "./render-implement";

export const renderer = createModel({
  root: {} as HTMLElement,
  currentView: createElement(ErrorView),
  renderImplement: renderDOM as RenderImplement,
}).createMachine({
  initial: "load",
  states: {
    load: {
      entry: ({ root, currentView, renderImplement }) => {
        renderImplement(currentView, root);
      },
    },
  },
});
