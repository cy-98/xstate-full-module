import React, { useEffect, useMemo } from "react";
import { useActor, useSelector, useSpawn } from "@xstate/react";
import { waitFor } from "xstate/lib/waitFor";
import { ConfirmDialog, Dialog } from "../../components/Dialog";
import { CenterActor } from "../../container/machine";
import { AgeActor } from "./machine";
import { ActionTables } from "../tables";

export const AgeDialog: React.FC<{
  center: CenterActor;
  actor: AgeActor;
}> = ({ center, actor }) => {
  useEffect(() => {
    center.send({
      type: "ACTION",
      data: { ...ActionTables.AgeDialogAction },
    });
  }, []);

  const [state] = useActor(actor);

  const handleConfirmAgeRule = () => {
    actor.send({ type: "TOGGLE" });
    center.send({
      type: "ACTION",
      data: { ...ActionTables.EduVideoAction },
    });
  };

  return (
    <Dialog visible={state === "start"}>
      <ConfirmDialog
        title="Lorem ipsum dolor sit amet"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus ullam quod, repellendus qui aspernatur dicta perspiciatis distinctio porro repudiandae. Aspernatur quod illo, corporis nostrum."
        confirmText="confirm"
        onConfirm={handleConfirmAgeRule}
        onCancel={() => actor.send({ type: "TOGGLE" })}
        cancelText="cancel"
      />
    </Dialog>
  );
};
