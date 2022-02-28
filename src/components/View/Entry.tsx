import React, { useContext, useState } from "react";
import { Banner } from './Banner';
import { List } from "./List";
import { Button } from "./Button";
import { Pool } from "./Pool";


export const Entry: React.FC = ({ children }) => {

  return (
    <div className="bg-gray-100 w-full h-full flex flex-col">
      <Banner />
      <Pool />
      <div className="mx-5 text-center font-bold text-lg">You have collected all cards, wait for bonus for three days</div>
    </div>
  )
};
