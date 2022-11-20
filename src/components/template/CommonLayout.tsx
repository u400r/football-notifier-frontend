import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
} from '@mui/material';
import React, { useState } from 'react';
import Header from '../molecules/Header';

interface CommonLayoutProps {
  children: React.ReactNode | undefined;
}

export default function CommonLayout(props: CommonLayoutProps) {
  const { children } = props;
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };
  return (
    <>
      <Header onClickMenu={toggleDrawer} />
      <Drawer open={openDrawer} onClose={toggleDrawer}>
        <Toolbar />
        <Divider />
        <List>
          {['Matches', 'Standings', 'Settings'].map((text) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box sx={{ margin: '50px 0 0 0 ' }}>{children}</Box>
    </>
  );
}
