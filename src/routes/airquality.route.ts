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
    // this.router.get(`${this.path}/:id(\\d+)`, this.usersController.getUserById);
    // this.router.post(`${this.path}`, validationMiddleware(CreateUserDto, 'body'), this.usersController.createUser);
    // this.router.put(`${this.path}/:id(\\d+)`, validationMiddleware(CreateUserDto, 'body', true), this.usersController.updateUser);
    // this.router.delete(`${this.path}/:id(\\d+)`, this.usersController.deleteUser);
  }
}

export default AirQualityRoute;
