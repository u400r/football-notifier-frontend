import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
} from '@mui/material';
import { useState } from 'react';
import Header from '../molecules/Header';

export default function CommonLayout() {
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
    </>
  );
}
