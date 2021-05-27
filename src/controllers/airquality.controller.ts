import { NextFunction, Request, Response } from 'express';
import AirQualityService from '../services/airquality.service';

class AirQualityController {
  public airQualityService = new AirQualityService();

  public getStatisticalMeasurementWithPopulation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const params: StatisticalMeasurementParams = {
        statistical_measurement: (req?.query?.measurement as string) || 'avg',
        variable: req?.query?.variable as string,
        start_date: (req?.query?.start_date as string) ? (req.query.start_date as string) : null,
        end_date: (req?.query?.end_date as string) ? (req.query.end_date as string) : null,
      };
      const findStatisticalMeasurement = await this.airQualityService.findStatisticalMeasurementWithPopulation(params);

      res.status(200).json({ data: findStatisticalMeasurement, message: 'findStatisticalMeasurementWithPopulation' });
    } catch (error) {
      next(error);
    }
  };

  public getTimeserie = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const params: StationTimeserieParams = {
        end_date: req?.query?.end_date as string,
        start_date: req?.query?.start_date as string,
        statistical_measurement: req?.query?.measurement as string,
        step: req?.query?.step as string,
        variable: req?.query?.variable as string,
        station_id: req?.query?.station_id as string,
      };
      const findTimeserie = await this.airQualityService.getTimeserie(params);
      res.status(200).json({ data: findTimeserie, message: 'getTimeserie' });
    } catch (error) {
      next(error);
    }
  };

  public getStations = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findStatisticalMeasurement = await this.airQualityService.findStationsGeometry();
      res.status(200).json({ data: findStatisticalMeasurement, message: 'getStations' });
    } catch (error) {
      next(error);
    }
  };
}

export default AirQualityController;
