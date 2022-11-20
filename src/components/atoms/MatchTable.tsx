import { Dayjs } from 'dayjs';
import { Box, Table, TableBody, Typography } from '@mui/material';
import { Match } from '../../client';
import MatchTableRow from './MatchTableRow';

interface MatchTableInCertainDayProps {
  date: Dayjs;
  matches: Match[];
}

export default function MatchTableInCertainDay(
  props: MatchTableInCertainDayProps
) {
  return (
    <Box>
      <Typography
        variant="h5"
        align="left"
        sx={{ width: '100%', margin: '15px 0 0 0' }}
      >
        {props.date.format('YYYY/MM/DD')}
      </Typography>
      <Table>
        <TableBody>
          {props.matches
            .sort((a, b) => a.utcDate.getTime() - b.utcDate.getTime())
            .map((m) => (
              <MatchTableRow key={m.id} match={m} />
            ))}
        </TableBody>
      </Table>
    </Box>
  );
}
