import { css } from '@emotion/react';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { SvgInline } from './SvgInline';

interface TeamProps {
  name: string;
  emblemUrl: string | undefined;
}

const styles = {
  inlineSvg: css`
    width: 50px;
    height: 35px;
    border: thin solid gray;
    margin: 1px;
    padding: 1px;
  `,
};

export const Team = (props: TeamProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <SvgInline css={styles.inlineSvg} url={props.emblemUrl} />
      <Typography variant="h6" sx={{ margin: '0 5px 0 5px' }}>
        {props.name}
      </Typography>
    </Box>
  );
};
