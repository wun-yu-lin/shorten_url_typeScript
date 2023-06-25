import { Request, Response, NextFunction } from "express";
import {Url} from '../model/urlDB'



export class IndexController {
    getHomePage(req:Request, res:Response, next:NextFunction){
        console.log("in index page")
        res.render('index'); 
    }
    async postShortenUrl(req:Request, res:Response, next:NextFunction){
        let getNewShortenUrl = new GetNewShortenUrl(6);
        let urlCode:string = await getNewShortenUrl.urlCode;
        console.log(urlCode);
        let newUrl = new Url({
            shortenUrl:urlCode,
            trueUrl:req.body.trueUrl
        });
        console.log("starting create new shortenUrl to DB");
        try {
            await newUrl.save();
            console.log("Sucessful save to DB.")
            res.send(urlCode);
        } catch (error) {
            console.log(error);
            res.send("製作失敗");
        }
    }
}


class GetNewShortenUrl {
    digits:number;
    urlCode:Promise<string>;
    
    constructor(digits:number){
        this.digits = digits;
        this.urlCode = this.confirmUsable(this.digits);
    }

    async confirmUsable(digits:number):Promise<string>{
    let urlCode:string = await this.makeRandom(this.digits); //隨機產生亂數Key
    console.log(urlCode);
    const urlExist:null = await Url.findOne({shortenUrl:urlCode});
    console.log(urlExist);
    if (!urlExist){
        //無url 就執行cd function
        return urlCode
    } else {
        //透過遞迴來重複執行 confirmUsable 直到沒有撞key
        return this.confirmUsable(digits);
    }
    }

    makeRandom(digits:number){
        let text:string = "";
        let possible:string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (let i = 0; i < digits; i++){
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        
        return text;
    }
}