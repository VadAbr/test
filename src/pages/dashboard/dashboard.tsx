import React from 'react';
import Diagram from '../../components/diagram';
import { DiagramTitles } from '../../constants';

import styles from './dashboard.module.scss';

const data = {
  active: 12,
  inactive: 10,
  completed: 20,
};

const Dashboard = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        Сводка<button>asda</button>
      </header>

      <div className={styles.content}>
        <Diagram data={data} title={DiagramTitles.scenarios} />
        <Diagram data={data} title={DiagramTitles.lists} />
        <Diagram data={data} title={DiagramTitles.dialogs} />
      </div>
    </div>
  );
};

export default Dashboard;
