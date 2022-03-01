import { popupActivity } from './contorllers/popup';
import { fetchNewCard, fetchOwnCards } from "./services/fetchcard";
import { View } from "./components/View/View";
import { Entry } from "./components/View/Entry";
import { interpret } from "xstate";
import { cardCollection } from "./contorllers/card-collection";
import { renderer } from "./runtime";
import { ErrorView } from "./components/Error/Error";
import "./components/tailwind.css";
const root = document.querySelector("#app")

const start = renderer({
  root,
  controller: popupActivity
  .withContext({
    ...popupActivity.context,
    frames: {
      'activity.collecting': [View],
      'activity.receiveAll': [Entry],
    },
  }),
})


// const start = renderer({
//   root,
//   controller: cardCollection
//   .withConfig({
//     services: {
//       fetchOwnCards,
//       popup: () => new Promise(r => {
//         const bool = confirm('Are you 18 ?')
//         r(bool)
//       }),
//       fetchNewCard: (ctx) => new Promise(async (r) => {
//         const card = await fetchNewCard();
//         r(card)
//         // if (ctx.data.ownCards.length === 5) {
//         //   alert('collect all cards, congratulations!')
//         //   r(card)
//         // } else {
//         //   const bool = confirm('collect a ' + card.type + ' card');
//         //   setTimeout(() => {
//         //     r(card)
//         //   }, 500);
//         // }
//       }),
//     }
//   })
//   .withContext({
//     ...cardCollection.context,
//     frames: {
//       collecting: [View],
//       collected: [Entry],
//     },
//   }),
// })

start()