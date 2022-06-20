import React from "react";
import { ConfirmDialog } from "../../components/Dialog";

export const AgeDialog: React.FC = () => {
  return (
    <ConfirmDialog
      title="Lorem ipsum dolor sit amet"
      description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus ullam quod, repellendus qui aspernatur dicta perspiciatis distinctio porro repudiandae. Aspernatur quod illo, corporis nostrum."
      confirmText="confirm"
      cancelText="cancel"
    />
  );
};
