import { logger } from '@/utils/logger';
import { get_postgres_interval } from '@/utils/util';
import HttpException from '@exceptions/HttpException';
import axios from 'axios';

class AirQualityService {
  api_url = 'https://aasuero.carto.com:443/api/v2/sql?q=';

  public async findStatisticalMeasurementWithPopulation(params: StatisticalMeasurementParams): Promise<String> {
    let query = '';
    if (params.end_date && params.start_date) {
      query = `SELECT station.*,
      ${params.statistical_measurement}(quality_measurement.${params.variable}),
      max(esp_grid.population) AS population
      FROM aasuero.test_airquality_stations AS station
      JOIN aasuero.esp_grid_1km_demographics AS esp_grid
      ON ST_Within(station.the_geom,esp_grid.the_geom)
      JOIN aasuero.test_airquality_measurements AS quality_measurement
      ON station.station_id = quality_measurement.station_id
      WHERE quality_measurement.timeinstant between '${params.start_date}' AND '${params.end_date}'
      GROUP BY station.cartodb_id`;
    } else {
      query = `SELECT station.*,
      ${params.statistical_measurement}(quality_measurement.${params.variable}),
      max(esp_grid.population) AS population
      FROM aasuero.test_airquality_stations AS station
      JOIN aasuero.esp_grid_1km_demographics AS esp_grid
      ON ST_Within(station.the_geom,esp_grid.the_geom)
      JOIN aasuero.test_airquality_measurements AS quality_measurement
      ON station.station_id = quality_measurement.station_id
      GROUP BY station.cartodb_id`;
    }
    const response = await axios.get(this.api_url + query);
    if (!response) throw new HttpException(400, 'Check your request');

    return response.data.rows;
  }

  public async getTimeserie(params: StationTimeserieParams) {
    const query = `SELECT g.series, (
        SELECT ${params.statistical_measurement}(${params.variable}) FROM aasuero.test_airquality_measurements WHERE station_id = '${
      params.station_id
    }' AND timeinstant between (g.series - INTERVAL '${get_postgres_interval(params.step)}') AND g.series
      )
      FROM generate_series(timestamp '${params.start_date}', '${params.end_date}', '${get_postgres_interval(params.step)}') as g(series)
      GROUP BY g.series
      ORDER BY g.series`;
    const response = await axios.get(this.api_url + query);
    if (!response) throw new HttpException(400, 'Check your request');

    return response.data.rows;
  }

  public async findStationsGeometry() {
    const geoJson = {
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
    };

    const query = `select * from aasuero.test_airquality_stations WHERE ST_Intersects(the_geom, ST_GeomFromGeoJSON('${JSON.stringify(geoJson)}'))`;
    const response = await axios.get(this.api_url + query);
    if (!response) throw new HttpException(400, 'Check your request');

    return response.data.rows;
  }
}

export default AirQualityService;
