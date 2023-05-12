const express = require('express');
const { connectToDb } = require('./db')
const moneyRouter = require('./money');
const roomRouter = require('./room');
const memberRouter = require('./member');
const app = express();

app.use(express.json());
app.use("/money", moneyRouter);
app.use("/room", roomRouter);
app.use("/member", memberRouter);

// index.js
// const { connectToDb } = require('./db')


app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
    connectToDb()
});

