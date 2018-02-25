import * as express from "express";
import { getParkingLots, getParkingLotToExitFrom } from "./dal/parking-lot-dal";

const app = express();

app.get("/api/getParkingLots", wrap(async function() {
    console.log("*****************");
    return await getParkingLots();
})) 

// app.get('/api/getParkingLotToExitFrom/:userId', function(request, response) {
//     var id = request.params.userId;
//     response.end("I have received the ID: " + id);
// });


 app.get("/api/getParkingLotToExitFrom/:userId", wrap(async function() {
     //console.log("************XXXXXXXXXXXXXXXXXXXXXXXXXXX*****");
     //let userId = req.params.userId;
     //console.log("*****************",userId);
     return await getParkingLotToExitFrom(1);
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

app.listen(3001, function(){
    console.log("Server is running11");
});