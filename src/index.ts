import { fetchNewCard, fetchOwnCards } from "./services/fetchcard";
import { View } from "./components/View/View";
import { Entry } from "./components/View/Entry";
import { interpret } from "xstate";
import { cardCollection } from "./contorllers/card-collection";
import { renderer } from "./runtime";
import { ErrorView } from "./components/Error/Error";
import "./components/tailwind.css";

const machine = renderer.withContext({
  ...renderer.context,
  controller: cardCollection
    .withConfig({
      services: {
        fetchOwnCards,
        fetchNewCard,
      }
    })
    .withContext({
      ...cardCollection.context,
      frames: {
        ready: [View],
        collecting: [Entry],
      },
    }),
  root: document.querySelector("#app"),
});

interpret(machine).start();
