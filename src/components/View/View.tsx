import React, { useContext, useState } from "react";
import { Banner } from './Banner';
import { Pool } from "./Pool";
import { List } from "./List";
import { Button } from "./Button";

import { dataContext } from "../../runtime/context";

export const View: React.FC = ({ children }) => {
  const context = useContext(dataContext);
  return (
    <div className="bg-gray-100 w-full h-full flex flex-col">
      <Banner />
      <Pool />
      <Button />
      <List />
    </div>
  )
};
