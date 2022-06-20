import React from "react";
import ReactDOM from "react-dom";
import { Gift } from "./modules/Gift";
import { Task } from "./modules/Task";
import { Video } from "./modules/Video";

import { GameCard } from "./components/GameCard";
import { Dollars, DollarsBanner } from "./modules/Dollars";
import { BonusBanner } from "./modules/Bonus/Banner";
import { GiftBanner } from "./modules/Gift/Banner";
import { Banners } from "./modules/Banners";
import { Dialog } from "./components/Dialog";

import "./tailwind.css";
import { AgeDialog } from "./modules/Age/Dialog";

const App: React.FC<{}> = () => {
  return (
    <Task>
      <Banners>
        <BonusBanner />
        <DollarsBanner />
        <GiftBanner />
      </Banners>

      <GameCard Module={<Video />} />
      <GameCard Module={<Gift />} />
      <GameCard Module={<Dollars />} />

      <Dialog>
        <AgeDialog />
      </Dialog>
    </Task>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
