import React, { useState } from "react";
import { Banner } from './Banner';
import { Pool } from "./Pool";
import { Button } from "./Button";

import '../tailwind.css';

export const View: React.FC = ({ children }) => {
  return (
    <div className="bg-gray-100 w-full h-full flex flex-col">
      <Banner />
      <Pool />
      <Button />
      {children}
    </div>
  )
};
