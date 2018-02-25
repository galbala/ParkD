import * as express from "express";
import { getParkingLots, leaveParkingLot, enterParkingLot } from "./dal/parking-lot-dal";

const app = express();

app.get("/api/getParkingLots", wrap(async function() {
    return await getParkingLots();
})) 

app.post("/api/getOut", async function(req, res) {
    console.log("getOut " + req.body.userId + ", " + req.body.parkId);
    return await leaveParkingLot(req.body.userId, req.body.parkId);
})

app.post("/api/getIn", async function(req, res) {
    console.log("getIn " + req.body.userId + ", " + req.body.parkId);
    return await enterParkingLot(req.body.userId, req.body.parkId);
})

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

app.listen(3001, function(){
    console.log("Server is running");
});