import { clean_timeserie_response, get_postgres_interval, get_station_ids_in_query } from '@/utils/util';
import HttpException from '@exceptions/HttpException';
import axios from 'axios';

class AirQualityService {
  api_url = 'https://aasuero.carto.com:443/api/v2/sql?q=';

  public async findStatisticalMeasurementWithPopulation(params: StatisticalMeasurementParams): Promise<String> {
    if (!params.statistical_measurement || !params.variable) throw new HttpException(400, 'Check your request');

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

    return response.data.rows;
  }

  public async getTimeserie(params: StationTimeserieParams) {
    let query = '';
    if (!params.station_id && !params.stations && !params.geom) {
      throw new HttpException(400, 'We need some stations to give your result!');
    }
    if (!params.statistical_measurement || !params.variable) throw new HttpException(400, 'Check your request');
    if (params.station_id) {
      query = `SELECT stations.station_id, ${params.statistical_measurement}(measurements.${
        params.variable
      }), g.series as period_end, (g.series - INTERVAL '${get_postgres_interval(params.step)}') as period_start 
      FROM aasuero.test_airquality_stations AS stations
      LEFT JOIN aasuero.test_airquality_measurements AS measurements
      ON stations.station_id = measurements.station_id
      LEFT JOIN generate_series(timestamp '${params.start_date}', '${params.end_date}', '${get_postgres_interval(params.step)}') as g(series)
      ON measurements.timeinstant between (g.series - INTERVAL '${get_postgres_interval(params.step)}') AND g.series
      WHERE stations.station_id = '${params.station_id}'
      GROUP BY g.series, stations.cartodb_id
      ORDER BY g.series`;
    }
    if (params.geom) {
      query = `SELECT stations.station_id, ${params.statistical_measurement}(measurements.${
        params.variable
      }), g.series as period_end, (g.series - INTERVAL '${get_postgres_interval(params.step)}') as period_start 
      FROM aasuero.test_airquality_stations AS stations
      LEFT JOIN aasuero.test_airquality_measurements AS measurements
      ON stations.station_id = measurements.station_id
      LEFT JOIN generate_series(timestamp '${params.start_date}', '${params.end_date}', '${get_postgres_interval(params.step)}') as g(series)
      ON measurements.timeinstant between (g.series - INTERVAL '${get_postgres_interval(params.step)}') AND g.series
      WHERE ST_Intersects(stations.the_geom, ST_GeomFromGeoJSON('${JSON.stringify(params.geom)}'))
      GROUP BY g.series, stations.cartodb_id
      ORDER BY g.series`;
    }
    if (params.stations) {
      query = `SELECT stations.station_id, ${params.statistical_measurement}(measurements.${
        params.variable
      }), g.series as period_end, (g.series - INTERVAL '${get_postgres_interval(params.step)}') as period_start 
      FROM aasuero.test_airquality_stations AS stations
      LEFT JOIN aasuero.test_airquality_measurements AS measurements
      ON stations.station_id = measurements.station_id
      LEFT JOIN generate_series(timestamp '${params.start_date}', '${params.end_date}', '${get_postgres_interval(params.step)}') as g(series)
      ON measurements.timeinstant between (g.series - INTERVAL '${get_postgres_interval(params.step)}') AND g.series
      WHERE stations.station_id IN (${get_station_ids_in_query(params.stations)})
      GROUP BY g.series, stations.cartodb_id
      ORDER BY g.series`;
    }

    const response = await axios.get(this.api_url + query);

    if (!response) throw new HttpException(400, 'Check your request');

    return clean_timeserie_response(response);
  }
}

export default AirQualityService;
