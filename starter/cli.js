const {spawn} = require("child_process");
const command = process.argv[2];

if (command == 'start') {
    start();
}

function start() {

    const mongoPath = process.env.MONGO_PATH;
    if (!mongoPath) {
        throw new Error("MONGO_PATH is empty")
      }
    
    spawn("md mongo-db & \""+mongoPath+"\\mongod.exe\"", [ 
        " --dbpath mongo-db "
    ] , {
        shell: true,
        stdio: "inherit"   
    });

    spawn("node", [ 
        "starter\\mongoDB\\initiate_data.js"
    ] , {
        shell: true,
        stdio: "inherit"   
    });

    spawn("ng", [
        "serve",
        "--proxy-config",
        "proxy.conf.json",
        "--open"
    ] , {
        shell: true,
        stdio: "inherit"
    });

    spawn("node_modules\\.bin\\tsc", [
     " -p",
     " src\\server\\tsconfig.json",
     " -w"
     ] , {
        shell: true,
        stdio: "inherit"
    });

    spawn("node_modules\\.bin\\nodemon", [
        " src\\server_out\\server\\main.js"
    ], {
        shell: true,
        stdio: "inherit"   
    });

}