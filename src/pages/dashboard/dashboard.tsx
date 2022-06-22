import React from 'react';
import Diagram from '../../components/diagram';
import { DiagramTitles } from '../../constants';

import styles from './dashboard.module.scss';

const data1 = {
  active: 12,
  inactive: 10,
  completed: 20,
};

const data2 = {
  active: 4,
  inactive: 5,
  completed: 3,
};

const data3 = {
  active: 5,
  inactive: 5,
  completed: 4,
};

const Dashboard = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        Сводка
        <button>Выход</button>
      </header>

      <div className={styles.content}>
        <Diagram data={data1} title={DiagramTitles.scenarios} />
        <Diagram data={data2} title={DiagramTitles.lists} />
        <Diagram data={data3} title={DiagramTitles.dialogs} />
      </div>
    </div>
  );
};

export default Dashboard;
