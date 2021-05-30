import request from 'supertest';
import App from '@/app';
import AirQualityRoute from '@/routes/airquality.route';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing AirQuality', () => {
  describe('[GET] /', () => {
    it('should get the average of NO2 in a date range with statusCode 200', () => {
      const qualityRoute = new AirQualityRoute();
      const app = new App([qualityRoute]);

      return request(app.getServer())
        .post(`${qualityRoute.path}`)
        .send({
          start_date: '2016-10-05',
          end_date: '2016-11-05',
          variable: 'no2',
          statistical_measurement: 'avg',
        })
        .expect(200);
    });

    it('should get the average of NO2 with statusCode 200', () => {
      const qualityRoute = new AirQualityRoute();
      const app = new App([qualityRoute]);

      return request(app.getServer())
        .post(`${qualityRoute.path}`)
        .send({
          variable: 'no2',
          statistical_measurement: 'avg',
        })
        .expect(200);
    });

    it('should retrieve error when body is wrong', () => {
      const qualityRoute = new AirQualityRoute();
      const app = new App([qualityRoute]);

      return request(app.getServer())
        .post(`${qualityRoute.path}`)
        .send({
          starting_date: '2016-10-05',
          end_date: '2016-11-05',
          variable: 'no2',
        })
        .expect(400);
    });

    it('should get timeserie of a station with the average of NO2 with statusCode 200', () => {
      const qualityRoute = new AirQualityRoute();
      const app = new App([qualityRoute]);

      return request(app.getServer())
        .post(`${qualityRoute.path}/timeserie`)
        .send({
          start_date: '2016-10-05',
          end_date: '2016-11-05',
          variable: 'no2',
          statistical_measurement: 'avg',
          step: '1d',
          station_id: 'aq_jaen',
        })
        .expect(200);
    });

    it('should get timeserie of two stations with the average of NO2 with statusCode 200', async () => {
      const qualityRoute = new AirQualityRoute();
      const app = new App([qualityRoute]);

      const response = await request(app.getServer())
        .post(`${qualityRoute.path}/timeserie`)
        .send({
          start_date: '2016-10-05',
          end_date: '2016-12-30',
          variable: 'no2',
          statistical_measurement: 'avg',
          step: '1w',
          stations: ['aq_jaen', 'aq_uam'],
        });

      expect(JSON.stringify(response.body)).toContain('aq_jaen');
      expect(JSON.stringify(response.body)).toContain('aq_uam');
    });

    it('should get timeserie of stations contained in a polygon with the average of NO2 with statusCode 200', async () => {
      const qualityRoute = new AirQualityRoute();
      const app = new App([qualityRoute]);

      const response = await request(app.getServer())
        .post(`${qualityRoute.path}/timeserie`)
        .send({
          start_date: '2016-10-05',
          end_date: '2016-12-30',
          variable: 'no2',
          statistical_measurement: 'avg',
          step: '1w',
          geom: {
            type: 'Polygon',
            coordinates: [
              [
                [-3.63289587199688, 40.56439731247202],
                [-3.661734983325005, 40.55618117044514],
                [-3.66310827434063, 40.53583209794804],
                [-3.6378740519285206, 40.52421992151271],
                [-3.6148714274168015, 40.5239589506112],
                [-3.60543005168438, 40.547181381686634],
                [-3.63289587199688, 40.56439731247202],
              ],
            ],
          },
        });

      expect(JSON.stringify(response.body)).toContain('aq_jaen');
      expect(JSON.stringify(response.body)).toContain('aq_salvia');
      expect(JSON.stringify(response.body)).toContain('aq_nevero');
    });
  });
});
