//const express = require("express");
import express, { Express, Request, Response } from 'express'
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from "dotenv"
import path from 'path';
import {IndexRouter} from './router/IndexRouter'
const indexRouter = new IndexRouter;
//import {indexController} from "./server/controller/index"
//import {redirectController} from "./server/controller/redirectUrl"
const app: Express = express();
dotenv.config({path:path.join(__dirname,"../","../","/.env")});
console.log()


//coneect to MongoDB 
if(process.env.mongoDBurl !== undefined) {
    mongoose
    .connect(process.env.mongoDBurl, {
      //useNewUrlParser: true,
      //useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connect to mongoDB atlas database.");
    })
    .catch((err: any) => {
      console.log(err);
      console.log("Error! connect to mongoDB atlas database.");
    });
}else{
    console.log("not provide mongoDBurl in env file.")
}



  //midderwave
  app.set('view engine', 'ejs')
  app.use(express.static('./public'));
  
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())

  //首頁 導入短網址＋首頁呈現
  app.use('/',indexRouter.router)
  

  //短網址Redircet API
  //app.use('/r', redirectController);

  app.use((request: Request, response: Response) => {
    response.type('text/plain');
    response.status(404)
    response.send('Page is not found.');
  })

  //port listener
  app.listen(8081, () => {
    console.log("Server running on port 8081 is running.");
  });