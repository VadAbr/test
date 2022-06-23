import React, { FC, useState } from 'react';
import { Statistic, DonutSlice, FormattedStatistic } from '../../types';
import { DiagramTitles, DiagramSubTitles } from '../../constants';
import DonatChart from '../donat-chart';

import { prepareDataForDonatChart } from '../../utils';

import styles from './diagram.module.scss';

export type DiagramProps = {
  data: Statistic;
  title: DiagramTitles;
};

const Diagram: FC<DiagramProps> = ({ data, title }) => {
  const [currentSlice, setCurrentSlice] =
    useState<DonutSlice<FormattedStatistic> | null>(null);
  const formattedData = prepareDataForDonatChart(data);

  const onHover = (key: keyof FormattedStatistic) => {
    const slice = formattedData.find(({ id }) => id === key);
    setCurrentSlice(slice || null);
  };

  const onUnHover = () => {
    setCurrentSlice(null);
  };

  return (
    <div className={styles.container}>
      <div className={styles.diagram}>
        <DonatChart
          data={formattedData}
          label={title}
          currentSlice={currentSlice}
          onHover={onHover}
          onUnHover={onUnHover}
        />
      </div>

      <ul className={styles.list}>
        {formattedData.map(({ id, value }) => (
          <li
            key={id}
            className={currentSlice?.id === id ? styles.activeItem : ''}
            onMouseOver={() => onHover(id)}
            onMouseLeave={onUnHover}
          >
            <span>{DiagramSubTitles[id]}:</span>
            <span>{value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Diagram;
