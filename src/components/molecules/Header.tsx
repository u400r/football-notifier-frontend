import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useEffect, useState } from 'react';
import liff from '@line/liff/dist/lib';

interface HeaderProps {
  onClickMenu: () => void;
}

export default function Header(props: HeaderProps) {
  const { onClickMenu } = props;
  // FIXME remove unexpected any
  const [profile, setProfile] = useState<any>(undefined);

  const handleLogin = async () => {
    if (!liff.isLoggedIn()) {
      liff.login();
    }
  };

  useEffect(() => {
    liff.init({ liffId: import.meta.env.VITE_APP_LIFF_ID });
  }, []);

  useEffect(() => {
    liff.ready.then(() => {
      if (liff.isLoggedIn()) {
        liff.getProfile().then((p) => {
          setProfile(p);
        });
      }
    });
  });
  return (
    <AppBar position="absolute" sx={{ width: '100vx' }}>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={() => onClickMenu()}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'left' }}>
          Football Notifier
        </Typography>
        {profile ? (
          <>{profile.displayName}</>
        ) : (
          <Button color="inherit" onClick={() => handleLogin()}>
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
