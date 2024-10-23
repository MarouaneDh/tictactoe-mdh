import React from 'react';

import './Box.css';

type Props = {
  item: string;
  index: number;
  combo: number[];
  grid: number;
  onClick(event: any): void;
};

const Box = ({ item, index, combo, grid, onClick }: Props) => {
  const crossStyle = () => {
    if (combo.length < 2) return '';

    const [first, second] = combo;
    const diff = second - first;

    if (diff === 1) return 'horizontal';
    if (diff === grid) return 'vertical';
    if (diff === grid + 1) return 'diag1';
    if (diff === grid - 1) return 'diag2';
    return '';
  };

  return (
    <div onClick={onClick} box-index={index} className="box">
      <span
        className={combo.includes(index) ? 'winMark-' + crossStyle() : 'mark'}
      >
        {item}
      </span>
    </div>
  );
};

export default Box;
