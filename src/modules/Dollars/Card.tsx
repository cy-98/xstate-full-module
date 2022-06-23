import { useActor, useSelector } from "@xstate/react";
import React from "react";
import { Button } from "../../components/Button";
import { CenterActor } from "../../container/machine";

export const Dollars: React.FC<{
  actor: CenterActor;
}> = ({ children, actor }) => {
  const handleOpenAgeDialog = () => {
    actor.send({
      type: "ACTION",
      data: {
        priority: 1,
        actor: "age",
        key: "age",
      },
    });
  };
  return (
    <div className="p-4 text-white bg-rose-500 rounded-md flex justify-between items-center">
      <div>Dollars module</div>
      <Button type="primary" onClick={handleOpenAgeDialog}>
        enter
      </Button>
    </div>
  );
};
