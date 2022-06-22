import { DiagramSliceColors, DiagramTitles } from '../constants';

export type Statistic = {
  active: number;
  inactive: number;
  completed: number;
};

export type DashboardType = Record<
  keyof typeof DiagramTitles,
  Record<keyof Statistic, number>
>;

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
