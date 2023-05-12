// db.js

const { MongoClient } = require("mongodb");

const db = {};

async function connectToDb() {
    const client = new MongoClient("mongodb+srv://vuthehai2112:Vuhai2112@cluster0.yfmdd6y.mongodb.net/?retryWrites=true&w=majority");
    await client.connect();
    console.log("db connected");
    const database = client.db("quanlythu");
    db.money = database.collection("money");
    db.time = database.collection("time");
    db.users = database.collection("users")
    db.member = database.collection("member");
    db.room = database.collection("room");
}

module.exports = { connectToDb, db };