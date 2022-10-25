const express = require("express");
const app = express();

const PORT =  process.env.PORT || 5000;                             // our server will be listenning to this port int case to developemnt 5000
app.get('/',(req,res) =>{
    res.send(`Ready to use ${PORT}`);
})

app.listen(PORT,()=>{
    console.log("This app is listennig to port 50000");
})
