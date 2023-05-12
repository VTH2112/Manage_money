const express = require('express');
const { db } = require('./db');
const router = express.Router();
const { ObjectId } = require('mongodb');


router.get("/", async (req, res) => {
    const money = await db.money.find().toArray();
    res.json(money);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const money = await db.money.find({
        _id: new ObjectId(id),
    })
    res.json(money);
});

router.get('/room/:id', async (req, res) => {
    const { id } = req.params;
    const money = await db.money.find({
        roomID: id,
    }).toArray();
    res.json(money);
});

router.post('/addNewMoney', async (req, res) => {
    const { name, date, money, roomID, soDien, soNuoc } = req.body;
    await db.money.insertOne({
        name: name,
        date: date,
        money: money,
        roomID: roomID,
        soDien: soDien,
        soNuoc: soNuoc
    })
    res.send('Inserted');
});
router.put('/:id', (req, res) => { });

router.delete('/:id', (req, res) => { });

module.exports = router;