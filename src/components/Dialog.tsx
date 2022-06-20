import React from "react";

export const Dialog: React.FC = ({ children }) => {
  return (
    <>
      <div className="absolute w-screen h-screen bg-transparent animation-jump before:bg-black before:opacity-70 before:contents-[''] before:w-full before:h-full before:inline-block before:absolute before:top-0 before:left-0 before:z-0">
        <div className="relative z-10 w-full h-full flex items-center justify-center">
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
}> = ({ title, description, confirmText, cancelText }) => {
  return <div className="w-64 bg-white rounded-lg p-4">
  <h1 className='font-black mb-2 text-left'>{title}</h1>
  {description}
  <div className='mt-8 flex text-left text-white'>
    <div className='flex-1 rounded-sm text-center bg-rose-500 mr-1 p-1'>{confirmText}</div>
    <div className='flex-1 rounded-sm text-center bg-slate-400 ml-1 p-1'>{cancelText}</div>
  </div>
</div>
}