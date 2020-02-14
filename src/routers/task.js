const express = require('express');
const Tasks = require('../db/models/task');
const router = express.Router();

router.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id;

    try {
        const task = await Tasks.findById(_id);
        if (!task) {
            return res.status(404).send(task);
        }

        return res.send(task);
    } catch (e) {
        res.status(500).send(e);
    }
});

router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Tasks.find({});
        res.send(tasks);
    } catch (e) {
        res.status(500).send(e);
    }
});
router.post('/tasks', async (req, res) => {
    const task = await new Tasks(req.body).save();
    try {
        res.status(201).send(task);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Tasks.findByIdAndDelete(req.params.id);
        if (!task) {
            res.status(404).send('Task not found');
        }
        res.send(task);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = [ 'description', 'completed' ];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid update!' });
    }
    try {
        const updatedTask = await Tasks.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedTask) {
            return res.status(404).send('No matching tasks found');
        }
        res.send(updatedTask);
    } catch (e) {
        res.status(400).send(e);
    }
});

module.exports = router;
