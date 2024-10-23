import React from 'react';

import './Box.css';

type Props = {
  item: string;
  index: number;
  onClick(event: any): void;
};

const Box = ({ item, index, onClick }: Props) => {
  return (
    <div onClick={onClick} box-index={index} className="box">
      {item}
    </div>
  );
};

export default Box;
