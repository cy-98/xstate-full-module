import React from "react";
import { CenterActor } from "../../container/machine";

export const Gift: React.FC<{ actor: CenterActor }> = ({ children }) => {
  return (
    <div className="p-4 bg-cyan-500 text-white rounded-md">Gift module</div>
  );
};
