import React from 'react';

type Props = {
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLButtonElement>;

function Button({ children, ...restButtonProps }: Props) {
  return (
    <button
      className="bg-white h-auto px-4 py-1 rounded-full font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-500"
      {...restButtonProps}
    >
      {children}
    </button>
  );
}

export default Button;
