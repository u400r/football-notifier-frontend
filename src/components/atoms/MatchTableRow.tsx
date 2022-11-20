import { css } from '@emotion/react';
import liff from '@line/liff/dist/lib';
import { NotificationsActive, NotificationsNone } from '@mui/icons-material';
import { IconButton, TableCell, TableRow, Typography } from '@mui/material';
import { useState } from 'react';
import { Match } from '../../client';
import { SvgInline } from './SvgInline';
import { Team } from './Team';
const styles = {
  inlineSvg: css`
    width: 50px;
    height: 35px;
    border: thin solid gray;
    margin: 1px;
    padding: 1px;
  `,
};

interface MatchTableRowProps {
  match: Match;
}

export default function MatchTableRow(props: MatchTableRowProps) {
  const [isActive, setIsActive] = useState<boolean>(false);
  return (
    <TableRow key={props.match.id}>
      {liff.isLoggedIn() ? (
        <TableCell>
          <IconButton onClick={() => setIsActive(!isActive)}>
            {isActive ? <NotificationsActive /> : <NotificationsNone />}
          </IconButton>
        </TableCell>
      ) : (
        <></>
      )}
      <TableCell>
        <SvgInline
          css={styles.inlineSvg}
          url="http://localhost:5173/crests/EUR.svg"
        />
      </TableCell>
      <TableCell>
        <Typography variant="h6" sx={{ margin: '0 10px 0 0' }}>
          {props.match.utcDate.getHours().toString().padStart(2, '0')}:
          {props.match.utcDate.getMinutes().toString().padStart(2, '0')}
        </Typography>
      </TableCell>
      <TableCell>
        <Team
          emblemUrl={props.match.homeTeam.crest
            .replace(
              'https://crests.football-data.org',
              'http://localhost:5173/crests'
            )
            .replace('png', 'svg')}
          name={props.match.homeTeam.name}
        />
      </TableCell>
      <TableCell>
        <Team
          emblemUrl={props.match.awayTeam.crest
            .replace(
              'https://crests.football-data.org',
              'http://localhost:5173/crests'
            )
            .replace('png', 'svg')}
          name={props.match.awayTeam.name}
        />
      </TableCell>
      <TableCell>
        {props.match.status === 'FINISHED' ? (
          <Typography>
            {props.match.score?.fullTime?.home} -{' '}
            {props.match.score?.fullTime?.away}
          </Typography>
        ) : (
          <Typography>-</Typography>
        )}
      </TableCell>
    </TableRow>
  );
}
