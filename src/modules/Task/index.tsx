import React, { FC } from "react";

export const Task: FC<{}> = ({ children }) => {
  return (
    <div className="-m-1">
      <h1 className="py-2 text-center font-bold absolute z-10 w-full text-white">Task Container</h1>
      <div className="p-1 flex flex-col">{children}</div>
    </div>
  );
};
