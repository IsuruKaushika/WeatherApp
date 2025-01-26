const express=require('express');
const weather = require('../backend/src/Weather');
const cors=require('cors');


const app=express();//allow application to enable cors
app.use(cors());//pass the cord
const port=3002;

//http://localhost:3002/weather

app.get('/weather',async(req,res)=>{
    if(!req.query.parsedLocation){
        //
        return res.send({
            error:"Need a location"
        })
    }
    const data=await weather(req.query.location);
    res.send(data);//send data as the response


    })
//callback function
app.listen(port,()=>{
    console.log("server is running in"+port);
})



