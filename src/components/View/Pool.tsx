import React, { useContext } from "react";
import { dataContext } from "../../runtime/context";
import { Card, fetchNewCard } from "../../services/fetchcard";

export const Pool = () => {
  const { data } = useContext(dataContext);
  const rest = 6 - data.ownCards.length;

  return (
    <div className="grid grid-rows-2 grid-flow-col gap-4 grid-col-2 px-4 py-2  text-center text-pink-500">
      {data.ownCards.map((i: Card) => {
        return <div className="p-4 bg-blue-300">
          {i.type}
          </div>
      })}
      {new Array(rest).fill(0).map(i => {
        return <div className="p-4 bg-black rounded-lg text-white">
          unknown
        </div>
      })}
    </div>
  );
};
