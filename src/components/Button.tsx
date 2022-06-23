import React from "react";

export const Button: React.FC<{
  type: "primary" | "secondary";
  className?: string;
  onClick?: VoidFunction;
}> = ({ children, className = "", type, onClick = () => {} }) => {
  if (type === "secondary") {
    return (
      <button
        className={
          "relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm bg-white font-medium text-black rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500  focus:outline-none" +
          " " +
          className
        }
        onClick={onClick}
      >
        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
          {children}
        </span>
      </button>
    );
  }
  return (
    <button
      className={
        "relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:outline-none" +
        " " +
        className
      }
      onClick={onClick}
    >
      <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
        {children}
      </span>
    </button>
  );
};

export const CloseButton: React.FC<{
  className?: string;
  onClick?: VoidFunction;
}> = ({ className = "", onClick = () => {} }) => {
  return (
    <svg
      onClick={onClick}
      className={"h-8 w-8" + " " + className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
};
