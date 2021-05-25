import { Router } from 'express';
import Route from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import AirQualityController from '@/controllers/airquality.controller';

class AirQualityRoute implements Route {
  public path = '/airquality';
  public router = Router();
  public airQualityController = new AirQualityController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.airQualityController.getStatisticalMeasurement);
  }
}

export default AirQualityRoute;
