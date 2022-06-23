import React from "react";
import { Player, Ui, Video } from "@vime/react";
import { useActor } from "@xstate/react";
import { Dialog } from "../../components/Dialog";
import { EduVideoActor } from "./machine";
import { CloseButton } from "../../components/Button";

export const EducateVideo: React.FC<{ actor: EduVideoActor }> = ({ actor }) => {
  const [state, send] = useActor(actor);

  return (
    <Dialog visible={state.matches("start")}>
      <div className="w-full h-full flex flex-col items-center justify-center">
        <Player>
          <Video
            crossOrigin="anonymous"
            poster="https://media.vimejs.com/poster.png"
          >
            <source
              data-src="https://media.vimejs.com/720p.mp4"
              type="video/mp4"
            />
          </Video>
        </Player>
        <CloseButton
          className="text-white mt-4"
          onClick={() => send("TOGGLE")}
        />
      </div>
    </Dialog>
  );
};
