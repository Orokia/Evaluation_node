require('dotenv').config()
const express = require('express')
const app = express()
const messageRouter = require('./routers/messageRouter');
const userRouter = require('./routers/userRouter');
const jwt = require("jsonwebtoken")
const port= process.env.PORT;
const { connectionTodb } = require('./db');
const messageUserRouter = require('./routers/messageUserRouter');

app.use(express.json()); 

connectionTodb(); 

app.use("/messages",messageRouter)
app.use("/users",userRouter)
app.use("/",messageUserRouter)

app.get(
  '/',(req,res,next)=>{
    console.log("middelware router")
    next();
  },
  async (req,res) =>{
  res.send('Hello World!');
}, );

app.get('/protected', (req, res, next) => {
  console.log(req.headers);
  const token = req.headers.authorization;
 next();
},
(req,res)=> {
  res.json({message: 'protection'})
},
);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
