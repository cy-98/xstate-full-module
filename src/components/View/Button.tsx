import React, { useContext } from "react";
import { dataContext } from "../../runtime/context";

export const Button = () => {
  const { service } = useContext(dataContext);

  const handleClick = () => {
    service.send("FETCH");
    console.log(service.state.value);
  }

  return (
    <div
      className="p-4 mx-4 flex justify-center items-center text-white font-bold rounded-lg bg-red-400 active:scale-110 origin-center duration-200"
      onClick={handleClick}
    >
      new card!
    </div>
  );
};
