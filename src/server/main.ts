import * as express from "express";
import {
  getParkingLots,
  gateEnter,
  gateExit,
  getParkingLotToExitFrom,
  getUserList,
  addUserAction
} from "./dal/parking-lot-dal";
import { UserAction } from "../app/model/user-action";

const app = express();
app.listen(3001, function() {
  console.log("Server is running");
});

app.get(
  "/api/getParkingLots",
<<<<<<< HEAD
  wrap(async function(req) {
=======
  wrapExpressApi(async function(req) {
    console.log("****************");
>>>>>>> 69e262b6c62949c042925d131a10964d1f900c52
    return await getParkingLots();
  })
);

app.get(
  "/api/getParkingLotToExitFrom/:userId",
  wrap(async function(req) {
    let userId = req.params.userId;
    return await getParkingLotToExitFrom(userId);
  })
);

app.get(
  "/api/addUserAction/:userAction",
  wrap(async function(req) {
    const userAction = JSON.parse(req.params.userAction);
    return await addUserAction(userAction);
  })
);

app.get(
  "/api/getUserList",
  wrap(async function(req) {
    return await getUserList();
  })
);

//simulations functions
app.get(
  "/api/getOut/:barrierInput",
  wrap(async function(req) {
    const barrierInput = JSON.parse(req.params.barrierInput);
    console.log("getOut " + req.params);
    return await gateEnter(barrierInput.userId, barrierInput.parkId);
  })
);

app.get(
  "/api/getIn/:barrierInput",
  wrap(async function(req) {
    const barrierInput = JSON.parse(req.params.barrierInput);
    console.log("getIn " + req.params);
    return await gateExit(barrierInput.userId, barrierInput.parkId);
  })
);
//end simulations functions

function wrap(fn) {
  return function(req, res) {
    try {
      const retVal = fn(req);

      if (retVal && retVal.then) {
        retVal
          .then(data => {
            res.json(data);
          })
          .catch(err => {
            res.json({ error: err.message });
          });
      }
    } catch (err) {
      res.json({ error: err.message });
    }
  };
}
