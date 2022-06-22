import React, { FC, ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { Paths } from '../../constants';
import { useAuth } from '../../hooks';

type PrivateRouteProps = {
  redirectTo: Paths;
  element: ReactElement;
};

const PrivateRoute: FC<PrivateRouteProps> = ({ element, redirectTo }) => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to={redirectTo} />;
  }

  return element;
};

export default PrivateRoute;
