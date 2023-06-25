import express from 'express';
import dotenv from 'dotenv';
import roomRouter from './routes/roomRouter.js';
import mongoose from 'mongoose';
import userRouter from './routes/userRouter.js';
import cors from 'cors';

dotenv.config();

const port= process.env.PORT || 3000;

const app = express();
app.use(cors);
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin',process.env.CLIENT_URL);
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE')  ;
    res.setHeader('Access-Control-Allow-Headers','X-Requested-With,Content-Type,Authorization');
    // pass execution to our next middleware
    next();
})  

// limit is used to prevent DOS attack
app.use(express.json({'limit':'20mb'}));

app.get('/',(req,res)=>{
    res.json({message:'Welcome to the server'})
});
app.use('/user',userRouter);
app.use('/room',roomRouter);
app.use((req,res)=>res.status(404).json({message:'Resource not found'}));

// make server async because we need to connect with mongo db
const startServer=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_CONNECT);
        
        app.
        listen(port,()=>console.log(`Server is listening on port ${port}`))
        .on('error',(e)=>{
            console.log('Error happened: ',e.message);
        });
    }
    catch(error){
        console.log(error);
    }
}
startServer();