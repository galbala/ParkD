const {spawn} = require("child_process");
const command = process.argv[2];

if (command == 'start') {
    start();
}

function start() {

    spawn("md mongo-db & \"C:\\mongodb\\bin\\mongod.exe\"", [ 
        " --dbpath mongodb\\mongodb_data "
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