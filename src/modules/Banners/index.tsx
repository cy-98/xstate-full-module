import React from "react";
import { Slider } from "../../components/Slider";

export const Banners: React.FC<{}> = ({ children }) => {
  return <Slider>{children}</Slider>;
};
