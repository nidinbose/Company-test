import express from 'express';
import env from 'dotenv';
import cors from 'cors';
import connection from './connection/connection.js';
import router from './routes/router.js';

const app=express();
env.config();

app.use(express.json());
// app.use(express.urlencoded({ extended: true }))
// If you need to send cookies/authentication
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
  }));
app.use('/api',router)
app.use('/uploads', express.static('uploads'));


connection().then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`http://localhost:${process.env.PORT}`);
        
    })
}).catch((error)=>{
    console.log(`error in server integration`,error);
    
})
