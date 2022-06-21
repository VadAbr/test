import React, { FC } from 'react';
import { Statistic } from '../../types';
import { DiagramTitles, DiagramSubTitles } from '../../constants';

import styles from './diagram.module.scss';

export type DiagramProps = {
  data: Statistic;
  title: DiagramTitles;
};

const Diagram: FC<DiagramProps> = ({ data, title }) => {
  const keys = Object.keys(data) as Array<keyof Statistic>;
  const total = keys.reduce((acc, key) => acc + data[key], 0);

  return (
    <div className={styles.container}>
      <div className={styles.diagram}>{title}</div>

      <ul className={styles.list}>
        <li>
          <span>{DiagramSubTitles.all}:</span>
          <span>{total}</span>
        </li>

        {keys.map((key) => (
          <li>
            <span>{DiagramSubTitles[key]}:</span>
            <span>{data[key]}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Diagram;
