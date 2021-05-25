import { logger } from '@/utils/logger';
import HttpException from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import axios from 'axios';

class AirQualityService {
  public async findStatisticalMeasurement(params: StatisticalMeasurementParams): Promise<String> {
    let url = '';
    if (params.end_date && params.start_date) {
      url = `https://aasuero.carto.com:443/api/v2/sql?q=select ${params.statistical_measurement}(${params.variable}), station_id from aasuero.test_airquality_measurements where timeinstant between '${params.start_date}' and '${params.end_date}' group by station_id`;
    } else {
      url = `https://aasuero.carto.com:443/api/v2/sql?q=select 
      ${params.statistical_measurement}(${params.variable}), station_id from 
      aasuero.test_airquality_measurements group by station_id`;
    }
    const response = await axios.get(url);
    if (!response) throw new HttpException(400, 'Check your request');

    return response.data;
  }
}

export default AirQualityService;
