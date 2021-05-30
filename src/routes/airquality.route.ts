import { Router } from 'express';
import Route from '@interfaces/routes.interface';
import AirQualityController from '@/controllers/airquality.controller';

class AirQualityRoute implements Route {
  public path = '/airquality';
  public router = Router();
  public airQualityController = new AirQualityController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, this.airQualityController.getStatisticalMeasurementWithPopulation);
    this.router.post(`${this.path}/timeserie`, this.airQualityController.getTimeserie);
  }
}

export default AirQualityRoute;
