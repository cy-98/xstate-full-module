import React from "react";
import ReactDOM from "react-dom";
import { useInterpret } from "@xstate/react";
import { useSpawn } from "./hooks/useSpawn";

import { Gift } from "./modules/Gift";
import { Task } from "./container";
import { Video } from "./modules/Video";

import { EducateVideo } from "./modules/Educate/Action";
import { GameCard } from "./components/GameCard";
import { Dollars, DollarsBanner } from "./modules/Dollars";
import { BonusBanner } from "./modules/Bonus/Banner";
import { GiftBanner } from "./modules/Gift/Banner";
import { Banners } from "./modules/Banners";
import { AgeDialog } from "./modules/Age/Action";
import { SelectGiftDialog } from "./modules/Dollars/Action";

import { centerMachine } from "./container/machine";
import { dollarsMachine } from "./modules/Dollars/machine";
import { giftMachine } from "./modules/Gift/machine";
import { eduMachine } from "./modules/Educate/machine";
import { fromToggle } from "./modules/Age/machine";
import { ActionActor } from "./types/actor";
import { inspect } from "@xstate/inspect";

import "./tailwind.css";

inspect({
  iframe: false,
});

const App: React.FC<{}> = () => {
  // registry modules
  const dollars = useInterpret(dollarsMachine, { devTools: true });
  const gift = useInterpret(giftMachine, { devTools: true });
  const age = useSpawn(fromToggle, { id: "age" });
  const edu = useInterpret(eduMachine, {
    devTools: true,
  });

  const center = useInterpret(centerMachine, {
    devTools: true,
    context: {
      actors: [age, edu as unknown as ActionActor],
      modules: [dollars, gift],
    },
  });

  return (
    <Task actor={center}>
      <Banners>
        <BonusBanner />
        <DollarsBanner />
        <GiftBanner />
      </Banners>

      <GameCard Module={<Video />} />
      <GameCard Module={<Gift actor={center} />} />
      <GameCard Module={<Dollars actor={center} />} />

      <AgeDialog center={center} actor={age} />
      <SelectGiftDialog center={center} />
      <EducateVideo actor={edu} />
    </Task>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
