import { createElement } from "react";
import { interpret } from "xstate";
import { View } from "./components/View/View";
import { renderer, renderDOM } from "./runtime";

const machine = renderer.withContext({
  currentView: createElement(View),
  renderImplement: renderDOM,
  root: document.querySelector("#app"),
});

interpret(machine)
  .onTransition(() => {})
  .start();
