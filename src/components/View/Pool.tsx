import React, { useContext } from "react";
import { dataContext } from "../../runtime/context";
import { Card, fetchNewCard } from "../../services/fetchcard";

export const Pool = () => {
  const context = useContext(dataContext);
  return (
    <div className="flex px-4 py-2 flex-wrap text-center text-pink-500">
      {context.data.ownCards.map((i: Card) => {
        return <div className="basis-4/12 h-24">
          {i.type}
          </div>
      })}
    </div>
  );
};
