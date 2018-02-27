const mongodb = require("mongodb");
const connect = promisify(mongodb.MongoClient.connect);

mongodb.Collection.prototype.insertManyAsync = promisify(mongodb.Collection.prototype.insertMany);
mongodb.Collection.prototype.removeAsync = promisify(mongodb.Collection.prototype.remove);

main();

async function main() {
    console.log("Connecting");
    const client = await connect("mongodb://localhost:27017");
    console.log("Connected");

    const db = client.db("parkD");

    const parkingLotList = db.collection("parkingLotList");
    const userActionList = db.collection("userActionList");
    const userList = db.collection("userList");
    const parkingUserList = db.collection("parkingUserList");
    

    await parkingLotList.removeAsync();
    console.log("parkingLotList Remove");
    await parkingLotList.insertManyAsync([
        {id:1, name: 'חניון עובדים', totalPlaces:300, freePlaces: 10, reservedPlaces:0, aboutToBeFreePlaces:0  , waitingToEnter: 1},
        {id:2, name: 'חניון דרום', totalPlaces:100, freePlaces: 0, reservedPlaces:2, aboutToBeFreePlaces:1, waitingToEnter: 1},
        {id:3, name: 'חניון עבודה סוציאלית', totalPlaces:200, freePlaces: 0, reservedPlaces:0, aboutToBeFreePlaces:1, waitingToEnter: 0},
        {id:4, name: 'חניון גולפיטק', totalPlaces:500, freePlaces: 0, reservedPlaces:0, aboutToBeFreePlaces:1, waitingToEnter: 0},
    ]);
    console.log("parkingLotList insertMany");

    await userActionList.removeAsync();
    console.log("userActionList Remove");
    //await userActionList.insertManyAsync([    ]);
    //console.log("userActionList insertMany");
      
    await userList.removeAsync();
    console.log("userList Remove");
    await userList.insertManyAsync([
        {userId: 1000, userName: "אודליה"},
        {userId: 2000, userName: "נועה"},
        {userId: 3000, userName: "אורלי"},
        {userId: 4000, userName: "גל"},
        {userId: 5000, userName: "דורון"}
    ]);
    console.log("userList insertMany");

    await parkingUserList.removeAsync();
    console.log("parkingUserList Remove");
    await parkingUserList.insertManyAsync([
        {parkId:1, userId: 1000},
        {parkId:2, userId: 2000},
      ]);
    console.log("parkingUserList insertMany");

    console.log("Closing");
    client.close();
}

function promisify(fn){
    return function(){
        const args = Array.from(arguments);
        const me = this;

        return new Promise(function(resolve, reject){
            function callback(err, retVal){
                if(err){
                    reject(err);
                    return;
                }

                resolve(retVal);
            }

            args.push(callback);

            fn.apply(me, args);
        });
    }
}