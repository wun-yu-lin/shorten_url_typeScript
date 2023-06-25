import express, { Express, Request, Response, Router } from 'express'
import {IndexController} from '../controller/index'

const indexController = new IndexController

export class IndexRouter {
    router: Router;
    constructor() {
      this.router = express.Router();
      this.initializeRoutes();
    }
  
    initializeRoutes() {
      this.router.post('/', indexController.postShortenUrl);
      this.router.get('/', indexController.getHomePage);
    }
  }