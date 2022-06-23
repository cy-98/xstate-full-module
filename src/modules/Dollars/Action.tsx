import React, { useEffect, useMemo, useState } from "react";
import { useActor, useSelector } from "@xstate/react";
import { Dialog, SelectDialog } from "../../components/Dialog";
import { CenterActor } from "../../container/machine";
import { fromToggle } from "../Age/machine";
import { useSpawn } from "../../hooks/useSpawn";

export const SelectGiftDialog: React.FC<{
  center: CenterActor;
}> = ({ center }) => {
  const actor = useSpawn(fromToggle, { id: "gift-select" });
  const [state] = useActor(actor);

  useEffect(() => {
    center.send({
      type: "ACTION",
      data: {
        priority: 5,
        actor, // custom actor outside from center
      },
    });
  }, []);

  const [value, setValue] = useState("football");
  return (
    <Dialog visible={state === "start"}>
      <SelectDialog
        title="Select a gift"
        options={["football", "basketball", "tennis"]}
        confirmText="confirm"
        cancelText="cancel"
        onConfirm={() => actor.send("TOGGLE")}
        onCancel={() => actor.send("TOGGLE")}
        selected={value}
        onSelect={setValue}
      />
    </Dialog>
  );
};
