import express from 'express'
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import cors from 'cors';
import * as path from 'path';
import * as url from 'url';
import authRoute from './routes/auth.js';

dotenv.config();

const app = express();

const __dirname=url.fileURLToPath(new URL('.',import.meta.url));

app.use(express.json())


app.use(
    cors({
      origin: "http://localhost:3000", 
      methods: "GET,PUT,POST,DELETE",
      credentials: true,
    })
  );

// app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.urlencoded({extended:true}))

app.use('/',authRoute)

app.use("/images", express.static(path.join(__dirname, "/images")));

app.use(express.static(`${__dirname}/images`));

app.get((req,res)=>{
    res.send("SERVER STARTED")
})

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("Connected To Database");
}).catch(()=>{
    console.log("Something Error Or Network Issue");
})

app.listen(5005);

console.log("Server Started At Port 5005");