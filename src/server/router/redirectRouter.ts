import express, { Express, Request, Response, Router } from 'express'
import { RedirectController } from '../controller/redirectUrl'

const redirectController = new RedirectController
export class RedirectRouter{
    router: Router;
    constructor() {
      this.router = express.Router();
      this.initializeRoutes();
    }
  
    initializeRoutes() {
      this.router.get('/:url', redirectController.getRedirectUrl);
    }
}