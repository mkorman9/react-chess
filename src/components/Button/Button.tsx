import React from 'react';

export type ButtonProps = {
  text: string;
  onClick?: () => void;
};

const Button: React.FC<ButtonProps> = ({text, onClick}) => {
  const clickHandler = () => {
    if (onClick) {
      onClick();
    }
  };

  return (<>
    <button
      type="button"
      className="w-48 h-8 bg-tile-dark border-2 border-black active:bg-tile-light"
      onClick={clickHandler}
    >
      {text}
    </button>
  </>);
};

export default Button;
