import * as express from "express";
<<<<<<< HEAD
import { getParkingLots, leaveParkingLot, enterParkingLot } from "./dal/parking-lot-dal";
=======
import { getParkingLots, getParkingLotToExitFrom } from "./dal/parking-lot-dal";
>>>>>>> 8c1d032fd28024d375c44500c7a75894eece5415

const app = express();

app.get("/api/getParkingLots", wrap(async function() {
    console.log("*****************");
    return await getParkingLots();
})) 

<<<<<<< HEAD
app.post("/api/getOut", async function(req, res) {
    console.log("getOut " + req.body.userId + ", " + req.body.parkId);
    return await leaveParkingLot(req.body.userId, req.body.parkId);
})

app.post("/api/getIn", async function(req, res) {
    console.log("getIn " + req.body.userId + ", " + req.body.parkId);
    return await enterParkingLot(req.body.userId, req.body.parkId);
})
=======
// app.get('/api/getParkingLotToExitFrom/:userId', function(request, response) {
//     var id = request.params.userId;
//     response.end("I have received the ID: " + id);
// });


 app.get("/api/getParkingLotToExitFrom/:userId", wrap(async function() {
     //console.log("************XXXXXXXXXXXXXXXXXXXXXXXXXXX*****");
     //let userId = req.params.userId;
     console.log("*****************");
     return await getParkingLotToExitFrom(1);
 })) 
>>>>>>> 8c1d032fd28024d375c44500c7a75894eece5415

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