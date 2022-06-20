import React from "react";

export const Banner: React.FC<{ className?: string}> = ({ children, className = ''}) => {
  return (
    <div className={`bg-gradient-to-r w-full flex text-white h-60 ` + className}>
      {children}
    </div>
  );
};
