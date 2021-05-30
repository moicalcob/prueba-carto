import { clean_timeserie_response, get_postgres_interval, get_station_ids_in_query } from '@/utils/util';

describe('Testing util functions', () => {
  describe('get_postgres_interval', () => {
    it('should retrieve the PostgreSQL interval', () => {
      expect(get_postgres_interval('1d')).toBe('1 DAY');
      expect(get_postgres_interval('1w')).toBe('1 WEEK');
      expect(get_postgres_interval('1h')).toBe('1 HOUR');
    });
  });

  describe('get_station_ids_in_query', () => {
    it('should retrieve the ids for IN query condition', () => {
      expect(get_station_ids_in_query(['aq_jaen', 'aq_uam'])).toBe(`'aq_jaen','aq_uam'`);
    });
  });

  describe('clean_timeserie_response', () => {
    it('should remove empty timeseries', () => {
      const timeserie = {
        data: {
          rows: [
            {
              period_end: '2021-05-22',
              period_start: '2021-05-15',
              station_id: 'aq_jaen',
              avg: 20,
            },
            {
              period_start: '2021-05-15',
              station_id: 'aq_jaen',
              avg: 20,
            },
          ],
        },
      };
      const result = clean_timeserie_response(timeserie);
      expect(result).toHaveLength(1);
    });
  });
});
