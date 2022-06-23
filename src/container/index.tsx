import { useActor, useMachine } from "@xstate/react";
import React, { FC } from "react";
import { CenterActor } from "./machine";

export const Task: FC<{ actor: CenterActor }> = ({ children, actor }) => {
  const [state] = useActor(actor);
  return (
    <div className="-m-1">
      <h1 className="py-2 text-center font-bold absolute z-10 w-full text-white">
        Task Container: {state.value}
      </h1>
      <div className="p-1 flex flex-col">{children}</div>
    </div>
  );
};
