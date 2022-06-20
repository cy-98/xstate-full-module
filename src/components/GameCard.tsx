import React from "react";

export const GameCard: React.FC<{
  separator?: boolean;
  Module: React.ReactNode;
}> = ({ separator = false, Module }) => {
  return (
    <div className="m-2">
      <div className="p-2 rounded-md font-bold border-solid border-2">
        {Module}
      </div>
      {separator && <div className="border-b border-gray-300 mx-2 mt-4" />}
    </div>
  );
};
