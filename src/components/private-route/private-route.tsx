import React, { FC, ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { Paths } from '../../constants';

type PrivateRouteProps = {
  redirectTo: Paths;
  element: ReactElement;
};

const PrivateRoute: FC<PrivateRouteProps> = ({ element, redirectTo }) => {
  //TODO: add logic
  const isAuthorized = true;

  if (!isAuthorized) {
    return <Navigate to={redirectTo} />;
  }

  return element;
};

export default PrivateRoute;
