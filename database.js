const mongoose = require('mongoose');
require("./models");

mongoose.connect(process.env.DB_URL);

mongoose.connection.on(process.env.DB_CONNECTED, function () {
    console.log(process.env.DB_CONNECTED_MSG)
});

mongoose.connection.on(process.env.DB_DISCONNECTED, function () {
    console.log(process.env.DB_DISCONNECTED_MSG);
});

process.on(process.env._SIGNET, function () {
    mongoose.connection.close(function () {
        console.log(process.env.DB_TERMINATED_MSG);
        process.exit(0);
    });
});
