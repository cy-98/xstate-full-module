import React from "react";
import { GiftActor } from "./machine";

export const Gift: React.FC<{ actor: GiftActor}> = ({ children }) => {
  return <div className="p-4 bg-cyan-500 text-white rounded-md" >Gift module</div>
}