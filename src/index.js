const express = require('express');
require('./db/mongoose');
const User = require('./db/models/user');
const Tasks = require('./db/models/task');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/users', (req, res) => {
    const user = new User(req.body);
    user
        .save()
        .then((a) => {
            res.status(201).send(a);
        })
        .catch((e) => {
            res.status(400).send(e);
        });
});

app.get('/users', (req, res) => {
    User.find({})
        .then((users) => {
            res.send(users);
        })
        .catch((e) => {
            res.status(500).send(e);
        });
});

app.get('/users/:id', (req, res) => {
    const _id = req.params.id;
    User.findById(_id)
        .then((user) => {
            if (!user) {
                return res.status(404).send();
            }
            res.send(user);
        })
        .catch((e) => {
            res.status(500).send(e);
        });
});
app.get('/tasks/:id', (req, res) => {
    const _id = req.params.id;
    Tasks.findById(_id)
        .then((task) => {
            if (!task) {
                return res.status(404).send(task);
            }
            res.send(task);
        })
        .catch((e) => {
            res.status(500).send(e);
        });
});

app.get('/tasks', (req, res) => {
    Tasks.find({})
        .then((tasks) => {
            res.send(tasks);
        })
        .catch((e) => {
            res.status(500).send(e);
        });
});

app.post('/tasks', (req, res) => {
    const task = new Tasks(req.body);

    task
        .save()
        .then((r) => {
            res.status(201).send(r);
        })
        .catch((e) => {
            res.status(400).send(e);
        });
});

app.listen(port, () => {
    console.log('Server is up on port ', port);
});
