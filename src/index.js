const express = require('express');
require('./db/mongoose');
const User = require('./db/models/user');
const Tasks = require('./db/models/task');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;
const apiKey = '85522fd6b4c44f5cbb9eea5122929c6b';

app.use(express.json());

app.post('/users', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        res.status(200).send(user);
    } catch (e) {
        res.status(400).send(e);
    }
});

app.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch (e) {
        res.status(400).send(e);
    }
});

app.get('/users/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).send('not found');
        }
        res.send(user);
    } catch (e) {
        res.status(500).send(e);
    }
});
app.get('/tasks/:id', async (req, res) => {
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

app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Tasks.find({});
        res.send(tasks);
    } catch (e) {
        res.status(500).send(e);
    }
});

app.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = [ 'name', 'email', 'password', 'age' ];
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update);
    });
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        console.log(user);
        if (!user) {
            return res.status(404).send();
        }

        res.send(user);
    } catch (e) {
        res.status(400).send(e);
    }
});

// app.get('/recipes', (req, res) => {
//     try {
//         if (req.query.recipe) {
//             const query = axios.get(
//                 `https://api.spoonacular.com/recipes/search/?apiKey=${encodeURIComponent(apiKey)}&number=3&query=${req
//                     .query.recipe}`
//             );

//             query
//                 .then((r) => {
//                     const finalQuery = axios.get(
//                         `https://api.spoonacular.com/recipes/${r.data.results[0]
//                             .id}/information?includeNutrition=true&${apiKey}`
//                     );
//                     finalQuery
//                         .then((r) => {
//                             console.log(r);
//                             res.send(r.data);
//                         })
//                         .catch((e) => console.log(e));
//                 })
//                 .catch((e) => {
//                     console.log(e);
//                 });
//         }
//         // const query = axios.get(
//         //     `https://api.spoonacular.com/recipes/search/?apiKey=${encodeURIComponent(apiKey)}&number=100`
//         // );
//         // query
//         //     .then((r) => {
//         //         res.send(r.data.results);
//         //     })
//         //     .catch((e) => console.log(e));
//         // if (req.query.recipe) {
//         //     const query = await axios.get(
//         //         `https://api.spoonacular.com/recipes/search/?apiKey=${encodeURIComponent(apiKey)}&number=100`
//         //     );
//         // } else {
//         //     const query = await axios.get(
//         //         `https://api.spoonacular.com/recipes/search/?apiKey=${encodeURIComponent(apiKey)}&number=100`
//         //     );
//         //     res.send(query);
//         // }
//     } catch (e) {
//         console.log(e);
//     }
// });

app.post('/tasks', async (req, res) => {
    const task = await new Tasks(req.body).save();
    try {
        res.status(201).send(task);
    } catch (e) {
        res.status(400).send(e);
    }
    // task
    //     .save()
    //     .then((r) => {
    //         res.status(201).send(r);
    //     })
    //     .catch((e) => {
    //         res.status(400).send(e);
    //     });
});

app.listen(port, () => {
    console.log('Server is up on port ', port);
});
