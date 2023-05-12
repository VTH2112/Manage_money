const express = require('express');
const { db } = require('./db');
const router = express.Router();
const { ObjectId } = require('mongodb');



router.get("/getListRoom", async (req, res) => {
    const room = await db.room.find().toArray();
    res.json(room);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const room = await db.room.findOne({
        _id: new ObjectId(id),
    })
    res.json(room);
});

router.get('/:roomId', async (req, res) => {
    const { roomId } = req.params;
    const room = await db.room.findOne({
        roomId: ObjectId(roomId)
    })
    res.json(room);
});

router.post('/addNewRoom', async (req, res) => {
    const { roomName, numOfMem, roomId, roomStatus, roomDescription, dateSign } = req.body;
    const existingRoom = await db.room.findOne({ roomId: roomId });
    if (existingRoom) {
        return res.status(400).json({ message: 'Phòng đã tồn tại' });
    }
    await db.room.insertOne({
        roomName: roomName,
        numOfMem: numOfMem,
        roomId: roomId,
        roomStatus: roomStatus,
        roomDescription: roomDescription,
        dateSign: dateSign
    })
    res.status(200).json({ message: 'Tạo phòng thành công' });
});
router.put('/editInfoRoom/:id', (req, res) => {
    const { id } = req.params;
    const { roomStatus, dateSign, numOfMem } = req.body;
    db.room.updateOne(
        { _id: new ObjectId(id) },
        {
            $set: {
                roomStatus: roomStatus,
                dateSign: dateSign,
                numOfMem: numOfMem
            }
        }
    )
    res.status(200).json({ message: 'Cập nhật thành công' });
});

router.delete('/deleteRoom/:id/:roomId', (req, res) => {
    const { id } = req.params;
    const { roomId } = req.params;
    db.room.deleteOne(
        { _id: new ObjectId(id) }
    )
    res.status(200).json({ message: `Xóa thành công phòng ${roomId}` });
});

module.exports = router;