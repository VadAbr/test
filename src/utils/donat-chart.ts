import {
  DonutSlice,
  DonutSliceWithCommands,
  Statistic,
  FormattedStatistic,
} from '../types';
import { DiagramSliceColors } from '../constants';

export const prepareDataForDonatChart = (
  data: Statistic,
): DonutSlice<FormattedStatistic>[] => {
  const keys = Object.keys(data) as Array<keyof Statistic>;
  const total = keys.reduce((acc, key) => acc + data[key], 0);

  const newData = keys.map((key) => {
    const percent = (data[key] * 100) / total;
    return {
      id: key,
      color: DiagramSliceColors[key],
      percent,
      value: data[key],
    };
  });

  return [
    { id: 'all', color: DiagramSliceColors.all, percent: 100, value: total },
    ...newData,
  ];
};

export const getSliceForDonatChart = (
  donutSlices: DonutSlice<Statistic>[],
  radius: number,
  svgSize: number,
  borderSize: number,
): DonutSliceWithCommands[] => {
  let previousPercent = 0;
  return donutSlices.map((slice) => {
    const sliceWithCommands: DonutSliceWithCommands = {
      ...slice,
      commands: getSliceCommands(slice, radius, svgSize, borderSize),
      offset: previousPercent * 3.6 * -1,
    };
    previousPercent += slice.percent;
    return sliceWithCommands;
  });
};

const getSliceCommands = (
  donutSlice: DonutSlice<Statistic>,
  radius: number,
  svgSize: number,
  borderSize: number,
): string => {
  const degrees = percentToDegrees(donutSlice.percent);
  const longPathFlag = degrees > 180 ? 1 : 0;
  const innerRadius = radius - borderSize;

  const commands: string[] = [];
  commands.push(`M ${svgSize / 2 + radius} ${svgSize / 2}`);
  commands.push(
    `A ${radius} ${radius} 0 ${longPathFlag} 0 ${getCoordFromDegrees(
      degrees,
      radius,
      svgSize,
    )}`,
  );
  commands.push(`L ${getCoordFromDegrees(degrees, innerRadius, svgSize)}`);
  commands.push(
    `A ${innerRadius} ${innerRadius} 0 ${longPathFlag} 1 ${
      svgSize / 2 + innerRadius
    } ${svgSize / 2}`,
  );
  return commands.join(' ');
};

const getCoordFromDegrees = (
  angle: number,
  radius: number,
  svgSize: number,
): string => {
  const x = Math.cos((angle * Math.PI) / 180);
  const y = Math.sin((angle * Math.PI) / 180);

  const coordX = x * radius + svgSize / 2;
  const coordY = y * -radius + svgSize / 2;

  return [coordX, coordY].join(' ');
};

const percentToDegrees = (percent: number): number => {
  return percent * 3.6;
};
