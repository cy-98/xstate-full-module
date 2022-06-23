import React, { useEffect, useMemo } from "react";
import { useActor, useSelector, useSpawn } from "@xstate/react";
import { waitFor } from "xstate/lib/waitFor";
import { ConfirmDialog, Dialog } from "../../components/Dialog";
import { CenterActor } from "../../container/machine";
import { AgeActor } from "./machine";

export const AgeDialog: React.FC<{
  center: CenterActor;
  actor: AgeActor;
}> = ({ center, actor }) => {
  // useEffect(() => {
  //   center.send({
  //     type: "ACTION",
  //     data: {
  //       priority: 1,
  //       key: "age",
  //       actor,
  //     },
  //   });
  // }, []);

  useEffect(() => {
    center.send({
      type: "ACTION",
      data: {
        priority: 1,
        key: "age",
        actor: "age",
      },
    });
  }, []);

  const [state] = useActor(actor);

  return (
    <Dialog visible={state === "start"}>
      <ConfirmDialog
        title="Lorem ipsum dolor sit amet"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus ullam quod, repellendus qui aspernatur dicta perspiciatis distinctio porro repudiandae. Aspernatur quod illo, corporis nostrum."
        confirmText="confirm"
        onConfirm={() => actor.send({ type: "PLAY" })}
        onCancel={() => actor.send({ type: "PLAY" })}
        cancelText="cancel"
      />
    </Dialog>
  );
};
