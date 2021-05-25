import { NextFunction, Request, Response } from 'express';
import AirQualityService from '../services/airquality.service';

class AirQualityController {
  public airQualityService = new AirQualityService();

  public getStatisticalMeasurement = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const params: StatisticalMeasurementParams = {
        statistical_measurement: (req?.query?.measurement as string) || 'avg',
        variable: req?.query?.variable as string,
        start_date: (req?.query?.start_date as string) ? (req.query.start_date as string) : null,
        end_date: (req?.query?.end_date as string) ? (req.query.end_date as string) : null,
      };
      const findStatisticalMeasurement = await this.airQualityService.findStatisticalMeasurement(params);

      res.status(200).json({ data: findStatisticalMeasurement, message: 'findStatisticalMeasurement' });
    } catch (error) {
      next(error);
    }
  };
}

export default AirQualityController;
