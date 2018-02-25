import * as express from "express";
import { getParkingLots } from "./controller/parking-lot-controller";

const app = express();

app.get("/api/getParkingLots", wrap(async function() {
    return await getParkingLots();
})) 

function wrap(fn){
    return function(req, res) {
        try {
            const retVal = fn();

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

app.listen(3000, function(){
    console.log("Server is running");
});