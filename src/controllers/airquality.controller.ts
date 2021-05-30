import { NextFunction, Request, Response } from 'express';
import AirQualityService from '../services/airquality.service';

class AirQualityController {
  public airQualityService = new AirQualityService();

  public getStatisticalMeasurementWithPopulation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const params: StatisticalMeasurementParams = req.body;
      const findStatisticalMeasurement = await this.airQualityService.findStatisticalMeasurementWithPopulation(params);

      res.status(200).json({ data: findStatisticalMeasurement, message: 'findStatisticalMeasurementWithPopulation' });
    } catch (error) {
      next(error);
    }
  };

  public getTimeserie = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const params: StationTimeserieParams = req.body;
      const findTimeserie = await this.airQualityService.getTimeserie(params);
      res.status(200).json({ data: findTimeserie, message: 'getTimeserie' });
    } catch (error) {
      next(error);
    }
  };
}

export default AirQualityController;
