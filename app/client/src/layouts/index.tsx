import type { ReactNode } from 'react';
import { styled } from '@mui/material/styles';
import { SideNav } from './side-nav';
import { withAuthGuard } from '../hocs/with-auth-guard';

interface LayoutProps {
  children?: ReactNode;
}

const SIDE_NAV_WIDTH = 280;

const MainLayoutRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
  backgroundColor: theme.palette.background.default,
  paddingLeft: SIDE_NAV_WIDTH,
}));

const MainLayoutContainer = styled('div')({
  display: 'flex',
  flex: '1 1 auto',
  flexDirection: 'column',
  '@media (max-width: 600px)': {
    paddingTop: '20px',
  },
  width: '100%',
  minHeight: `100svh`,
});

interface LayoutProps {
  children?: ReactNode;
}

export const Layout = withAuthGuard(({ children }: LayoutProps) => {
  return (
    <>
      <SideNav />

      <MainLayoutRoot>
        <MainLayoutContainer>{children}</MainLayoutContainer>
      </MainLayoutRoot>
    </>
  );
});
