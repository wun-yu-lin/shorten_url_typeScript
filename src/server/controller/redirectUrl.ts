import { Request,Response, NextFunction  } from "express";
import {Url} from '../model/urlDB'


export class RedirectController {
    async getRedirectUrl(req:Request, res:Response, next:NextFunction){
        console.log("in redirect page")
        if(req.params.url == undefined || req.params.url == "" || req.params.url == null ){
            res.send("err! no url");
        }
        let shortenUrl:string = req.params.url;
        console.log(shortenUrl);
        await Url.findOne({shortenUrl:shortenUrl}).then((results)=>{
            if(results === null){
                console.log("err! no url in DB");
                return res.send("err! no url");
            }
            res.redirect(results.trueUrl);
    }).catch((err)=>{  
        console.log(err);
        next(err);
    })
}
}
