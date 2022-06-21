import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Paths } from '../../constants';
import { DashboardPage, LoginPage } from '../../pages';
import PrivateRoute from '../private-route';

import styles from './app.module.scss';

const App = () => {
  return (
    <main className={styles.app}>
      <Routes>
        <Route path={Paths.login} element={<LoginPage />} />
        <Route
          path={Paths.dashboard}
          element={
            <PrivateRoute
              redirectTo={Paths.login}
              element={<DashboardPage />}
            />
          }
        />
        <Route path={Paths.any} element={<Navigate to={Paths.login} />} />
      </Routes>
    </main>
  );
};

export default App;
