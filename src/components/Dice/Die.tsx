import React from 'react';
import Die4 from './Die4';
import Die6 from './Die6';
import {DieType} from '../../types';
import Die8 from './Die8';

type DieProps = {
  type: DieType;
  dots: number;
};

const Die = ({type, dots}: DieProps) => {
  if (type === 4) {
    return <Die4 dots={dots} />;
  }
  if (type === 8) {
    return <Die8 dots={dots} />;
  }
  return <Die6 dots={dots} />;
};

export default Die;
