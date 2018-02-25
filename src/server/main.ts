import * as express from "express";
import { getParkingLots, getParkingLotToExitFrom } from "./dal/parking-lot-dal";

const app = express();

app.get("/api/getParkingLots", wrap(async function(req) {
    return await getParkingLots();
})) 



 app.get("/api/getParkingLotToExitFrom/:userId", wrap(async function(req) {
     let userId = req.params.userId;
     return await getParkingLotToExitFrom(userId);
 })) 

function wrap(fn){
    return function(req, res) {
        try {

            const retVal = fn(req);

            if (retVal && retVal.then) {
                retVal.then(data => {
                    res.json(data);
                }).catch(err => {
                    res.json({error: err.message});
                });
            }
        }
        catch(err){
            res.json({error: err.message});
        }
    }
}

app.listen(3001, function(){
    console.log("Server is running");
});