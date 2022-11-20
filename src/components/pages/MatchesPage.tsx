import { Box } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';
import { Configuration, DefaultApi, Matches, Match } from '../../client';
import { Competition, Competitions } from '../../constants/competitions';
import MatchTableInCertainDay from '../molecules/MatchTable';
import MultipleSelectChip from '../molecules/MultipleSelectChip';
import CommonLayout from '../template/CommonLayout';

const conf = new Configuration({ apiKey: '71fac00130684618a3012a0671cd06a7' });

const api = new DefaultApi(conf);

export const MatchesPage = () => {
  const [matches, setMatches] = useState<Matches | undefined>(undefined);
  const [selectedCompetitions, setSelectedCompetitions] =
    useState<Competition[]>(Competitions);
  const today = dayjs(Date.now());
  //const today = dayjs('2022-10-10');
  const from = today.subtract(4, 'day');
  const to = today.add(5, 'day');
  useEffect(() => {
    const getMatches = async () => {
      setMatches(
        await api.matchesGet({
          dateFrom: from.format('YYYY-MM-DD'),
          dateTo: to.format('YYYY-MM-DD'),
        })
      );
    };
    getMatches();
  }, []);

  const divideMatchesPerDay = (
    matches: Matches
  ): { date: Dayjs; matches: Match[] }[] => {
    const dates: Dayjs[] = [];
    for (let date = from; date.isBefore(to); date = date.add(1, 'day')) {
      dates.push(date);
    }
    const ret = dates.map((d) => {
      return {
        date: d,
        matches: matches.matches.filter(
          (m) =>
            dayjs(m.utcDate).format('YYYY-MM-DD') === d.format('YYYY-MM-DD')
        ),
      };
    });
    return ret;
  };
  const onFilterChanged = (values: string[]) => {
    setSelectedCompetitions(
      Competitions.filter((c) => values.find((v) => v === c.name))
    );
  };
  return (
    <CommonLayout>
      <Box>
        <MultipleSelectChip onChange={onFilterChanged} values={Competitions} />
      </Box>
      <Box
        sx={{ overflow: 'auto', height: 'calc(100vh - 100px)', width: '100vw' }}
      >
        {matches ? (
          divideMatchesPerDay(matches)
            .map((m) => {
              return {
                date: m.date,
                matches: m.matches.filter((mm) =>
                  selectedCompetitions.find((c) => c.id === mm.competition.id)
                ),
              };
            })
            .filter((m) => m.matches.length > 0)
            .map((m) => {
              return (
                <MatchTableInCertainDay
                  key={m.date.valueOf()}
                  date={m.date}
                  matches={m.matches}
                />
              );
            })
        ) : (
          <></>
        )}
      </Box>
    </CommonLayout>
  );
};
