import React from "react";
import { Button } from "./Button";
import { Select } from "./Select";

export const Dialog: React.FC<{
  visible: boolean;
}> = ({ children, visible }) => {
  if (!visible) return <></>;
  return (
    <>
      <div className="absolute w-screen h-screen bg-transparent before:bg-black before:opacity-70 before:contents-[''] before:w-full before:h-full before:inline-block before:absolute before:top-0 before:left-0 before:z-0">
        <div className="animation-jump relative z-10 w-full h-full flex items-center justify-center">
          {children}
        </div>
      </div>
      <style>{`
        .animation-jump {
          animation: jump .4s ease-in-out;
        }
        @keyframes jump {
          0% {
            transform: scale(0);
          }
          40% {
            transform: scale(0.2)
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>
    </>
  );
};

export const ConfirmDialog: React.FC<{
  title: string;
  description: string;
  confirmText: string;
  cancelText: string;
  onConfirm?: VoidFunction;
  onCancel?: VoidFunction;
}> = ({
  title,
  description,
  confirmText,
  cancelText,
  onCancel = () => {},
  onConfirm = () => {},
}) => {
  return (
    <div className="w-64 bg-white rounded-lg p-4">
      <h1 className="font-black mb-2 text-left">{title}</h1>
      {description}
      <div className="mt-8 flex text-left text-white justify-evenly">
        <Button type="primary" onClick={onConfirm}>
          {confirmText}
        </Button>
        <Button type="secondary" onClick={onCancel}>
          {cancelText}
        </Button>
      </div>
    </div>
  );
};

export const SelectDialog: React.FC<{
  title: string;
  options: string[];
  selected: string;
  confirmText: string;
  cancelText: string;
  onSelect?: (option: string) => void;
  onConfirm?: VoidFunction;
  onCancel?: VoidFunction;
}> = ({
  title,
  options,
  selected,
  confirmText,
  cancelText,
  onSelect = () => {},
  onConfirm = () => {},
  onCancel = () => {},
}) => {
  return (
    <div className="w-64 bg-white rounded-lg p-4">
      <h1 className="font-black mb-2 text-left">{title}</h1>
      <Select options={options} selected={selected} onSelect={onSelect} />
      <div className="mt-8 flex text-left text-white justify-evenly">
        <Button type="secondary" onClick={onCancel}>
          {confirmText}
        </Button>
        <Button type="secondary" onClick={onCancel}>
          {cancelText}
        </Button>
      </div>
    </div>
  );
};
