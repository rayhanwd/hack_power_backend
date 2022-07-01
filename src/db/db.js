const mongoose = require('mongoose');
const { db } = require('../config/config');

const dbURL = db.db_uri;
if (!dbURL) {
    console.error("There is no mongo url set in env file or config.js");
}
mongoose.connect(
    dbURL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    (error)=>{
        if(error){
            console.error(`Failed to connect using mongoose. ${error}`);
        }
        else{
            console.info(`Connected to DB server`);
        }
    }
)