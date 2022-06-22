import { DiagramSliceColors } from '../constants';

export type Statistic = {
  active: number;
  inactive: number;
  completed: number;
};

export type FormattedStatistic = {
  all: number;
} & Statistic;

export interface DonutSlice<T> {
  id: keyof T;
  percent: number;
  color: DiagramSliceColors;
  value: number;
}

export interface DonutSliceWithCommands extends DonutSlice<Statistic> {
  offset: number;
  commands: string;
}
