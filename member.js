const express = require('express');
const { db } = require('./db');
const router = express.Router();
const { ObjectId } = require('mongodb');


router.get("/", async (req, res) => {
    const member = await db.member.find().toArray();
    res.json(member);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const member = await db.member.find({
        _id: new ObjectId(id),
    })
    res.json(member);
});

router.get('/roomId/:id', async (req, res) => {
    const { id } = req.params;
    const member = await db.member.find({
        roomId: id,
    }).toArray();
    res.status(200).json({ message: 'Tìm kiếm thành công', member: member });
});

router.get('/nationId/:id', async (req, res) => {
    const { id } = req.params;
    const member = await db.member.find({
        nationId: id,
    }).toArray();
    res.json(member);
});
router.post('/addNewMem', async (req, res) => {
    const { name, dob, nationId, roomId, phone, addr } = req.body;
    const existingMem = await db.member.findOne({ nationId: nationId });
    if (existingMem) {
        return res.status(400).json({ message: 'Thành viên đã tồn tại' });
    }
    await db.member.insertOne({
        name: name,
        dob: dob,
        nationId: nationId,
        roomId: roomId,
        phone: phone,
        addr: addr
    })
    res.status(200).json({ message: 'Thêm mới thành công' });

});
router.put('/updateMem/:id', (req, res) => {
    const { id } = req.params;
    const { name, dob, nationId, phone, addr } = req.body;
    db.member.updateOne(
        { _id: new ObjectId(id) },
        {
            $set: {
                name: name,
                dob: dob,
                nationId: nationId,
                phone: phone,
                addr: addr
            }
        }
    )
    res.status(200).json({ message: 'Cập nhật thành công' });
});

router.delete('/deleteMem/:id', (req, res) => {
    const { id } = req.params;
    db.member.deleteOne({ _id: new ObjectId(id) });
    res.status(200).json({ message: 'Xóa thành công' });
});

module.exports = router;