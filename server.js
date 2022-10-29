const express = require('express');
const app = express();


const connectDB = require('./config/db');
connectDB(); // connected the database


const PORT =  process.env.PORT || 5000;         

// our server will be listenning to this port int case to developemnt 5000
// when request of the home directory will be send it will send the res 
app.get('/',(req,res) =>{
    res.send(`Ready to use ${PORT}`);
})

// initingilizing the bodyparese it is middleware
app.use(express.json({extended: false}));
//Defininig routes
//use to splits the different routes according to functionality
//The app.use() function is used to mount the specified middleware function(s) at the path which is being specified. 
//It is mostly used to set up middleware for your application.
// before getting the route we have to parse it 
app.use('/api/auth',require('./routes/api/auth'));
app.use('/api/profile',require('./routes/api/profile'));
app.use('/api/posts',require('./routes/api/posts'));
app.use('/api/users',require('./routes/api/users'));

// to listen the port
app.listen(PORT,()=>{
    console.log("This app is listennig to port 50000");
})
