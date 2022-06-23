import React, { FC } from 'react';
import { DonutSlice, FormattedStatistic, Statistic } from '../../types';
import { DiagramTitles } from '../../constants';

import { getSliceForDonatChart } from '../../utils';

import styles from './donat-chart.module.scss';

export type DonatChartProps = {
  data: DonutSlice<FormattedStatistic>[];
  label: DiagramTitles;
  radius?: number;
  viewBox?: number;
  borderSize?: number;
  onHover?: (key: keyof FormattedStatistic) => void;
  onUnHover?: () => void;
  currentSlice?: DonutSlice<FormattedStatistic> | null;
};

const DonatChart: FC<DonatChartProps> = ({
  data,
  label,
  onHover,
  borderSize = 5,
  radius = 50,
  viewBox = 100,
  currentSlice,
  onUnHover,
}) => {
  const filteredData = data.filter(
    (el) => el.id !== 'all',
  ) as DonutSlice<Statistic>[];
  const total = filteredData.reduce((acc, el) => acc + el.value, 0);

  return (
    <div className={styles.container}>
      <div className={styles.labelContainer}>
        <span className={styles.text}>{label}</span>
        <span className={styles.counter}>{currentSlice?.value || total}</span>
      </div>

      <svg viewBox={'0 0 ' + viewBox + ' ' + viewBox}>
        {getSliceForDonatChart(filteredData, radius, viewBox, borderSize).map(
          (slice) => {
            const isActiveClassName =
              currentSlice?.id === slice.id || currentSlice?.id === 'all';

            return (
              <path
                className={isActiveClassName ? styles.activeItem : ''}
                key={slice.id}
                onMouseOver={() => onHover && onHover(slice.id)}
                onMouseLeave={() => onUnHover && onUnHover()}
                fill={slice.color}
                d={slice.commands}
                transform={'rotate(' + slice.offset + ')'}
              />
            );
          },
        )}
      </svg>
    </div>
  );
};

export default DonatChart;
