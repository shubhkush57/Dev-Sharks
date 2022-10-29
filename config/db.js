const mongoose = require("mongoose");
const config = require('config'); // attaching the dependencies

const db = config.get('mongoURI'); // get the url of database

const connectDB = async () =>{
     
    try{
        // const client = new mongoClient(db); // creaging a new mongoClinet 
        // await client.connect();
        await mongoose.connect(db);// connected to the database
        console.log("mongodb connected....");
    }
    catch(e){
        console.log(e);
        process.exit(1);
    }
    
}
// exprot the module
module.exports = connectDB;