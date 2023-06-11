import express from 'express';
import dotenv from 'dotenv';
import roomRouter from './routes/roomRouter.js';
dotenv.config();

const port= process.env.PORT || 5173;

const app = express();

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin',process.env.CLIENT_URL)
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE')  
    res.setHeader('Access-Control-Allow-Headers','X-Requested-With,Content-Type,Authorization')
    // pass execution to our next middleware
    next()
})  
// limit is used to prevent DOS attack
app.use(express.json({'limit':'20mb'}))

app.use('/',(req,res)=>res.json({message:'Welcome to the server'}))
app.use('/room',roomRouter);
app.use((req,res)=>res.status(404).json({message:'Resource not found'}));

// make server async because we need to connect with mongo db
const startServer=async()=>{
    try{
        app.listen(port,()=>console.log(`Server is listening on port ${port}`))
    }
    catch(error){
        console.log(error)
    }
}
startServer();