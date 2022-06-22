import React from 'react';
import { useQuery } from '@apollo/client';
import Diagram from '../../components/diagram';
import { DiagramTitles } from '../../constants';
import { useAuth } from '../../hooks';
import { LogoutIcon } from '../../icons';
import { queries } from '../../gql';
import { DashboardType } from '../../types';

import styles from './dashboard.module.scss';

const renderDiagrams = (dashboard: DashboardType) => {
  if (!dashboard) {
    return null;
  }
  const keys = Object.keys(dashboard) as Array<keyof DashboardType>;

  return keys.map((key) => (
    <Diagram key={key} data={dashboard[key]} title={DiagramTitles[key]} />
  ));
};

const Dashboard = () => {
  const { setAuth } = useAuth();
  const { data, client } = useQuery(queries.GET_DASHBOARD);

  const logout = () => {
    setAuth(null);
    client.resetStore();
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <span>Сводка</span>

        <button className={styles.logoutButton} onClick={logout}>
          <LogoutIcon />
        </button>
      </header>

      <div className={styles.content}>{renderDiagrams(data?.dashboard)}</div>
    </div>
  );
};

export default Dashboard;
