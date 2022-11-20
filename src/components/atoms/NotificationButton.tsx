import { NotificationsActive, NotificationsNone } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useState } from 'react';

interface NotificationToggleButtonProps {
  onClick?: () => void;
}

export const NotificationToggleButton = (
  props: NotificationToggleButtonProps
) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  return (
    <IconButton
      onClick={() => {
        setIsActive(!isActive);
        if (props.onClick) {
          props.onClick();
        }
      }}
    >
      {isActive ? <NotificationsActive /> : <NotificationsNone />}
    </IconButton>
  );
};
