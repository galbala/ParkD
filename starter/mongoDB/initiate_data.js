const mongodb = require("mongodb");
const connect = promisify(mongodb.MongoClient.connect);

mongodb.Collection.prototype.insertManyAsync = promisify(mongodb.Collection.prototype.insertMany);

main();

async function main() {
    console.log("Connecting");
    const client = await connect("mongodb://localhost:27017");
    console.log("Connected");

    const db = client.db("parkD");

    const parkingLotList = db.collection("parkingLotList");

    await parkingLotList.remove();
    await parkingLotList.insertManyAsync([
        {id:1, name: 'חניון עובדים', totalPlaces:300, freePlaces: 10, reservedPlaces:0, aboutToBeFreePlaces:0  },
        {id:2, name: 'חניון דרום', totalPlaces:100, freePlaces: 0, reservedPlaces:2, aboutToBeFreePlaces:1},
        {id:3, name: 'חניון עבודה סוציאלית', totalPlaces:200, freePlaces: 0, reservedPlaces:0, aboutToBeFreePlaces:1},
        {id:4, name: 'חניון שקר כלשהו', totalPlaces:500, freePlaces: 0, reservedPlaces:0, aboutToBeFreePlaces:1},
    ]);

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