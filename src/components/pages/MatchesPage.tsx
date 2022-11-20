import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';
import { Configuration, DefaultApi, Matches, Match } from '../../client';
import MatchTableInCertainDay from '../molecules/MatchTable';
import CommonLayout from '../template/CommonLayout';

const conf = new Configuration({ apiKey: '71fac00130684618a3012a0671cd06a7' });

const api = new DefaultApi(conf);

export const MatchesPage = () => {
  const [matches, setMatches] = useState<Matches | undefined>(undefined);
  const today = dayjs(Date.now());
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
  return (
    <CommonLayout>
      {matches ? (
        divideMatchesPerDay(matches)
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
    </CommonLayout>
  );
};
