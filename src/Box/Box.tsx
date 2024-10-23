import React from 'react';

import './Box.css';

type Props = {
  item: string;
  index: number;
  combo: string;
  onClick(event: any): void;
};

const Box = ({ item, index, combo, onClick }: Props) => {
  // ['012', '345', '678', '036', '147', '258', '048', '246'];
  const crossStyle = () => {
    switch (combo) {
      case '012':
        return 'horizontal';
      case '345':
        return 'horizontal';
      case '678':
        return 'horizontal';
      case '036':
        return 'vertical';
      case '147':
        return 'vertical';
      case '258':
        return 'vertical';
      case '048':
        return 'diag1';
      case '246':
        return 'diag2';
      default:
        break;
    }
  };
  return (
    <div onClick={onClick} box-index={index} className="box">
      <span
        className={
          combo.includes(`${index}`) ? 'winMark-' + crossStyle() : 'mark'
        }
      >
        {item}
      </span>
    </div>
  );
};

export default Box;
