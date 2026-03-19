require('dotenv').config()
const express = require('express')
const app = express()
const messageRouter = require('./routers/messageRouter');

const port= process.env.PORT;
const { connectionTodb } = require('./db');
app.use(express.json()); 

connectionTodb(); 

app.use("/messages",messageRouter)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
