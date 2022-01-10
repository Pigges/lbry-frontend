// @flow
import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import { useKeycloak } from '@react-keycloak/web';
import Button from 'component/button';
import * as PAGES from 'constants/pages';

type Props = {
  user: ?User,
};

export default function UserOAuthButton(props: Props) {
  const { user } = props;
  const { initialized: keycloakReady } = useKeycloak();

  return (
    <>
      {!keycloakReady || user === undefined ? (
        <Skeleton variant="text" animation="wave" className="header__navigationItem--balanceLoading" />
      ) : (
        <Button navigate={`/$/${PAGES.OAUTH_LOGIN}`} button="link" label={__('Log In')} disabled={user === null} />
      )}
    </>
  );
}
