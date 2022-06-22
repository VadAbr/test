import React from 'react';
import { useQuery } from '@apollo/client';
import Diagram from '../../components/diagram';
import { DiagramTitles } from '../../constants';
import { useAuth } from '../../hooks';
import { LogoutIcon } from '../../icons';
import { queries } from '../../gql';
import { DashboardType } from '../../types';
import Loader from '../../components/loader';

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
  const { data, client, loading, error } = useQuery(queries.GET_DASHBOARD);

  const logout = () => {
    setAuth(null);
    client.resetStore();
  };

  const isNotReady = loading || error;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <span>Сводка</span>

        <button className={styles.logoutButton} onClick={logout}>
          <LogoutIcon />
        </button>
      </header>

      {isNotReady && (
        <div className={styles.notReadyContainer}>
          {loading && <Loader />}
          {error && <p className={styles.error}>{error.message}</p>}
        </div>
      )}

      <div className={styles.content}>{renderDiagrams(data?.dashboard)}</div>
    </div>
  );
};

export default Dashboard;
