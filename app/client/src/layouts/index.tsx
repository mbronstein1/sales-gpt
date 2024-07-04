import { useState, type ReactNode } from 'react';
import { styled } from '@mui/material/styles';
import SideNav from './side-nav';
import { withAuthGuard } from '../hocs/with-auth-guard';
import { ContentProvider } from '../contexts/content/content-provider';
import LoadingOverlay from './LoadingOverlay';

interface LayoutProps {
  children?: ReactNode;
}

const SIDE_NAV_WIDTH = 240;

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
  width: '100%',
  minHeight: `100svh`,
});

interface LayoutProps {
  children?: ReactNode;
}

export const Layout = withAuthGuard(({ children }: LayoutProps) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <ContentProvider>
        <SideNav SIDE_NAV_WIDTH={SIDE_NAV_WIDTH} setOpenOverlay={setOpen} />

        <MainLayoutRoot>
          <MainLayoutContainer>{children}</MainLayoutContainer>
        </MainLayoutRoot>
        {open && <LoadingOverlay text="Generating response. This may take up to 20 seconds" />}
      </ContentProvider>
    </>
  );
});
